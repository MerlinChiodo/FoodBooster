/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)

/**
 * Function to create a nutrition plan
 * Function gets the ID of the creator from the session
 * A nutrition plan can only be created if the user doesnt have a plan with the same name created
 *
 * Parameters:
 *      - name --> the name chosen for the nutrition plan
 *
 * Responses:
 *      201 - {success: true, msg: {createdPlan}}
 *      400 - {success: false, err: Please chosse an unused name!}
 *      500 - {success: false, err: Ups, something went wrong!} //Prisma error
 * */
const createNutritionPlan = async (req, res) => {

  const { name } = req.body
  const user = req.user.id

  let possiblePlan

  try {
    //check if user already has a plan with this name
    possiblePlan = await prisma.nutritionplan.findMany({
      where: {
        AND: [
          {
            name: name,
          },
          {
            userID: user,
          },
        ],
      },
    })
  } catch (err) {
    res.status(500).
      send({ success: false, err: 'Ups, something went wrong!' })
  }

  //check if plan with same name was found
  if (possiblePlan.length !== 0) {
    //Plan already exists
    return res.status(400).
      send({ success: false, err: 'Please choose an unused name!' })
  }

  try {
    //create the new plan with user given by req.user
    const plan = await prisma.nutritionplan.create({
      data: {
        name: name,
        userID: user,
      },
    })
    //return created plan
    return res.status(201).send({ success: true, msg: plan })
  } catch (err) {
    return res.status(500).
      send({ success: false, err: 'Ups, something went wrong!' })
  }
}

/**
 * Function to get a single nutritionplan.
 * You can select the plan you want by entering the id of the plan in the URL
 * Note that you can only get your own plans, not the plans of others.
 *
 * Responses:
 *     200 - {success: true, plan}
 *     400 - {success: false, err: Please provide a Number}
 *     403 - {success: false, err: You can only get your own plans}
 *     404 - {success: false, err: There is no plan with that id}
 *     500 - {success: false, err: Ups, something went wrong!, error} //Prisma error
 */
const getSinglePlan = async (req, res) => {
  let { id } = req.params

  id = Number(id)

  //Only allow Numbers, as the ID is stored as Number
  if (isNaN(id)) {
    return res.status(400).
      json({ success: false, err: 'Please provide a Number' })
  }

  try {
    const plan = await prisma.nutritionplan.findUnique({
      where: {
        id: id,
      },
      include: {
        recipies: true,
      },
    })

    if (plan == null) {
      return res.status(404).send({
        success: false, err: 'There is no plan with that id',
      })
    }

    if (plan.userID !== req.user.id) {
      return res.status(403).
        send({ success: false, err: 'You can only get your own plans' })
    } else {
      return res.status(200).send({ success: true, plan })
    }

  } catch (error) {
    console.log(error)
    return res.status(500).
      send({ success: false, err: 'Ups, something went wrong!', error })
  }
}

/**
 * Function to get all nutritionplans of the user that is logged in
 * You cannot get the plans of other users, only yours
 *
 * Responses:
 *     200 - {success: true, plans}
 *     500 - {success: false, err: Ups, something went wrong!, error} //Prisma error
 */
const getPlans = async (req, res) => {
  try {
    const plans = await prisma.nutritionplan.findMany({
      where: {
        userID: req.user.id,
      },
    })
    return res.status(200).send({ success: true, plans })
  } catch (error) {
    console.log(error)
    return res.status(500).
      send({ success: false, err: 'Ups, something went wrong!', error })
  }
}

/**
 * This function edits a plan.
 *
 * As parameters in the body, it expects an array.
 *
 * The first element of that array has to contain at least the planID of the
 * plan that you want to edit.
 * If you want to edit the name, add the attribute name to the first element
 *
 * All elements after are to add recipes to that plan.
 * Those elements have three attributes: the recipeID, the day, and the time as
 * an Integer.
 * The day ranges from 1 to 7 for the 7 days of the week and the
 * time is a 4 digit integer that represents time in a 24 hour format with hours
 * and minutes. For example 4 pm would be 1600 in this format and 07:25 would be
 * 0725.
 *
 * There also is an example query in the Pull Request for the User Story.
 *
 * Responses:
 *        201 - {success: true, msg: The nutritionplan has been edited successfully}
 *        400 - {success: false, err: You must hand over an array that has a minimum length of 1}
 *        400 - {success: false, err: There is no planID in the first element}
 *        400 - {success: false, err: There is either the recipeID, the day or the time missing on list index ${i}}
 *        400 - {success: false, err: Either the recipeID, the day, or the time is not an int}
 *        403 - {success: false, err: You can only edit your own recipes}
 *        404 - {success: false, err: There is no plan with the id ${planID}}
 *        500 - {success: false, err: Ups, something went wrong!, error} //Prisma error
 *
 */
const editPlan = async (req, res) => {
  if (req.body.length === undefined || req.body.length < 1) {
    return res.status(400).send({
      success: false,
      err: 'You must hand over an array that has a minimum length of 1',
    })
  }

  const list = req.body

  if (list[0].planID == null) {
    return res.status(400).send({
      success: false,
      err: 'There is no planID in the first element',
    })
  }

  const planID = parseInt(list[0].planID)

  if (isNaN(planID)) {
    return res.status(400).send({
      success: false,
      err: 'The planID has to be an int',
    })
  }

  try {
    const plan = await prisma.nutritionplan.findUnique({
      where: {
        id: planID,
      },
    })

    if (plan == null) {
      return res.status(404).send({
        success: false,
        err: `There is no plan with the id ${planID}`,
      })
    }

    if (plan.userID !== req.user.id) {
      return res.status(403).send({
        success: false,
        err: 'You can only edit your own recipes',
      })
    }

  } catch (error) {
    return res.status(500).
      send({ success: false, err: 'Ups, something went wrong!', error })
  }

  if (list[0].name != null) {
    try {
      await prisma.nutritionplan.update({
        where: {
          id: Number(list[0].planID),
        },
        data: {
          name: String(list[0].name),
        },
      })
    } catch (error) {
      console.log(error)
      return res.status(500).
        send({ success: false, err: 'Ups, something went wrong!', error })
    }
  }

  for (let i = 1; i < req.body.length; i++) {
    if (list[i].recipeID == null || list[i].day == null || list[i].time ==
      null) {
      return res.status(400).send({
        success: false,
        err: `There is either the recipeID, the day or the time missing on list index ${i}`,
      })
    }

    let recipeID = parseInt(list[i].recipeID)
    let day = parseInt(list[i].day)
    let time = parseInt(list[i].time)

    if (isNaN(recipeID) || isNaN(day) || isNaN(time)) {
      return res.status(400).send({
        success: false,
        err: 'Either the recipeID, the day, or the time is not an int',
      })
    }

    try {
      await prisma.nutritionplanIncludesRecipe.create({
        data: {
          nutritionplanID: list[0].planID,
          recipeID: list[i].recipeID,
          day: list[i].day,
          time: list[i].time,
        },
      })
    } catch (error) {
      console.log(error)
      return res.status(500).
        send({ success: false, err: 'Ups, something went wrong!', error })
    }
  }

  res.status(201).send({
    success: true,
    msg: 'The nutritionplan has been edited successfully',
  })

}

module.exports = { createNutritionPlan, getSinglePlan, getPlans, editPlan }
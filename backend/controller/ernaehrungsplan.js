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
 *     500 - {success: false, err: Ups, something went wrong!, error} //Prisma error
 */
const getSinglePlan = (req, res) => {
  const { id } = req.params

  //Only allow Numbers, as the ID is stored as Number
  if (isNaN(id)) return res.status(400).
    json({ success: false, err: 'Please provide a Number' })

  try {
    const plan = prisma.nutritionplan.findUnique({
      where: {
        id: id,
      },
      include: {
        recipies: true,
      },
    })

    if (plan.userID !== req.user.id) {
      return res.status(403).
        send({ success: false, err: 'You can only get your own plans' })
    } else {
      return res.status(200).send({ success: true, plan })
    }

  } catch (error) {
    return res.status(500).
      send({ success: false, err: 'Ups, something went wrong!', error })
  }
}

const getPlans = (req, res) => {

}

module.exports = { createNutritionPlan, getSinglePlan, getPlans }
/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)
const bcrypt = require(`bcrypt`)

/**
 * Function to create new User with checks and everything
 * Used in ../API/account for the POST Method of the /API/account/ route
 * If User is created, Response gives back User Object
 **/
const createUser = async (req, res) => {

  //Get parameters of body
  const { email } = req.body
  const { username } = req.body
  const { password } = req.body
  const { answer } = req.body

  //Check if all Values are given
  if (!email || !username || !password || !answer
  ) {
    return res.status(400).
      json(
        { success: false, err: `Please provide all required Information!` })
  }

  //Check if User with email already exists
  const userExists = await prisma.user.count({
    where: {
      email: email,
    },
  })

  if (userExists === 0) {

    //Set time of Creation
    let created = new Date()

    //Hash given password
    let passwordHash = await bcrypt.hash(password, 10)

    //Hash given answer
    let answerHash = await bcrypt.hash(answer, 10)

    //create User with given parameters
    try {
      const newUser = await prisma.user.create(
        {
          data: {
            email: email,
            name: username,
            passwordHash: passwordHash,
            created: created,
            isAdmin: false,
            answer: answerHash,
          },
        },
      )
      return res.status(201).json({ success: true, msg: newUser })
    } catch (error) {
      res.status(500).
        json({ success: false, err: 'Ups, something went wrong!' })

    }

  } else {

    return res.status(400).
      json({
        success: false,
        err: 'A user is already using this email adress',
      })
  }
}

/**
 * Function to edit the email and username of an existing user
 * Used in ../API/account for the PUT Method of the /API/account/ route
 * Returns an error if there already is a user with the given email, or if there
 * is a database error
 */
const putUser = async (req, res) => {
  let data = {}

  // check if the email should be changed and if that email already belongs to
  // another account
  if (req.body.accountemail != null) {
    try {
      const users = await prisma.user.count({
        where: {
          email: req.body.accountemail,
        },
      })

      if (users === 0) {
        data['email'] = req.body.accountemail
      } else {
        return res.status(200).
          send({
            success: false,
            err: 'There already is an account with that email',
          })
      }
    } catch (error) {
      return res.status(500).
        json({ success: false, err: 'Ups, something went wrong!', error })
    }
  }

  if (req.body.username != null) {
    data['name'] = req.body.username
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: data,
    })
    return res.status(200).
      send({ success: true, msg: 'User successfully edited', user })
  } catch (error) {
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!', error })
  }
}

/**
 * Function to get all the recipes the user has created
 * Used in ../API/account/rezept for the GET Method of the /API/account/ route
 * Returns a list of all the recipes the user has created
 * Returns an error if there is a database error
 */
const seeOwnRecipe = async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        creatorID: req.user.id,
      },
    })
    console.log(recipes)
    return res.status(200).send({ success: true, recipes })
  } catch (err) {
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!', error })
  }
}

/**
 * Function to favorite a recipe as logged in user
 * Function gets the user from req.user and the ID via request parameter
 * If the user is already favoring the recipe, calling this function unfavors it
 * If the user is not already favoring the recipe, calling this function will favor it
 *
 * Parameter needs to be a number and a valid recipeID
 *
 * Responses:
 *    200 - {success: true, msg: User now favors given recipe, fav: 1} --> user favors given recipe
 *    200 - {success: true, msg: User no longer favors given recipe, fav: 0} --> user no longer favors given recipe
 *    500 - {success: false, err: Ups, something went wrong} --> Prisma error
 * */
const favRecipe = async (req, res) => {

  const {recipeID} = req.params
  const user = req.user.id

  //only allow numbers to be passed as id
  if(isNaN(recipeID)) return res.status(400).json({success: false, err: "Please provide a number!"})

  //check if user already is favoring the recipe
  let fav
  try{
    fav = await prisma.userFavorsRecipe.findMany({
      where:{
        AND: [
            {
            recipeID: Number(recipeID),
          },
          {
            userID: user
          }
        ]
      }
    })
  }catch (err){
    return res.status(500).json({success: false, err: "Ups, something went wrong!"})
  }

  //User doesnt favor that recipe yet
  if(fav.length === 0){
    //try to link the recipe and the user
    try {
      await prisma.userFavorsRecipe.create({
        data: {
          recipeID: Number(recipeID),
          userID: user
        }
      })
      return res.status(200).json({success: true, msg: "User now favors given recipe", fav: 1})
    } catch (err) {
      console.log(err)
      return res.status(500).json({success: false, err: "Ups, something went wrong!"})
    }
  //User already favors that recipe
  }else {
    //try to delete the link between user and recipe
    try{
      await prisma.userFavorsRecipe.delete({
        where: {
          userID_recipeID: {
            recipeID: Number(recipeID),
            userID: user,
          }
        }
      })
      return res.status(200).json({success: true, msg: "User no longer favors given recipe", fav: 0})
    }catch (err){
      return res.status(500).json({success: false, err: "Ups, something went wrong!"})
    }
  }
}

/**
 * Function to get the favorite recipes of the user
 * Doesnt need any special arguments in the req.body.
 *
 * Responses:
 *    200 - success: true, msg: [favoriteRecipes] --> returns an array with recipes inside (might be empty)
 *    500 - success: false, err: Ups, something went wrong! --> prisma error
 *
 * @uses formatOutput function to format prisma output
 * */
const getFavorite = async (req, res) => {

  //requesting user
  const user = req.user.id

  //query for all favored recipes of user
  let favRecipes
  try {
    favRecipes = await prisma.userFavorsRecipe.findMany({
      where: {
        userID: user,
      },
      //Only select the recipe field of userFavorsRecipe
      select: {
        recipe: true
      }
    })
  }catch (err){
    return res.status(500).json({success: false, err: "Ups something went wrong!"})
  }

  //Format prisma output to make it easier to work with
  const retFavRecipes = await formatOutput(favRecipes)

  //return result of query
  return res.status(200).json({success: true, msg: retFavRecipes})
}

/**
 * Helper function for getFavorite
 * Formats the array with nested objects returned from prisma,
 * so its easier to work with
 *
 * @param array array to be formated
 * @return returnArray array after formating
 * */
const formatOutput = async (array) => {
  let returnArray = []
  for (let i = 0; i < array.length; i++){
    console.log(array[i].recipe)
    returnArray.push(array[i].recipe)
  }
  return returnArray
}

/*****************************************
 * Export for use in other files
 ****************************************/
module.exports = { createUser, putUser, seeOwnRecipe, favRecipe, getFavorite }
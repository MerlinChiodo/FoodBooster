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
  if (!email || !username || !password || !answer) {
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
 * Function to change the password of an existing user
 * Used in ../API/account/password for the PUT Method of the /API/account/ route
 * Returns an error if the answer to the security question is wrong, or if there
 * is a database error
 */
const forgotPassword = async (req, res) => {
  if (req.body.sicherheitsfrageAntwort == null || req.body.neuesPasswort ==
    null || req.body.email == null) {
    return res.status(400).json(
      {
        success: false,
        err: `You must enter your email address, the answer to the security question and the new password`,
      })
  }

  let user
  try {
    user = await prisma.user.findMany({
      where: {
        email: req.body.email,
      },
    })
  } catch (error) {
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!', error })
  }

  if (user.length < 1) {
    return res.status(200).send({
      success: false,
      err: 'There is no user with that email'
    })
  }

  if (!await bcrypt.compare(req.body.sicherheitsfrageAntwort, user[0].answer)) {
    return res.status(200).
      send({
        success: false,
        err: 'The answer to the security question does not match',
      })
  } else {
    const hashedPassword = await bcrypt.hash(req.body.neuesPasswort, 10)
    try {
      await prisma.user.update({
        where: {
          id: user[0].id,
        },
        data: {
          passwordHash: hashedPassword,
        },
      })
      return res.status(200).
        send({ success: true, msg: 'The password has been reset' })
    } catch (error) {
      return res.status(500).
        json({ success: false, err: 'Ups, something went wrong!', error })
    }
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

/*****************************************
 * Export for use in other files
 ****************************************/
module.exports = { createUser, putUser, seeOwnRecipe, forgotPassword }


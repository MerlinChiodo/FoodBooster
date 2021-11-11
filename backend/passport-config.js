/*****************************************
 * Module imports for all required modules
 ****************************************/
/**
 * Prisma is used to interact with the websites database
 */
const prisma = require('./database')
/**
 * Bcrypt is used for password hashing and comparing
 */
const bcrypt = require('bcrypt')
/**
 * The Local strategy is the way passport validates the users credentials
 * All checking of credentials is handled locally on this server
 */
const LocalStrategy = require('passport-local').Strategy

/**
 * Initializes the passport to authenticate users. Must be run once before
 * authentication can begin
 * @param passport passport client
 */
function initialize (passport) {
  /**
   * This function decides if the login credentials are valid or not
   * @param email the email of the user
   * @param passwort the password of the user
   * @param done called every time the function is done with its checking
   * @returns {Promise<*>} the error, if one occurred, the user, and a failure
   * message, if the validation process has a problem
   */
  const authenticateUser = async (email, passwort, done) => {
    // search for the user
    let user

    try {
      user = searchUserByEmail(email)
    } catch (err) {
      return done(err)
    }
    // reject login if no user has been found
    if (user == null) {
      return done(null, false, { message: 'There is no user with that email' })
    }

    // validate the password the user entered, if an error occurs return that
    try {
      if (await bcrypt.compare(passwort, user.passwordHash)) {
        // if the password is correct, the user is forwarded and logged in
        return done(null, user)
      } else {
        // if the password is incorrect, a corresponding error message is sent
        return done(null, false, { message: 'Wrong password' })
      }
    } catch (err) {
      done(err)
    }
  }

  // give the strategy and the authentication function to passport
  passport.use(
    new LocalStrategy({ usernameField: 'email' },
      authenticateUser))
  passport.serializeUser((user, done) => done(null, user.email))
  passport.deserializeUser(async (email, done) => {
    // try to find the user, if an error occurs return that
    let user
    try {
      user = searchUserByEmail(email)
    } catch (err) {
      return done(err)
    }
    // if the user is found, return that user
    if (user !== null) {
      return done(null, user)
    }
  })
}

/**
 * Searches for a user with the specified email
 * Throws all errors
 * @param email the email of the searched user
 * @returns {Promise<void>} the user if there is one, null if there is none
 * @todo test later if this actually works
 */
async function searchUserByEmail (email) {
  try {
    user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    })
  } catch (err) {
    throw err
  }
  return user
}

module.exports = initialize
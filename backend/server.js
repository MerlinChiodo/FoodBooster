/*******************************************************************************
 * Module Imports for the server
 ******************************************************************************/
/**
 * Express is the fundamental framework for the server api
 */
const express = require('express')
const app = express()
/**
 * Passport is used for the user authentication
 */
const passport = require('passport')
/**
 * Express session is used to create user sessions for the users, so that users
 * only have to login once per session.
 * Used within passport
 */
const session = require('express-session')
/**
 * Flash enables passport to send messages within the response body
 */
const flash = require('express-flash')
const cors = require('cors')
/*******************************************************************************
 * Imports of other files from this project
 ******************************************************************************/
const { initialize, checkUnauthenticated } = require('./passport-config')

initialize(passport)

const account = require('./API/account')
const einkaufsliste = require('./API/einkaufsliste')
const ernaehrungsplan = require('./API/ernaehrungsplan')
const forum = require('./API/forum')
const meldung = require('./API/meldung')
const picture = require('./API/picture')
const rezept = require('./API/rezept')
/*******************************************************************************
 * Middleware for the server to use
 ******************************************************************************/
app.use(flash())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
}))
app.use(express.json())
app.use(express.urlencoded({
  extended: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
  credentials: true,
  origin: true,
}))
/*******************************************************************************
 * Router integration for the API
 ******************************************************************************/
app.use('/api/account', account)
app.use('/api/einkaufsliste', einkaufsliste)
app.use('/api/ernaehrungsplan', ernaehrungsplan)
app.use('/api/forum', forum)
app.use('/api/meldung', meldung)
app.use('/api/picture', picture)
app.use('/api/rezept', rezept)

/*******************************************************************************
 * Request Handling
 ******************************************************************************/
/**
 * Get Request for the homepage
 */
app.get('/', (req, res) => {
  res.send('Hallo')
})
/**
 * Get for the login page
 * Redirects to the home page if a logged in user tries to call this page
 */
app.get('/login', checkUnauthenticated, (req, res) => {
  res.send('Login Page')
})

/**
 * Log in method.
 * Redirects to home page if the user was successfully authenticated
 * Redirects back to the login page if the user couldn't be authenticated
 * Redirects to the home page if a logged in user tries to log in again
 */
app.post('/login', checkUnauthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}))

/**
 * Log out method.
 * Logs users out if they were logged in, then redirects to the login page.
 * If a logged out user calls this function, it only redirects.
 */
app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

/*******************************************************************************
 * Starting the server
 * Always has to be the last statement
 ******************************************************************************/
app.listen(80)

module.exports = app
/*****************************************
 * Module imports for all required modules
 ****************************************/
const express = require('express')
/**
 * The router allows us to receive requests in files that aren't the main file
 */
const router = express.Router()

const { createUser } = require('../controller/account.js')
const { checkIfUser, checkAuthenticated } = require('../passport-config')
const { putUser, seeOwnRecipe, favRecipe } = require('../controller/account')

/*******************************************************************************
 * Middleware for the server to use
 * Middleware has to be specified for every router, it isn't enough to just tell
 * the main express app what middleware to use
 ******************************************************************************/
router.use(express.urlencoded({ extended: false }))
router.use(express.json())

/*******************************************************************************
 * The request implementation
 ******************************************************************************/

router.route('/').post(createUser)

router.delete('/', (req, res) => {

})

router.put('/', checkIfUser, putUser)

router.put('/password', (req, res) => {

})

router.post('/favorite/:recipeID',checkAuthenticated, favRecipe)

router.get('/favorite', (req, res) => {

})

router.get('/rezept', checkAuthenticated, seeOwnRecipe)

module.exports = router
/*****************************************
 * Module imports for all required modules
 ****************************************/
const express = require('express')
const { getRecipes, getFeatured, createRecipe } = require('../controller/rezept')
const {checkAuthenticated} = require("../passport-config");

/**
 * The router allows us to receive requests in files that aren't the main file
 */
const router = express.Router()

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
router.post('/',createRecipe) //TODO: checkAuthenticated einfügen

router.put('/', (req, res) => {

})

router.get('/', (req, res) => {

})

router.get('/featured', getFeatured)

router.get('/search', getRecipes)

router.post('/bewertung', (req, res) => {

})

router.post('/kommentar', (req, res) => {

})

module.exports = router
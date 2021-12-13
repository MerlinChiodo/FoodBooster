/*****************************************
 * Module imports for all required modules
 ****************************************/
const express = require('express')
const {createNutritionPlan} = require('../controller/ernaehrungsplan')
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
router.post('/', checkAuthenticated, createNutritionPlan)

router.put('/', (req, res) => {

})

router.get('/', (req, res) => {

})

router.get('/liste', (req, res) => {

})

module.exports = router
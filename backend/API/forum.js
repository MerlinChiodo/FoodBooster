/*****************************************
 * Module imports for all required modules
 ****************************************/
const express = require('express')
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
router.post('/', (req, res) => {

})

router.get('/', (req, res) => {

})

router.put('/kommentar', (req, res) => {

})

router.delete('/kommentar', (req, res) => {

})

router.delete('/', (req, res) => {

})

router.get('/liste', (req, res) => {

})

module.exports = router
/*****************************************
 * Module imports for all required modules
 ****************************************/
const express = require('express')
const { getRecipes, getFeatured, editRecipe, createRecipe } = require(
  '../controller/rezept')
const { checkAuthenticated } = require('../passport-config')
const multer = require('multer')
const path = require('path')

/************************************
 * Multer Config
 ************************************/
//destination to save picture to, how to handle the filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

//which type of file to accept
const fileFiler = (req, file, cb) => {
  //accept file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
    //reject file
  } else {
    cb(null, false)
  }
}

//Setup multer with defined config
const upload = multer({
  storage: storage,
  fileFiler: fileFiler,
  limits: { fileSize: 1024 * 1024 * 40 }, //40mb
})

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
//using multer middleware to handle files in createRecipe
router.post('/', checkAuthenticated, upload.array('productImage'), createRecipe)

router.put('/', checkAuthenticated, upload.array('productImage'), editRecipe)

router.get('/', (req, res) => {

})

router.get('/featured', getFeatured)

router.get('/search', getRecipes)

router.post('/bewertung', (req, res) => {

})

router.post('/kommentar', (req, res) => {

})

module.exports = router
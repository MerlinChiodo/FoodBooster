/*****************************************
 * Module imports for all required modules
 ****************************************/
const express = require('express')
const { getRecipes, getFeatured, createRecipe } = require('../controller/rezept')
const {checkAuthenticated} = require("../passport-config");
const multer = require('multer')
const path = require('path')

/************************************
 * Multer Config
 ************************************/
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads')
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const fileFiler = (req,file,cb) => {
    //accept file
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null,true);
    //reject file
    }else{
        cb(null,false);
    }
}
const upload = multer({
    storage: storage,
    fileFiler: fileFiler,
    limits: { fileSize: 1024*1024*40 } //40mb
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
router.post('/', checkAuthenticated, upload.array('productImage'), createRecipe)

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
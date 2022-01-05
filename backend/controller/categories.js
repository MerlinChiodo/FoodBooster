/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)


/**
 * Function to get all categories
 *
 * Returns all categories, you can currently use for a recipe
 *
 * Responses:
 *      - 200 {success: true, msg: {categories}} --> ingredients as array
 *      - 500 {success: false, err: Ups, something went wrong!} --> Prisma error
 * */
const getCategories = async (req, res) => {

    try{
        const categories = await prisma.category.findMany()

        return res.status(200).send({success: true, msg: categories})
    }catch (err){
        return res.status(500).send("Ups, something went wrong!")
    }
}

module.exports = {
    getCategories,
}
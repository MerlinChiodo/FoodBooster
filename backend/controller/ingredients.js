/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)


/**
 * Function to get all ingredients
 *
 * Returns all ingredients, you can currently use for a recipe
 *
 * Responses:
 *      - 200 {success: true, msg: {ingredients}} --> ingredients as array
 *      - 500 {success: false, err: Ups, something went wrong!} --> Prisma error
 * */
const getIngredients = async (req, res) => {

    try{
        const ingredients = await prisma.ingredient.findMany()

        return res.status(200).send({success: true, msg: ingredients})
    }catch (err){
        return res.status(500).send("Ups, something went wrong!")
    }
}

module.exports = {
    getIngredients,
}
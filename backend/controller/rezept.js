/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)
const underscore = require('underscore');


/**
 *
 * Returns a filtered array of recepies.
 * If no special filtering is needed, u can leave the query body empty --> returns all recepies
 * getRecipes filters using an AND-Method --> name & servings, only returns recepies with given name AND servings
 * If a filtering field is not given, it is being ignored
 * Defined Arguments:
 *      - name --> searches for recipe with exact name
 *      - bewertung --> searches for recipes with exact rating
 *      - author --> searches for recipes created by creatorID
 *      - servings --> searches for recipes with exact servings
 *      - featured --> searches for featured or non featured recipes
 *      - description --> searches for recipes with given keywords in description
 *      - ingredients --> searches for recipes with given ingredients
 *      - categories --> searches for recipes with given categories
 *          !ingredients and categories need ARRAYS. Arrays in querys are defined like this:!
 *          api/rezept/search/?ingredients[]=Kartoffel&ingredients[]=Tomate&categories[]=Kuchen&ingredients[]=Salz
 * Responses:   201 - {success: true, msg: {ArrayOfRecepies}}
 *              201 - {success: true, msg: {ArrayOfFilteredRecepies}}
 *              500 - {success: false, msg: {Ups, something went wrong!}} --> Prisma error
 *
 *  TODO : Database cleanup --> Attributes are mixed with english and german
 * */
const getRecipes = async (req,res) =>{

        //No special query defined --> return full list of recepies
        if ( underscore.isEmpty( req.query ) ){

            const recipes = await prisma.recipe.findMany()

            return res.status(200).json( { success: true, msg: recipes } )
        }

        try {
            //If sorting is requested, we can use prisma built-ins
            const recipesFiltered = await prisma.recipe.findMany({
                where: {
                    //Filters using AND --> name & servings, only returns recepies with given name AND servings
                    AND: [
                        {name: req.query.name},
                        //Using ternary operator, to cast without error
                        { bewertung: ( !req.query.bewertung ) ? undefined : Number( req.query.bewertung ) },
                        { creatorID: ( !req.query.author ) ? undefined : Number( req.query.author ) },
                        { servings: ( !req.query.servings ) ? undefined : Number( req.query.servings ) },
                        { featured: ( !req.query.featured ) ? undefined : ( req.query.featured === "true" ) },
                        { description: {
                            contains: req.query.description }
                        },
                        { ingredients: {
                                every: {
                                    ingredientName: { in: req.query.ingredients }
                                },
                            },
                        },
                        { category: {
                            every: {
                                categoryName: { in: req.query.categories }
                            },
                            },
                        }
                    ],
                }
            } )

            return res.status(200).json( { success: true, msg: recipesFiltered} )
        } catch(err){
            console.log(err)
            return res.status(500).json( { success: false, err: "Ups, something went wrong!" } )
        }
}

module.exports = { getRecipes }
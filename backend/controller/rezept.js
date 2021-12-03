/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)
const underscore = require('underscore')


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
 * Responses:   200 - {success: true, msg: {ArrayOfRecepies}}
 *              200 - {success: true, msg: {ArrayOfFilteredRecepies}}
 *              500 - {success: false, msg: {Ups, something went wrong!}} --> Prisma error
 *
 * */
const getRecipes = async (req, res) => {

  //No special query defined --> return full list of recepies
  if (underscore.isEmpty(req.query)) {

    const recipes = await prisma.recipe.findMany()

    return res.status(200).json({ success: true, msg: recipes })
  }

  try {
    //If sorting is requested, we can use prisma built-ins
    const recipesFiltered = await prisma.recipe.findMany({
      where: {
        //Filters using AND --> name & servings, only returns recepies with given name AND servings
        AND: [
          { name: req.query.name },
          //Using ternary operator, to cast without error
          {
            bewertung: (!req.query.bewertung) ? undefined : Number(
              req.query.bewertung),
          },
          {
            creatorID: (!req.query.author) ? undefined : Number(
              req.query.author),
          },
          {
            servings: (!req.query.servings) ? undefined : Number(
              req.query.servings),
          },
          {
            featured: (!req.query.featured)
              ? undefined
              : (req.query.featured === 'true'),
          },
          {
            description: {
              contains: req.query.description,
            },
          },
          {
            ingredients: {
              every: {
                ingredientName: { in: req.query.ingredients },
              },
            },
          },
          {
            category: {
              every: {
                categoryName: { in: req.query.categories },
              },
            },
          },
        ],
      },
    })

    return res.status(200).json({ success: true, msg: recipesFiltered })
  } catch (err) {
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!' })
  }
}

/**
 * Function to get all featured recipes
 * Looks for all recipes where the featured attribute is set to true
 *
 * Returns status code 200 and a list of all featured recipes ordered by rating
 * If there is a database error the response is a status code 500 and the error
 */
const getFeatured = async (req, res) => {
  let featured = []
  try {
    featured = await prisma.recipe.findMany({
      where: {
        featured: true,
      },
      orderBy: {
        rating: 'desc',
      },
    })
    return res.status(200).send({ success: true, featured })
  } catch (error) {
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!', error })
  }

}
/**
 * Function to create a Recipe
 * Checks if every required field is given and creates a recipe after.
 * Uses the authorID from session, so no author needs to be send.
 * !!!!!!! Function is not using JSON-Contenttype!!!!!!!!!!
 * !!!!!!! Use multipart/form-data as Contenttype!!!!!!!!!!
 * Arguments to create a recipe: (? --> Optional)
 *    name: name of the recipe
 *    description: description of the recipe
 *    ingredients (comma seperated): ingredients used in recipe (using name)
 *    categories (comma seperated): categories for recipe (using name)
 *    servings: how many servings is the recipe for
 *    pictures (same field name for every picture): pictures used by this recipe
 *
 * Possible responses:
 *    400 - {success: false, err: Please provide all required information!} --> Some information is missing
 *    400 - {success: false, err: Please provide ingredients for the recipe} --> no ingredients are given
 *    500 - {success: false, err: Ups, something went wrong!} --> Database error
 *    201 - {success: true, msg: {created recipe}} --> recipe was created and returned
 */
const createRecipe = async (req, res) => {
  console.log(req.files)
  console.log(req.body)

  //Get all infos
  const {name, description, ingredients, categories, servings} = req.body

  //Get creator
  const creator = req.user.id

  //Check if every required item is given
  if(!name || !description || !ingredients || !servings){
    return res.status(400).send( {success: false, err: "Please provide all required information!"} )
  }

  //Check if ingredients are given
  if(ingredients.length === 0){
    return res.status(400).send( {success: false, err: "Please provide ingredients for the recipe"} )
  }

  //Split string of ingredients into array  of ingredients
  const ingredientsArray = ingredients.split(",")

  //Set time of Creation
  let created = new Date()

  try {
    //create recipe without links
    const recipe = await prisma.recipe.create(
        {
          data: {
            creatorID: creator,
            name: name,
            description: description,
            servings: Number(servings),
            created: created,
            featured: false,
          },
        })

    try {
      //create a link for every ingredient given
      for (let ingredient of ingredientsArray) {
        let linkRecipeIngredient = await prisma.recipeIncludesIngredient.create(
            {
              data: {
                ingredientName: ingredient,
                recipeID: recipe.id,
              }
            })
      }

      //Check if categories are given
      if(categories && categories.length !== 0){
        //split categories into array
        const categoriesArray = categories.split(",")
        //create a link for every category given
        for (let category of categoriesArray){
          let linkRecipeCategory = await prisma.recipeInCategory.create(
              {
                data: {
                  categoryName: category,
                  recipeID: recipe.id,
                },
              })
        }
      }
    }catch (error){
      //Something went wrong while linking --> revert creation of recipe
      await prisma.recipe.delete({
        where : {
          id: recipe.id
        }
      })
      return res.status(500).send( {success: false, err: "Ups, something went wrong!"} )
    }

    //Check if files are given
    if(req.files.length !== 0 ){
      //create a link for every file given
      for(file of req.files){
        await prisma.picture.create({
          data: {
            url: file.path,
            recipeID: recipe.id
          },
        })
      }
    }

    //recipe after linking is done
    return res.status(201).send( {success: true, msg: recipe} )
  }catch (err){
    return res.status(500).send( {success: false, err: "Ups, something went wrong!"} )
  }
}

module.exports = { getRecipes, getFeatured, createRecipe }
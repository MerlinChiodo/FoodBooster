/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)
const underscore = require('underscore')

/**
 *
 * Returns a filtered array of recipes.
 * If no special filtering is needed, u can leave the query body empty --> returns all recepies
 * getRecipes filters using an AND-Method --> name & servings, only returns recepies with given name AND servings
 * If a filtering field is not given, it is being ignored
 * Defined Arguments:
 *      - name --> searches for recipe with exact name
 *      - rating --> searches for recipes with exact rating
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
 *              500 - {success: false, err: {Ups, something went wrong!}} --> Prisma error
 *
 * */
const getRecipes = async (req, res) => {

  //No special query defined --> return full list of recipes
  if (underscore.isEmpty(req.query)) {

    const recipes = await prisma.recipe.findMany({
      include: {
        pictures: true,
      },
    })

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
            rating: (!req.query.rating) ? undefined : Number(
              req.query.rating),
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
      include: {
        pictures: true,
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
 *    amounts (comma seperated): amounts for each ingredient
 *      -->Amounts for Ingredients are given with position in string:
 *            Ingredients: "Tomate,Kartoffel",
 *            Amounts: "3,2" creates a recipe using 3 Tomaten and 2 Kartoffeln
 *    categories (comma seperated): categories for recipe (using name)
 *    servings: how many servings is the recipe for
 *    pictures (same field name for every picture): pictures used by this recipe
 *
 * Possible responses:
 *    400 - {success: false, err: Please provide all required information!} --> Some information is missing
 *    400 - {success: false, err: Please provide ingredients for the recipe} --> no ingredients are given
 *    400 - {success: false, err: Please provide amounts for every given ingredients} --> no/not all amounts given
 *    500 - {success: false, err: Ups, something went wrong!} --> Database error
 *    201 - {success: true, msg: {created recipe}} --> recipe was created and returned
 */
const createRecipe = async (req, res) => {

  //Get all infos
  const {
    name,
    description,
    ingredients,
    categories,
    servings,
    amounts,
  } = req.body

  //Get creator
  const creator = req.user.id

  //Check if every required item is given
  if (!name || !description || !ingredients || !servings || !amounts) {
    return res.status(400).
      send({ success: false, err: 'Please provide all required information!' })
  }

  //Check if ingredients are given
  if (ingredients.length === 0) {
    return res.status(400).
      send({ success: false, err: 'Please provide ingredients for the recipe' })
  }

  //Split string of ingredients into array of ingredients
  const ingredientsArray = ingredients.split(',')

  //Split string of amounts into array of amounts
  const amountsArray = amounts.split(`,`)

  //Check if every ingredient was given with an amount
  if (amountsArray.length !== ingredientsArray.length) {
    return res.status(400).
      send({
        success: false,
        err: 'Please provide amounts only for every given ingredients',
      })
  }

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
        await prisma.recipeIncludesIngredient.create(
          {
            data: {
              ingredientName: ingredient,
              recipeID: recipe.id,
              amount: Number(
                amountsArray[(ingredientsArray.indexOf(ingredient))]),
            },
          })
      }

      //Check if categories are given
      if (categories && categories.length !== 0) {
        //split categories into array
        const categoriesArray = categories.split(',')
        //create a link for every category given
        for (let category of categoriesArray) {
          await prisma.recipeInCategory.create(
            {
              data: {
                categoryName: category,
                recipeID: recipe.id,
              },
            })
        }
      }
    } catch (error) {
      //Something went wrong while linking --> revert creation of recipe
      await prisma.recipe.delete({
        where: {
          id: recipe.id,
        },
      })
      return res.status(500).
        send({ success: false, err: 'Ups, something went wrong!' })
    }

    //Check if files are given
    if (req.files.length !== 0) {
      //create a link for every file given
      for (file of req.files) {
        await prisma.picture.create({
          data: {
            url: file.path.toLowerCase(),
            recipeID: recipe.id,
          },
        })
      }
    }

    //recipe after linking is done
    return res.status(201).send({ success: true, msg: recipe })
  } catch (err) {
    return res.status(500).
      send({ success: false, err: 'Ups, something went wrong!' })
  }
}

/**
 *
 * Returns a single Recipe.
 * Searches by ID and will only return the unique Recipe
 * If given non existing ID, or non numeric values it returns error code
 * Responses:   200 - {success: true, msg: recipe}
 *              404 - {success: false, err: {404 Not Found}} --> No Recipe found
 *              400 - {success: false, err: {Please provide a Number}} --> Wrong Parameter given
 *              500 - {success: false, err: {Ups, something went wrong!}} --> Prisma Error
 *
 *  TODO : Database cleanup --> Attributes are mixed with english and german
 * */
const getSingleRecipe = async (req, res) => {

  //get the recipeID out of the params
  const { recipeID } = req.params

  //Only allow Numbers, as the ID is stored as Number
  if (isNaN(recipeID)) return res.status(400).
    json({ success: false, err: 'Please provide a Number' })

  //read recipe from database
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(recipeID),
      },
      include: {
        pictures: true,
        category: true,
        ingredients: true,
      },
    })
    //Check if a recipe has been found, send response accordingly
    if (recipe) {
      return res.status(200).json({ success: true, msg: recipe })
    } else {
      return res.status(404).json({ success: false, err: '404 Not Found' })
    }
  } catch (err) {
    return res.status(500).json({ success: false, err: 'err' })
  }
}

/**
 * Edits recipes
 * Needs to get rezeptID to identify the recipe that you want to change
 * Note that you can only change your own recipes
 * Defined Arguments:
 *      - rezeptID --> needed to identify the recipe you want to change
 *      - name --> changes the name of the recipe
 *      - description --> changes the description of the recipe
 *      - servings --> changes the servings of the recipe
 *      - ingredients (csv) --> adds the ingredients to the recipe
 *     - amounts (csv) --> gives the amounts for each ingredient
 *      - removeIngredients(csv) --> removes the ingredients from the recipe
 *      - categories(csv) --> adds the categories to the recipe
 *      - removeCategories(csv) --> removes the categories from the recipe
 *      - removePictures(csv) --> removes the pictures from the recipe
 * Responses:   200 - {success: true, recipe}
 *              400 - {success: false, err: 'There must be a rezeptID identify the recipe you want to change. '}
 *                --> There is no rezeptID
 *              500 - {success: false, msg: {Ups, something went wrong!}, error} --> Prisma error
 *              400 - {success: false, err: "Ingredients and Amounts must be consistent!"}
 */
const editRecipe = async (req, res) => {
  let {
    rezeptID,
    name,
    description,
    ingredients,
    removeIngredients,
    categories,
    removeCategories,
    servings,
    removePictures,
    amounts,
  } = req.body

  if (ingredients) {
    ingredients = ingredients.split(',')
  }
  if (amounts) {
    amounts = amounts.split(',')
  }
  if (amounts.length !== ingredients.length) {
    return res.status(400).
      json(
        { success: false, err: 'Ingredients and Amounts must be consistent!' })
  }
  if (removeIngredients) {
    removeIngredients = removeIngredients.split(',')
  }
  if (categories) {
    categories = categories.split(',')
  }
  if (removeCategories) {
    removeCategories = removeCategories.split(',')
  }
  if (removePictures) {
    removePictures = removePictures.split(',')
  }

  if (!rezeptID) {
    return res.status(400).send({
      success: false,
      err: 'There must be a rezeptID identify the recipe you want to change. ',
    })
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(rezeptID),
      },
      include: {
        creator: true,
      },
    })
    if (!recipe) {
      return res.status(404).
        send({ success: false, err: 'There is no recipe with that id' })
    }
    if (recipe.creator.id !== req.user.id) {
      return res.status(403).
        send({ err: 'You can only change your own recipes' },
        )
    }
  } catch (err) {
    console.log(err)
    return res.status(500).send(err)
  }

  let data = {}
  if (name) {
    Object.assign(data, { name: name })
  }
  if (description) {
    Object.assign(data, { description: description })
  }
  if (servings) {
    Object.assign(data, { servings: Number(servings) })
  }

  let recipe
  try {
    recipe = await prisma.recipe.update({
      where: {
        id: Number(rezeptID),
      },
      data: data,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!', error })
  }

  if (ingredients && ingredients.length > 0) {
    let usedIngredients = []
    try {
      for (let ingredient of ingredients) {
        try {
          const ingredientUsed = await prisma.recipeIncludesIngredient.findUnique(
            {
              where: {
                ingredientName_recipeID: {
                  ingredientName: ingredient.trim(),
                  recipeID: Number(rezeptID),
                },
              },
            })
          if (ingredientUsed != null) {
            await prisma.recipeIncludesIngredient.update({
              where: {
                ingredientName_recipeID: {
                  ingredientName: ingredient.trim(),
                  recipeID: Number(rezeptID),
                },
              },
              data: {
                amount: Number(amounts[(ingredients.indexOf(ingredient))]),
              },
            })
            usedIngredients.push(ingredient)
          }
        } catch (err) {
          console.log(err)
          return res.status(500).
            json({ success: false, err: 'Ups, something went wrong!', error })
        }
      }
      if (usedIngredients.length > 0) {
        for (let ingredient of usedIngredients) {
          amounts.splice(ingredients.indexOf(ingredient), 1)
          ingredients.splice(ingredients.indexOf(ingredient), 1)
        }
      }
    } catch (err) {
      console.log(err)
      return res.status(500).
        json({ success: false, err: 'Ups, something went wrong!', error })
    }
  }

  if (ingredients && ingredients.length > 0) {
    try {
      for (let ingredient of ingredients) {
        await prisma.recipeIncludesIngredient.create({
          data: {
            ingredientName: ingredient.trim(),
            amount: Number(amounts[(ingredients.indexOf(ingredient))]),
            recipeID: Number(rezeptID),
          },
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).
        json({ success: false, err: 'Ups, something went wrong!', error })
    }
  }

  if (removeIngredients && removeIngredients.length > 0) {
    for (let ingredient of removeIngredients) {
      try {
        await prisma.recipeIncludesIngredient.delete({
          where: {
            ingredientName_recipeID: {
              ingredientName: ingredient.trim(),
              recipeID: Number(rezeptID),
            },
          },
        })
      } catch (error) {
        console.log(error)
        return res.status(500).
          json({ success: false, err: 'Ups, something went wrong!', error })
      }
    }
  }

  if (removeCategories && removeCategories.length > 0) {
    for (let category of removeCategories) {
      try {
        await prisma.recipeInCategory.delete({
          where: {
            recipeID_categoryName: {
              categoryName: category.trim(),
              recipeID: Number(rezeptID),
            },
          },
        })
      } catch (error) {
        console.log(error)
        return res.status(500).
          json({ success: false, err: 'Ups, something went wrong!', error })
      }
    }
  }

  if (categories && categories.length > 0) {
    try {
      for (let category of categories) {
        await prisma.recipeInCategory.create({
          data: {
            categoryName: category.trim(),
            recipeID: Number(rezeptID),
          },
        })
      }
    } catch (error) {
      console.log(error)
      return res.status(500).
        json({ success: false, err: 'Ups, something went wrong!', error })
    }
  }

  if (req.files.length > 0) {
    try {
      for (let picture of req.files) {
        await prisma.picture.create({
          data: {
            url: picture.trim.path.toLowerCase(),
            recipeID: Number(rezeptID),
          },
        })
      }
    } catch (error) {
      return res.status(500).
        json({ success: false, err: 'Ups, something went wrong!', error })
    }
  }

  if (removePictures && removePictures.length > 0) {
    for (let picture of removePictures) {
      try {
        await prisma.picture.deleteMany({
          where: {
            url: picture.trim(),
          },
        })
      } catch (error) {
        return res.status(500).
          json({ success: false, err: 'Ups, something went wrong!', error })
      }
    }
  }
  return res.status(200).send({ success: true, recipe })
}

/**
 * Function to rate a recipe
 * The rating needs to be calculated by the frontend! recipe.rating/recipe.totalRatings
 * Arguments:
 *    - recipeID --> the recipe to be rated
 *    - rating --> a rating from 1-5
 * Responses:
 *    400 - {success: false, err: Please provide all required information!} --> Some information is missing
 *    200 - {success: true, msg: {updatedRecipe}} --> Recipe was rated
 *    403 - {success: false, err: You cant vote for your own recipe!} --> U can only vote for recipes of other users
 *    500 - {success: false, err: Ups, something went wrong!} --> Prisma Error
 */
const rateRecipe = async (req, res) => {

  let { recipeID, rating } = req.body

  //Check if every required argument is given
  if (!recipeID || !rating) {
    return res.status(400).
      send({ success: false, err: 'Please provide all required information!' })
  }

  recipeID = Number(recipeID)
  rating = Number(rating)

  if (isNaN(recipeID) || isNaN(rating)) {
    return res.status(400).send({
      success: false, err: 'One of the arguments is ' +
        'not a string',
    })
  }

  //Get recipe to calculate new rating
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: recipeID,
      },
    })
    if (recipe == null) {
      return res.status(400).
        send({ success: false, err: 'There is no recipe with that id' })
    }
    //the user cant rate his own recipe
    if (recipe.creatorID !== req.user.id) {

      await prisma.recipe.update({
        where: {
          id: recipe.id,
        },
        data: {
          rating: (recipe.rating + rating),
          totalRatings: (recipe.totalRatings + 1),
        },
      })

      //Update Info in returned recipe manually to decrease loading time
      recipe.rating += rating
      recipe.totalRatings++
      return res.status(200).send({ success: true, msg: recipe })
    } else {
      //User tried to vote for his own recipe
      return res.status(403).
        send({ success: false, err: 'You cant vote for your own recipe!' })
    }
  } catch (err) {
    //Prisma error
    console.log(err)
    return res.status(500).
      send({ success: false, err: 'Ups, something went wrong!' })
  }
}

/**
 * Function to comment on a recipe or answer to a comment of a recipe
 * Arguments:
 *    - rezeptID--> the recipe that the comment was posted to
 *    - kommentar --> the comment as a string
 *    - kommentarID --> the comment id if the new comment answers to another comment
 * Responses:
 *    400 - {success: false, err: 'There must be at least the id of the recipe you
 *    want to comment and the comment itself'} --> Some information is missing
 *    404 - {success: false, err: `There is no recipe with the id ${rezeptID}`} --> There is no recipe with that id
 *    200 - {success: true, comment} --> Comment was created
 *    500 - {success: false, err: Ups, something went wrong!} --> Prisma Error
 */
const commentRecipe = async (req, res) => {
  const {
    rezeptID,
    kommentarID,
    kommentar,
  } = req.body

  if (!rezeptID || !kommentar) {
    return res.status(400).send({
      success: false, err: 'There must be at least the id ' +
        'of the recipe you want to comment and the comment itself',
    })
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: Number(rezeptID),
      },
    })
    if (recipe == null) {
      return res.status(404).
        send(
          { success: false, err: `There is no recipe with the id ${rezeptID}` })
    }
  } catch (error) {
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!', error })
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        text: String(kommentar),
        userID: req.user.id,
        created: new Date(),
        recipeID: Number(rezeptID),
        topCommentID: (kommentarID ? Number(kommentarID) : undefined),
      },
    })
    return res.status(201).send({ success: true, comment })
  } catch (error) {
    console.log(error)
    return res.status(500).
      json({ success: false, err: 'Ups, something went wrong!', error })
  }
}

module.exports = {
  getRecipes,
  getFeatured,
  createRecipe,
  rateRecipe,
  editRecipe,
  getSingleRecipe,
  commentRecipe,
}

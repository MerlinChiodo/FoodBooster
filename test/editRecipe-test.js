/*****************************************
 * Module imports for all required modules
 ****************************************/
let chai = require(`chai`)
let chaiHTTP = require(`chai-http`)
let server = require(`../backend/server`)
let prisma = require(`../backend/prismaClient`)
const bcrypt = require('bcrypt')
let expect = chai.expect

// Useful for testing the Routing inside the app
chai.use(chaiHTTP)

const agent = chai.request.agent(server)

const revert = async () => {
  await prisma.recipe.update({
    where: {
      id: 1,
    },
    data: {
      servings: 4,
      name: 'TEST Spaghetti mit Soße',
    },
  })
  await prisma.recipeIncludesIngredient.deleteMany({
    where: {
      recipeID: 1,
    },
  })
}

describe('Edit Recipe Testsuite', async () => {
  /**
   * Tests if the recipe is edited if everything is correct
   */
  it('should be editing the recipe', async () => {
    agent.post('/login').
      send({ email: 'peter@mail.com', password: 'password' }).
      then(async (res) => {
        try {
          const recipeData = {
            rezeptID: 1,
            servings: 2,
            name: 'TEST Spaghetti mit Sauce',
            ingredients: ['TEST_Salz', 'TEST_Pfeffer', 'TEST_Spaghetti'],
          }

          // request the account change
          const result = await agent.put('/api/rezept').
            send(recipeData)

          expect(result.body.success).to.be.true
          expect(result.body.recipe.name).to.equal(recipeData.name)
          expect(result.body.recipe.servings).to.equal(recipeData.servings)

          const ingredients = await prisma.recipeIncludesIngredient.findMany({
            where: {
              recipeID: 1,
            },
          })
          ingredients.forEach(ingredient => expect(
            recipeData.ingredients.includes(
              ingredient.ingredientName)).to.be.true)
        } catch (err) {
          console.log(err)
        }
        await revert()

      }).catch((err) => {
      console.log(err)
    })
  })

  it('should not change anything', async () => {
    agent.post('/login').
      send({ email: 'peter@mail.com', password: 'password' }).
      then(async (res) => {
        expect(res.status).to.not.equal(403)
        expect(res.status).to.not.equal(401)
        const recipeData = {
          servings: 2,
          name: 'TEST Spaghetti mit Sauce',
          ingredients: ['TEST_Salz', 'TEST_Pfeffer', 'TEST_Spaghetti'],
        }

        // request the account change
        const result = await agent.put('/api/rezept').
          send(recipeData)

        expect(result.status).to.equal(401)

      }).catch((err) => {
      console.log(err)
    })
  })
})
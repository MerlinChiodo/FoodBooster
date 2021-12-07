/*****************************************
 * Module imports for all required modules
 ****************************************/
let chai = require(`chai`)
let chaiHTTP = require(`chai-http`)
let server = require(`../backend/server`)
let prisma = require(`../backend/prismaClient`)
let expect = chai.expect

chai.use(chaiHTTP)

const agent = chai.request.agent(server)

describe('/GET account/rezept', async () => {
  /**
   * Tests if there are recipes returned if a user has recipes
   */
  it('should get one recipe', async () => {
    agent.post('/login').
      send({
        email: 'accountGetRecipe@test.de',
        password: 'recipe',
      }).
      then(async (res) => {

        // request the recipes
        const result = await agent.post('/api/account/rezept').
          send()

        expect(result.status).to.equal(200)
        expect(result.body.success).to.be.true
        expect(result.body.recipes[0].id).to.equal(3)
      })
  })

  /**
   * Tests if there are no recipes returned if the user has no recipes
   */
  it('should get zero recipes', async () => {
    agent.post('/login').
      send({
        email: 'test2@test.com',
        password: 'test',
      }).
      then(async (res) => {

        // request the recipes
        const result = await agent.post('/api/account/rezept').
          send()

        expect(result.status).to.equal(200)
        expect(result.body.success).to.be.true
        expect(result.body.recipes.length).to.equal(0)
      })
  })
})

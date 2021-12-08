/*****************************************
 * Module imports for all required modules
 ****************************************/
let chai = require(`chai`)
let chaiHTTP = require(`chai-http`)
let server = require(`../backend/server`)
let expect = chai.expect

chai.use(chaiHTTP)

const agent = chai.request.agent(server)

describe('/GET account/rezept/featured', async () => {
  /**
   * Tests if there are featured recipes returned and if those recipes are featured
   * or not
   */
  it('should get at least one recipe', async () => {
    const result = await agent.get('/api/rezept/featured').send()

    expect(result.status).to.equal(200)
    expect(result.body.success).to.be.true
    expect(result.body.featured.length).to.be.greaterThan(0)
    result.body.featured.forEach(recipe => expect(recipe.featured).to.be.true)
  })
})

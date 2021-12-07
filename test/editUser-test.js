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

//Test data to create User
let newDataCorrect = {
  email: 'mustermail2@muster.com',
  username: 'musterName',
  password: 'muster',
  answer: 'Hund',
}

let id = 1035

const agent = chai.request.agent(server)

/**
 * Function that runs before the tests, that creates a user
 */
before(async () => {
  let res = await chai.request(server).post('/api/account').send(newDataCorrect)
  if (res.body.msg !== undefined) {
    id = res.body.msg.id
  }
})

/**
 * Function which gets called after running the tests
 * Makes sure all inserted Data is getting delete after tests
 **/
after(async () => {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    })
  } catch (error) {
  }
  agent.close()
})

describe('/PUT user', async () => {
  /**
   * Tests if a user can change his username
   */
  it('should edit the username without problem', async () => {
    // log in
    agent.post('/login').
      send({ id: id, password: newDataCorrect.password }).
      then(async (res) => {

        // request the account change
        const result = await agent.post('/api/account').
          send({ username: 'nameMuster' })

        expect(result.body.success).to.be.true
        expect(result.body.user.name).to.be('nameMuster')
      })
  })

  /**
   * Tests if a user can change his email
   */
  it('should edit the email without problem', async () => {
    // log in
    agent.post('/login').
      send({ id: id, password: newDataCorrect.password }).
      then(async (res) => {

        // request the account change
        const result = await agent.post('/api/account').
          send({ accountemail: 'mustermail2@muster.com' })

        expect(result.body.success).to.be.true
        expect(result.body.user.email).to.be('mustermail2@muster.com')
      })
  })

  /**
   * Tests if a user can change his email to an email that is already taken
   */
  it('should edit the email without problem', async () => {
    // log in
    agent.post('/login').
      send({ id: id, password: newDataCorrect.password }).
      then(async (res) => {

        // request the account change
        const result = await agent.post('/api/account').
          send({ accountemail: 'test@test.de' })

        expect(result.body.success).to.be.false
        expect(result.body.err).
          to.
          be('There already is an account with that email')
      })
  })
})

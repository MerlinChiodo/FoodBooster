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
  email: 'forgotPassword@muster.com',
  username: 'forgotPassword',
  password: 'passwordForgot',
  answer: 'Hund',
}

let id = 0

const agent = chai.request.agent(server)

describe('/PUT account/password', async () => {
  /**
   * Function that runs before the tests, that creates a user
   */
  before(async () => {
    let res = await chai.request(server).
      post('/api/account').
      send(newDataCorrect)
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

  /**
   * Tests if a user can change the password, when providing the correct answer
   * to the security question
   */
  it('should allow the password reset', async () => {
    agent.post('/login').
      send({ id: id, password: newDataCorrect.password }).
      then(async (res) => {
        const result = await agent.put('/api/account/password').
          send({
            sicherheitsfrageAntwort: newDataCorrect.answer,
            neuesPasswort: 'passwordForgit',
          })

        expect(result.body.success).to.be.true
        expect(result.status).to.equal(200)
      })
  })

  /**
   * Tests if a user cannot change the password, when providing the incorrect
   * answer to the security question
   */
  it('should not allow the password reset', async () => {
    agent.post('/login').
      send({ id: id, password: newDataCorrect.password }).
      then(async (res) => {
        const result = await agent.put('/api/account/password').
          send({
            sicherheitsfrageAntwort: 'katze',
            neuesPasswort: 'passwordForgit',
          })

        expect(result.body.success).to.be.false
        expect(result.status).to.equal(200)
      })
  })

  it(
    'should be a bad request, because the answer to the security question is not given',
    async () => {
      agent.post('/login').
        send({ id: id, password: newDataCorrect.password }).
        then(async (res) => {
          const result = await agent.put('/api/account/password').
            send({
              neuesPasswort: 'passwordForgit',
            })

          expect(result.body.success).to.be.false
          expect(result.status).to.equal(400)
        })
    })

  it(
    'should be a bad request, because the new password is not given',
    async () => {
      agent.post('/login').
        send({ id: id, password: newDataCorrect.password }).
        then(async (res) => {
          const result = await agent.put('/api/account/password').
            send({
              sicherheitsfrageAntwort: 'hund',
            })

          expect(result.body.success).to.be.false
          expect(result.status).to.equal(400)
        })
    })
})
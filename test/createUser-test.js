/*****************************************
 * Module imports for all required modules
 ****************************************/
let chai = require(`chai`)
let chaiHTTP = require(`chai-http`)
let server = require(`../backend/server`)
let prisma = require(`../backend/prismaClient`)
let should = chai.should
let expect = chai.expect


/** Usefull for testing the Routing inside the app*/
chai.use(chaiHTTP)

/**
 * Function which gets called after running the tests
 * Makes sure all inserted data is getting delete after tests
 * @param id ID of the User to be deleted
 **/
async function endTest(id){
    try{
        await prisma.user.delete({
            where: {
                id: id,
            },
        })
    }catch (error){
        console.log(error)
    }
}

/**
 *  Testsuite for the POST api/account route
 *
 *  Test:
 *      - if a User with correct Data is saved
 *      - if a User with false Data is rejected
 *      - if a User is not saved twice
 **/
describe(`/POST user`,async () => {

    //Testdata to create User
    let newDataCorrect = {
        email: "mustermail@muster.com",
        username: "musterName",
        password: "muster",
        answer: "Hund",
    }

    //Testdata with missing Parts
    let newDataIncorrect = {
        email: "mustermail@muster.com",
        password: "muster",
    }

    //Stores the ID of a created User
    let id = 0;

    /**
     * First test
     * Tests if a User is being created and if the response is setup correctly
     **/
    it("should create a new User with given data", async () =>{
        let res = await chai.request(server).post("/api/account").send(newDataCorrect)

        expect(res.status).to.equal(201)
        expect(res.body).be.a(`object`)
        expect(res.body.msg).be.a(`object`)
        expect(res.body.msg.email).to.equal(newDataCorrect.email)
        expect(res.body.success).to.be.true

        id = res.body.msg.id

    })

    /**
     * Second Test
     * Tests if a User is not being created if the data is wrong.
     * Also tests if the response is setup correctly
     * */
    it("should NOT create a new User with given data", async () =>{
        let res = await  chai.request(server).post("/api/account").send(newDataIncorrect)

        expect(res.status).to.equal(400)
        expect(res.body).to.be.a(`object`)
        expect(res.body.success).to.be.false
        expect(res.body.err).to.equal(`Please provide all required Information!`)

    })

    /**
     *  Third Test
     *  Tests if a User is not being created if he is already existing
     *  Tests if the response is setup correctly
     * */
    it("should NOT create a new User with same Data", async () =>{
        let res = await chai.request(server).post("/api/account").send(newDataCorrect)

        expect(res.status).to.equal(400)
        expect(res.body).be.a(`object`)
        expect(res.body.success).to.be.false
        expect(res.body.err).to.equal(`A user is already using this email adress`)

        //Deletes the created User
        await endTest(id)
    })

});

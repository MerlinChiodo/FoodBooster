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
 *  Testsuite for the get api/rezept/search route
 *
 *  Test:
 *      - if no query is given, recipes are found
 *      - if special argument is given, special recipes are found
 *      - if not defined argument is given, recipes are still found
 *      - if multiple arguments are given, recipes are found
 *      - if value for argument doesnt exist, no recipes are found
 **/
describe("/GET rezept/search", async () => {

    it("should return all recipes when given no query", async () =>{
        let res = await chai.request(server).get("/api/rezept/search")

        expect(res.status).to.equal(200)
        expect(res.body).to.be.a(`object`)
        expect(res.body.msg).to.be.a(`array`)
        expect(res.body.success).to.be.true
    })

    it("should return at least one Recipe when using query /?name=TEST Spaghetti mit Soße", async () => {
        let res = await chai.request(server).get("/api/rezept/search/?name=TEST Spaghetti mit Soße")

        expect(res.status).to.equal(200)
        expect(res.body).to.be.a(`object`)
        expect(res.body.msg).to.be.a(`array`)
        expect(res.body.success).to.be.true
    })

    it("should return at least one recipe even if an argument is not specified", async () => {

        let res = await chai.request(server).get("/api/rezept/search/?anything=3132")

        expect(res.status).to.equal(200)
        expect(res.body).to.be.a(`object`)
        expect(res.body.msg).to.be.a(`array`)
        expect(res.body.success).to.be.true
    })

    it("should return at least one recipe even if multiple arguments are specified", async () => {

        let res = await chai.request(server).get("/api/rezept/search/?author=1033&bewertung=5")

        expect(res.status).to.equal(200)
        expect(res.body).to.be.a(`object`)
        expect(res.body.msg).to.be.a(`array`)
        expect(res.body.success).to.be.true
    })

    it("should return no recipes with given arguments", async () => {
        let res = await chai.request(server).get("/api/rezept/search/?author=0&bewertung=26")

        expect(res.status).to.equal(200)
        expect(res.body).to.be.a(`object`)
        expect(res.body.msg).to.be.a(`array`)
        expect(res.body.success).to.be.true
        expect(res.body.msg).to.be.empty
    })
})

/**
 *  Testsuite for the GET api/rezept/single/:recipeID route
 *
 *  Test:
 *      - if correct Param is given, fitting recipe is found
 *      - if false Param is given, error is returned
 *      - if non existing ID is given, error is returned
 **/
describe("/GET rezept/single/:recipeID", async () => {

    it("should return a recipe when given an existing ID", async () =>{

        //Get an existing recipe and its ID
        let recipes = await chai.request(server).get("/api/rezept/search")

        let testRecipeID = recipes.body.msg[0].id

        //Create URL with found recipeID
        let url = `/api/rezept/single/`+ testRecipeID
        let res = await chai.request(server).get(url)

        expect(res.status).to.equal(200)
        expect(res.body).to.be.a(`object`)
        expect(res.body.msg).to.be.a(`object`)
        expect(res.body.success).to.be.true
        expect(res.body.msg.id).to.equal(testRecipeID)
    })

    it("should not return a recipe when given a Character instead of Number", async () =>{

        //Query with Character instead of Number
        let res = await chai.request(server).get(`/api/rezept/single/a`)

        expect(res.status).to.equal(400)
        expect(res.body).to.be.a(`object`)
        expect(res.body.err).to.be.a(`string`)
        expect(res.body.success).to.be.false
    })

    it("should not return a recipe when given a non existing ID", async () =>{

        //Query with non existing ID
        let res = await chai.request(server).get(`/api/rezept/single/0`)

        expect(res.status).to.equal(404)
        expect(res.body).to.be.a(`object`)
        expect(res.body.err).to.be.a(`string`)
        expect(res.body.success).to.be.false
    })

})
let chai = require(`chai`)
let chaiHTTP = require(`chai-http`)
let server = require(`../backend/server`)
let prisma = require(`../backend/prismaClient`)
let should = chai.should
let expect = chai.expect



chai.use(chaiHTTP)

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

describe(`/POST user`,() => {
    let newDataCorrect = {
        email: "mustermail@muster.com",
        username: "musterName",
        password: "muster",
    }

    let newDataIncorrect = {
        email: "mustermail@muster.com",
        password: "muster",
    }

    it("should create a new User with given data", async () =>{
        let res = await chai.request(server).post("/api/account").send(newDataCorrect)

        expect(res.status).to.equal(201)
        expect(res.body).be.a(`object`)
        expect(res.body.msg).be.a(`object`)

        await endTest(res.body.msg.id)

    })

    it("should NOT create a new User with given data", async () =>{
        let res = await  chai.request(server).post("/api/account").send(newDataIncorrect)

        expect(res.status).to.equal(400)
        expect(res.body).to.be.a(`object`)
        expect(res.body.msg).to.equal(`Please provide all required Information!`)

    })



});

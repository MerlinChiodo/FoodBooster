/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)
const bcrypt= require(`bcrypt`)

/**
 * Function to create new User with checks and everything
 * Used in ../API/account for the POST Method of the /API/account/ route
 **/
const createUser = async (req, res) => {

    //Get parameters of body
    const {email} = req.body;
    const {username} = req.body;
    const {password} = req.body;

    //Check if all Values are given
    if(!email || !username || !password){
        return res.status(400).json({success: false, msg: `Please provide all required Information!`})
    }

    //Check if User with email already exists
    const userExists = await prisma.user.count({
        where: {
            email: email,
        },
    })

    if(userExists === 0){

        //Set time of Creation
        let created = new Date()

        //Hash given password
        let passwordHash = await bcrypt.hash(password,10)

        //create User with given parameters
        try {
                const newUser = await prisma.user.create(
                {
                    data: {
                        email: email,
                        name: username,
                        passwordHash: passwordHash,
                        created: created,
                        isAdmin: false,
                    },
                }
            )
            return res.status(201).json({success: true, msg: newUser})
        }catch (error){
            res.status(500).json({success: false, err: "Ups, something went wrong!"})
        }

    }else{

        return res.status(400).json({success: false, err: 'A user is already using this email adress'})
    }
}

/*****************************************
 * Export for use in other files
 ****************************************/
module.exports = { createUser }
/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)

/**
 * Function to create new User with checks and everything
 * Used in ../API/account for the POST Method of the /API/accout/ route
 **/
const account = async (req, res) => {

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

        //create User with given parameters
        const newUser = await prisma.user.create(
            {
                data:{
                    email: email,
                    name: username,
                    passwordHash: Number(password),
                    created: created,
                    isAdmin: false,
                },
            }
        )

        if(!newUser){
            res.status(400).json({success: false, err: "Ups, something went wrong!"})
        }

        return res.status(200).json({success: true, msg: `User ${email} ${username} ${password} created`})

    }else{

        return res.status(400).json({success: false, err: 'A user is already using this email adress'})
    }
}

/*****************************************
 * Export for use in other files
 ****************************************/
module.exports = { account }
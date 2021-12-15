/*****************************************
 * Module imports for all required modules
 ****************************************/
const prisma = require(`../prismaClient.js`)

/**
 * Function to create a nutrition plan
 * Function gets the ID of the creator from the session
 * A nutrition plan can only be created if the user doesnt have a plan with the same name created
 *
 * Parameters:
 *      - name --> the name chosen for the nutrition plan
 *
 * Responses:
 *      201 - {success: true, msg: {createdPlan}}
 *      400 - {success: false, err: Please chosse an unused name!}
 *      500 - {success: false, err: Ups, something went wrong!} //Prisma error
 * */
const createNutritionPlan = async (req,res) => {

    const {name} = req.body
    const user = req.user.id

    let possiblePlan

    try {
        //check if user already has a plan with this name
        possiblePlan = await prisma.nutritionplan.findMany({
            where: {
                AND: [
                    {
                        name: name,
                    },
                    {
                        userID: user,
                    },
                ],
            },
        })
    }catch (err){
        res.status(500).send({success: false, err:"Ups, something went wrong!"})
    }

    //check if plan with same name was found
    if(possiblePlan.length !== 0){
        //Plan already exists
        return res.status(400).send({success: false, err: "Please choose an unused name!"})
    }

    try {
        //create the new plan with user given by req.user
        const plan = await prisma.nutritionplan.create({
            data: {
                name: name,
                userID: user,
            }
        })
        //return created plan
        return res.status(201).send({success: true, msg: plan})
    }catch (err){
        return res.status(500).send({success: false, err:"Ups, something went wrong!"})
    }
}

module.exports = { createNutritionPlan }
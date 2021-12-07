const prisma = require(`../backend/prismaClient.js`)
const bcrypt = require('bcrypt')

const users = [
    {
        name: "Peter",
        email: "peter@mail.com",
        password : "password",
        isAdmin : false,
        answer : "antwort",
    },
    {
        name: "Maria",
        email: "maria@mail.com",
        password: "password",
        isAdmin: false,
        answer: "antwort",
    },
    {
        name: "Robert",
        email: "robobert@mail.com",
        password: "password",
        isAdmin: false,
        answer: "antwort",
    },
    {
        name: "Admin",
        email: "admin@admin.com",
        password: "admin",
        isAdmin: true,
        answer: "antwort",
    }
]

const ingredients =[
    {
        name: "TEST_Filet_Pute",
        calories: "189",
        vegan: false,
        nutritionalValues : {},
        type: "Fleisch",
        nutriScore : 0,
    },
    {
        name: "TEST_Hackfleisch_Rind",
        calories: "241",
        vegan: false,
        nutritionalValues : {},
        type: "Fleisch",
        nutriScore : 0,
    },
    {
        name: "TEST_Hackfleisch_Schwein",
        calories: "256",
        vegan: false,
        nutritionalValues : {},
        type: "Fleisch",
        nutriScore : 0,
    },
    {
        name: "TEST_Kartoffel",
        calories: "70",
        vegan: true,
        nutritionalValues : {},
        type: "Gemuese",
        nutriScore : 0,
    },
    {
        name: "TEST_Pfeffer",
        calories: "0",
        vegan: true,
        nutritionalValues : {},
        type: "Gewuerz",
        nutriScore : 0,
    },
    {
        name: "TEST_Rosmarin",
        calories: "96",
        vegan: true,
        nutritionalValues : {},
        type: "Kraueter",
        nutriScore : 0,
    },
    {
        name: "TEST_Salz",
        calories: "0",
        vegan: true,
        nutritionalValues : {},
        type: "Gewuerz",
        nutriScore : 0,
    },
    {
        name: "TEST_Spaghetti",
        calories: "158",
        vegan: true,
        nutritionalValues : {},
        type: "Getreideprodukt",
        nutriScore : 0,
    },
    {
        name: "TEST_Thymian",
        calories: "52",
        vegan: true,
        nutritionalValues : {},
        type: "Kraueter",
        nutriScore : 0,
    },
    {
        name: "TEST_Tomate",
        calories: "21",
        vegan: true,
        nutritionalValues : {},
        type: "Gemuese",
        nutriScore : 0,
    },
    {
        name: "TEST_Tomatenmark",
        calories: "21",
        vegan: true,
        nutritionalValues : {},
        type: "Zusatz",
        nutriScore : 0,
    },
    {
        name: "TEST_Weissbrot",
        calories: "265",
        vegan: false,
        nutritionalValues : {},
        type: "Getreideprodukt",
        nutriScore : 0,
    },
    {
        name: "TEST_Zucker",
        calories: "387",
        vegan: true,
        nutritionalValues : {},
        type: "Gewuerz",
        nutriScore : 0,
    },
    {
        name: "TEST_Zwiebel",
        calories: "40",
        vegan: true,
        nutritionalValues : {},
        type: "Gemuese",
        nutriScore : 0,
    }
]

const recipes = [
    {
        name: "TEST Spaghetti mit Soße",
        description: "Nudeln kochen und Soße drauf",
        servings: 4,
        featured: false,
        rating : 1,
        categories: ["TEST_Food"],
        Ingredients: ["TEST_Tomate","TEST_Spaghetti","TEST_Tomatenmark","TEST_Hackfleisch_Rind"],
    },
    {
        name: "TEST Hackbraten",
        description: "Hackbraten in den Ofen und nicht verbrennen lassen",
        servings: 4,
        featured: false,
        rating : 5,
        categories: ["TEST_Food"],
        Ingredients: ["TEST_Weissbrot","TEST_Hackfleisch_Rind"],
    },
    {
        name: "TEST Kartoffelauflauf",
        description: "Ein super geiler Kartoffelauflauf",
        servings: 600,
        featured: true,
        rating : 3,
        categories: ["TEST_Food"],
        Ingredients: ["TEST_Kartoffel", "TEST_Salz"],
    }
]


const categories = [
    {
        name: "TEST_Food"
    },
    {
        name: "TEST_Cocktail"
    },
    {
        name: "TEST_Breakfast"
    }
]


async function main(){

    //create sample data of Users
    for(let user of users){
        let passwordHash = await bcrypt.hash(user.password,10)
        await prisma.user.create(
            {
                data:{
                    email: user.email,
                    name: user.name,
                    passwordHash : passwordHash,
                    created : new Date(),
                    isAdmin: user.isAdmin,
                    answer: user.answer,
                }
            })
    }

    //create sample data for ingredients
    for(let ingredient of ingredients){
        await prisma.ingredient.create({
            data : {
                name: ingredient.name,
                calories: Number(ingredient.calories),
                vegan: ingredient.vegan,
                nutritionalValues: ingredient.nutritionalValues,
                type: ingredient.type,
                nutriScore: ingredient.nutriScore,
            }
        })
    }

    //create sample data for categories
    for (let category of categories){
        await prisma.category.create({
            data: category
        })
    }

    const creator = await prisma.user.findFirst({
        where: {
            isAdmin: false,
        }
    })

    //create sample data for recipes
    for(let recipe of recipes){
        let recipeDB = await prisma.recipe.create({
            data: {
                name: recipe.name,
                description: recipe.description,
                servings: recipe.servings,
                created: new Date(),
                featured: recipe.featured,
                creatorID: creator.id,
                rating: recipe.rating,
            }
        })
        //link ingredients to recipe
        for (let ingredient of recipe.Ingredients){
            await prisma.recipeIncludesIngredient.create(
                {
                    data: {
                        ingredientName: ingredient,
                        recipeID: recipeDB.id,
                    }
                }
            )}
        //link categories to recipe
        for (let category of recipe.categories){
            await prisma.recipeInCategory.create(
                {
                    data: {
                        categoryName: category,
                        recipeID: recipeDB.id,
                    },
                })
        }
    }
}

//call and end seeding
main().catch(e => {
    console.log(e);
    process.exit(1);
}).finally( () => {
    prisma.$disconnect();
})
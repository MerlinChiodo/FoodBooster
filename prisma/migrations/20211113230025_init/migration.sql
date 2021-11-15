-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `passwordHash` BIGINT NOT NULL,
    `created` DATETIME NOT NULL,
    `isAdmin` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroceryList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,

    UNIQUE INDEX `GroceryList_userID_key`(`userID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recipe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `servings` INTEGER NOT NULL,
    `created` DATETIME NOT NULL,
    `bewertung` INTEGER NULL,
    `featured` BOOLEAN NOT NULL DEFAULT false,
    `creatorID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserFavorsRecipe` (
    `userID` INTEGER NOT NULL,
    `recipeID` INTEGER NOT NULL,

    PRIMARY KEY (`userID`, `recipeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Nutritionplan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `userID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NutritionplanIncludesRecipe` (
    `nutritionplanID` INTEGER NOT NULL,
    `recipeID` INTEGER NOT NULL,

    PRIMARY KEY (`nutritionplanID`, `recipeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ingredient` (
    `name` VARCHAR(50) NOT NULL,
    `calories` INTEGER NOT NULL,
    `vegan` BOOLEAN NOT NULL,
    `nutritionalValues` VARCHAR(100) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `nutriScore` INTEGER NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroceryListIncludesIngredient` (
    `ingredientName` VARCHAR(50) NOT NULL,
    `groceryListID` INTEGER NOT NULL,

    PRIMARY KEY (`ingredientName`, `groceryListID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeIncludesIngredient` (
    `ingredientName` VARCHAR(50) NOT NULL,
    `recipeID` INTEGER NOT NULL,

    PRIMARY KEY (`ingredientName`, `recipeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(50) NOT NULL,
    `handled` BOOLEAN NOT NULL DEFAULT false,
    `created` DATETIME NOT NULL,
    `offender` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Picture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(50) NOT NULL,
    `recipeID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Thread` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `threadText` VARCHAR(500) NULL,
    `created` DATETIME NOT NULL,
    `author` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `name` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RecipeInCategory` (
    `recipeID` INTEGER NOT NULL,
    `categoryName` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`recipeID`, `categoryName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` VARCHAR(200) NOT NULL,
    `created` DATETIME NOT NULL,
    `userID` INTEGER NOT NULL,
    `recipeID` INTEGER NULL,
    `threadID` INTEGER NULL,
    `topCommentID` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_creatorID_fkey` FOREIGN KEY (`creatorID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavorsRecipe` ADD CONSTRAINT `UserFavorsRecipe_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavorsRecipe` ADD CONSTRAINT `UserFavorsRecipe_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nutritionplan` ADD CONSTRAINT `Nutritionplan_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionplanIncludesRecipe` ADD CONSTRAINT `NutritionplanIncludesRecipe_nutritionplanID_fkey` FOREIGN KEY (`nutritionplanID`) REFERENCES `Nutritionplan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionplanIncludesRecipe` ADD CONSTRAINT `NutritionplanIncludesRecipe_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroceryListIncludesIngredient` ADD CONSTRAINT `GroceryListIncludesIngredient_ingredientName_fkey` FOREIGN KEY (`ingredientName`) REFERENCES `Ingredient`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroceryListIncludesIngredient` ADD CONSTRAINT `GroceryListIncludesIngredient_groceryListID_fkey` FOREIGN KEY (`groceryListID`) REFERENCES `GroceryList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIncludesIngredient` ADD CONSTRAINT `RecipeIncludesIngredient_ingredientName_fkey` FOREIGN KEY (`ingredientName`) REFERENCES `Ingredient`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIncludesIngredient` ADD CONSTRAINT `RecipeIncludesIngredient_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_offender_fkey` FOREIGN KEY (`offender`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeInCategory` ADD CONSTRAINT `RecipeInCategory_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeInCategory` ADD CONSTRAINT `RecipeInCategory_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_threadID_fkey` FOREIGN KEY (`threadID`) REFERENCES `Thread`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_topCommentID_fkey` FOREIGN KEY (`topCommentID`) REFERENCES `Comment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

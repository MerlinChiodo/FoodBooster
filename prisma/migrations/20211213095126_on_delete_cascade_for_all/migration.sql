-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_recipeID_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_threadID_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_topCommentID_fkey`;

-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_userID_fkey`;

-- DropForeignKey
ALTER TABLE `GroceryList` DROP FOREIGN KEY `GroceryList_userID_fkey`;

-- DropForeignKey
ALTER TABLE `GroceryListIncludesIngredient` DROP FOREIGN KEY `GroceryListIncludesIngredient_groceryListID_fkey`;

-- DropForeignKey
ALTER TABLE `GroceryListIncludesIngredient` DROP FOREIGN KEY `GroceryListIncludesIngredient_ingredientName_fkey`;

-- DropForeignKey
ALTER TABLE `Nutritionplan` DROP FOREIGN KEY `Nutritionplan_userID_fkey`;

-- DropForeignKey
ALTER TABLE `NutritionplanIncludesRecipe` DROP FOREIGN KEY `NutritionplanIncludesRecipe_nutritionplanID_fkey`;

-- DropForeignKey
ALTER TABLE `NutritionplanIncludesRecipe` DROP FOREIGN KEY `NutritionplanIncludesRecipe_recipeID_fkey`;

-- DropForeignKey
ALTER TABLE `Recipe` DROP FOREIGN KEY `Recipe_creatorID_fkey`;

-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_offender_fkey`;

-- DropForeignKey
ALTER TABLE `Thread` DROP FOREIGN KEY `Thread_author_fkey`;

-- DropForeignKey
ALTER TABLE `UserFavorsRecipe` DROP FOREIGN KEY `UserFavorsRecipe_recipeID_fkey`;

-- DropForeignKey
ALTER TABLE `UserFavorsRecipe` DROP FOREIGN KEY `UserFavorsRecipe_userID_fkey`;

-- AddForeignKey
ALTER TABLE `GroceryList` ADD CONSTRAINT `GroceryList_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recipe` ADD CONSTRAINT `Recipe_creatorID_fkey` FOREIGN KEY (`creatorID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavorsRecipe` ADD CONSTRAINT `UserFavorsRecipe_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserFavorsRecipe` ADD CONSTRAINT `UserFavorsRecipe_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Nutritionplan` ADD CONSTRAINT `Nutritionplan_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionplanIncludesRecipe` ADD CONSTRAINT `NutritionplanIncludesRecipe_nutritionplanID_fkey` FOREIGN KEY (`nutritionplanID`) REFERENCES `Nutritionplan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NutritionplanIncludesRecipe` ADD CONSTRAINT `NutritionplanIncludesRecipe_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroceryListIncludesIngredient` ADD CONSTRAINT `GroceryListIncludesIngredient_groceryListID_fkey` FOREIGN KEY (`groceryListID`) REFERENCES `GroceryList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroceryListIncludesIngredient` ADD CONSTRAINT `GroceryListIncludesIngredient_ingredientName_fkey` FOREIGN KEY (`ingredientName`) REFERENCES `Ingredient`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_offender_fkey` FOREIGN KEY (`offender`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thread` ADD CONSTRAINT `Thread_author_fkey` FOREIGN KEY (`author`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_threadID_fkey` FOREIGN KEY (`threadID`) REFERENCES `Thread`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_topCommentID_fkey` FOREIGN KEY (`topCommentID`) REFERENCES `Comment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

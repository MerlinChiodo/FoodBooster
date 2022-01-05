/*
  Warnings:

  - You are about to drop the column `bewertung` on the `Recipe` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `RecipeInCategory`
    DROP FOREIGN KEY `RecipeInCategory_categoryName_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeInCategory`
    DROP FOREIGN KEY `RecipeInCategory_recipeID_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeIncludesIngredient`
    DROP FOREIGN KEY `RecipeIncludesIngredient_ingredientName_fkey`;

-- DropForeignKey
ALTER TABLE `RecipeIncludesIngredient` DROP FOREIGN KEY `RecipeIncludesIngredient_recipeID_fkey`;

-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `rating`,
    ADD COLUMN `rating` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `RecipeIncludesIngredient`
    ADD CONSTRAINT `RecipeIncludesIngredient_ingredientName_fkey` FOREIGN KEY (`ingredientName`) REFERENCES `Ingredient` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeIncludesIngredient`
    ADD CONSTRAINT `RecipeIncludesIngredient_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeInCategory`
    ADD CONSTRAINT `RecipeInCategory_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category` (`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RecipeInCategory`
    ADD CONSTRAINT `RecipeInCategory_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

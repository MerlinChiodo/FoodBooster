-- AlterTable
ALTER TABLE `GroceryListIncludesIngredient` ADD COLUMN `amount` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `RecipeIncludesIngredient` ADD COLUMN `amount` INTEGER NOT NULL DEFAULT 0;

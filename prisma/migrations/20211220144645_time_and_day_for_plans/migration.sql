/*
  Warnings:

  - Added the required column `day` to the `NutritionplanIncludesRecipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `NutritionplanIncludesRecipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NutritionplanIncludesRecipe` ADD COLUMN `day` INTEGER NOT NULL,
    ADD COLUMN `time` INTEGER NOT NULL;

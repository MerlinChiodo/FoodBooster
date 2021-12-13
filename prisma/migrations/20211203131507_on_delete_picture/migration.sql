-- DropForeignKey
ALTER TABLE `Picture` DROP FOREIGN KEY `Picture_recipeID_fkey`;

-- AddForeignKey
ALTER TABLE `Picture` ADD CONSTRAINT `Picture_recipeID_fkey` FOREIGN KEY (`recipeID`) REFERENCES `Recipe`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

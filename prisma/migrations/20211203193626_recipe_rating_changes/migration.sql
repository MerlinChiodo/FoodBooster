-- AlterTable
ALTER TABLE `Recipe` MODIFY `rating` INTEGER NULL DEFAULT 0,
    MODIFY `totalRatings` INTEGER NULL DEFAULT 1;
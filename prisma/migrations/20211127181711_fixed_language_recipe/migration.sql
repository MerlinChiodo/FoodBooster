/*
  Warnings:

  - You are about to drop the column `bewertung` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Recipe` DROP COLUMN `rating`,
    ADD COLUMN `rating` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `answer` VARCHAR(191) NOT NULL DEFAULT 'NULL';

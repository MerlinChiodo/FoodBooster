/*
  Warnings:

  - You are about to alter the column `created` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created` on the `Recipe` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created` on the `Thread` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `created` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `Comment` MODIFY `created` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Recipe` MODIFY `created` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Report` MODIFY `created` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `Thread` MODIFY `created` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `created` DATETIME NULL;

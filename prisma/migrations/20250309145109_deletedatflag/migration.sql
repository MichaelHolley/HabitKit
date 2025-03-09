-- AlterTable
ALTER TABLE `Goal` ADD COLUMN `deletedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `Habit` ADD COLUMN `deletedAt` DATETIME(3) NULL;

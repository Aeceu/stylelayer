/*
  Warnings:

  - Added the required column `variants` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `variants` JSON NOT NULL;
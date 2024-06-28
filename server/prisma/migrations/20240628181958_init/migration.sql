/*
  Warnings:

  - Added the required column `variants` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `variants` JSON NOT NULL;

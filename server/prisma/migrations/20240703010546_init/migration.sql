/*
  Warnings:

  - You are about to drop the column `color` on the `cartitem` table. All the data in the column will be lost.
  - You are about to drop the column `size` on the `cartitem` table. All the data in the column will be lost.
  - Added the required column `variants` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `color`,
    DROP COLUMN `size`,
    ADD COLUMN `variants` JSON NOT NULL;

/*
  Warnings:

  - You are about to drop the column `addressId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `baranggay` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_addressId_fkey`;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `addressId`,
    ADD COLUMN `baranggay` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `other` VARCHAR(191) NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `region` VARCHAR(191) NOT NULL,
    ADD COLUMN `street` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `address`;

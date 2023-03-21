/*
  Warnings:

  - You are about to alter the column `short_description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10000000)`.
  - You are about to alter the column `specifications` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10000000)`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" SET DATA TYPE VARCHAR(10000000),
ALTER COLUMN "short_description" SET DATA TYPE VARCHAR(10000000),
ALTER COLUMN "specifications" SET DATA TYPE VARCHAR(10000000);

/*
  Warnings:

  - You are about to drop the column `floor` on the `Pin` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Pin` table. All the data in the column will be lost.
  - Added the required column `latitude` to the `Pin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Pin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Pin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pin" DROP COLUMN "floor",
DROP COLUMN "location",
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

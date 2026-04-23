/*
  Warnings:

  - You are about to drop the column `timeEndPeriod` on the `Announcement` table. All the data in the column will be lost.
  - You are about to drop the column `timeStartPeriod` on the `Announcement` table. All the data in the column will be lost.
  - Changed the type of `timeStart` on the `Announcement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `timeEnd` on the `Announcement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `date` on the `Announcement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Announcement" DROP COLUMN "timeEndPeriod",
DROP COLUMN "timeStartPeriod",
DROP COLUMN "timeStart",
ADD COLUMN     "timeStart" TIMESTAMP(3) NOT NULL,
DROP COLUMN "timeEnd",
ADD COLUMN     "timeEnd" TIMESTAMP(3) NOT NULL,
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "AmPm";

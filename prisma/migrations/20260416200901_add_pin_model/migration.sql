/*
  Warnings:

  - Added the required column `description` to the `Pin` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AmPm" AS ENUM ('AM', 'PM');

-- AlterTable
ALTER TABLE "Pin" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Announcement" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "timeStart" INTEGER NOT NULL,
    "timeStartPeriod" "AmPm" NOT NULL,
    "timeEnd" INTEGER NOT NULL,
    "timeEndPeriod" "AmPm" NOT NULL,
    "date" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

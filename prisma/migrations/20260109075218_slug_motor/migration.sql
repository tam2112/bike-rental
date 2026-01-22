/*
  Warnings:

  - Added the required column `slug` to the `Motorbike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motorbike" ADD COLUMN     "slug" TEXT NOT NULL;

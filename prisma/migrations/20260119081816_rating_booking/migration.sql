/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rating_userId_motorbikeId_key";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "bookingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_bookingId_key" ON "Rating"("bookingId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

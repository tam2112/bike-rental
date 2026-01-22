/*
  Warnings:

  - You are about to drop the column `brake` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `cylinderCapacity` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `engineType` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `keySystem` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `machineNum` on the `Motorbike` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Motorbike` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licensePlateNum]` on the table `Motorbike` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `engineCapacity` to the `Motorbike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelType` to the `Motorbike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Motorbike` table without a default value. This is not possible if the table is not empty.
  - Made the column `odoNum` on table `Motorbike` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Motorbike" DROP COLUMN "brake",
DROP COLUMN "cylinderCapacity",
DROP COLUMN "engineType",
DROP COLUMN "keySystem",
DROP COLUMN "location",
DROP COLUMN "machineNum",
DROP COLUMN "type",
ADD COLUMN     "engineCapacity" INTEGER NOT NULL,
ADD COLUMN     "fuelType" TEXT NOT NULL,
ADD COLUMN     "model" TEXT NOT NULL,
ADD COLUMN     "situation" TEXT,
ALTER COLUMN "fuelCapacity" DROP NOT NULL,
ALTER COLUMN "fuelCapacity" SET DATA TYPE TEXT,
ALTER COLUMN "consume" DROP NOT NULL,
ALTER COLUMN "odoNum" SET NOT NULL,
ALTER COLUMN "seat" SET DEFAULT 2;

-- CreateIndex
CREATE UNIQUE INDEX "Motorbike_licensePlateNum_key" ON "Motorbike"("licensePlateNum");

/*
  Warnings:

  - A unique constraint covering the columns `[qrCode]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qrCode` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Worker" ADD COLUMN     "qrCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Worker_qrCode_key" ON "Worker"("qrCode");

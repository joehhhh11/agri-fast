/*
  Warnings:

  - A unique constraint covering the columns `[qrCode]` on the table `Plot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plot_qrCode_key" ON "Plot"("qrCode");

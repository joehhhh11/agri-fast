/*
  Warnings:

  - A unique constraint covering the columns `[groupId,workerId]` on the table `GroupWorker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GroupWorker_groupId_workerId_key" ON "GroupWorker"("groupId", "workerId");

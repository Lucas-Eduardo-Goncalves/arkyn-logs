/*
  Warnings:

  - You are about to drop the column `trafficSourceUserId` on the `HttpTraffic` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HttpTraffic" DROP COLUMN "trafficSourceUserId",
ADD COLUMN     "trafficUserId" TEXT;

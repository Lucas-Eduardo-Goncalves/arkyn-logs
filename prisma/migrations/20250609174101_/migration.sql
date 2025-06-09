/*
  Warnings:

  - You are about to drop the column `exceptionPathnameId` on the `Exception` table. All the data in the column will be lost.
  - You are about to drop the column `httpTrafficId` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `httpTrafficId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the `ExceptionPathname` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[requestId]` on the table `HttpTraffic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[responseId]` on the table `HttpTraffic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `corePathnameId` to the `Exception` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestId` to the `HttpTraffic` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseId` to the `HttpTraffic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exception" DROP CONSTRAINT "Exception_exceptionPathnameId_fkey";

-- DropForeignKey
ALTER TABLE "ExceptionPathname" DROP CONSTRAINT "ExceptionPathname_trafficSourceId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_httpTrafficId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_httpTrafficId_fkey";

-- DropIndex
DROP INDEX "Request_httpTrafficId_key";

-- DropIndex
DROP INDEX "Response_httpTrafficId_key";

-- AlterTable
ALTER TABLE "Exception" DROP COLUMN "exceptionPathnameId",
ADD COLUMN     "corePathnameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "HttpTraffic" ADD COLUMN     "requestId" TEXT NOT NULL,
ADD COLUMN     "responseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "httpTrafficId";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "httpTrafficId";

-- DropTable
DROP TABLE "ExceptionPathname";

-- CreateTable
CREATE TABLE "CoreLog" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "method" "Method" NOT NULL,
    "trafficUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "corePathnameId" TEXT NOT NULL,
    "trafficSourceId" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "responseId" TEXT NOT NULL,

    CONSTRAINT "CoreLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorePathname" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "trafficSourceId" TEXT NOT NULL,

    CONSTRAINT "CorePathname_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CoreLog_requestId_key" ON "CoreLog"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "CoreLog_responseId_key" ON "CoreLog"("responseId");

-- CreateIndex
CREATE UNIQUE INDEX "HttpTraffic_requestId_key" ON "HttpTraffic"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "HttpTraffic_responseId_key" ON "HttpTraffic"("responseId");

-- AddForeignKey
ALTER TABLE "HttpTraffic" ADD CONSTRAINT "HttpTraffic_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HttpTraffic" ADD CONSTRAINT "HttpTraffic_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreLog" ADD CONSTRAINT "CoreLog_corePathnameId_fkey" FOREIGN KEY ("corePathnameId") REFERENCES "CorePathname"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreLog" ADD CONSTRAINT "CoreLog_trafficSourceId_fkey" FOREIGN KEY ("trafficSourceId") REFERENCES "TrafficSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreLog" ADD CONSTRAINT "CoreLog_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoreLog" ADD CONSTRAINT "CoreLog_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorePathname" ADD CONSTRAINT "CorePathname_trafficSourceId_fkey" FOREIGN KEY ("trafficSourceId") REFERENCES "TrafficSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exception" ADD CONSTRAINT "Exception_corePathnameId_fkey" FOREIGN KEY ("corePathnameId") REFERENCES "CorePathname"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

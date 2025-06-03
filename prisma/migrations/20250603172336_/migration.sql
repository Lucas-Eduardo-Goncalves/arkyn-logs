/*
  Warnings:

  - A unique constraint covering the columns `[httpTrafficId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[httpTrafficId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Request_httpTrafficId_key" ON "Request"("httpTrafficId");

-- CreateIndex
CREATE UNIQUE INDEX "Response_httpTrafficId_key" ON "Response"("httpTrafficId");

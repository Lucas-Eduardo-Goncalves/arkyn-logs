-- CreateEnum
CREATE TYPE "Method" AS ENUM ('POST', 'PUT', 'PATCH', 'DELETE', 'GET');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('INFO', 'FATAL', 'WARNING');

-- CreateTable
CREATE TABLE "HttpTraffic" (
    "id" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "method" "Method" NOT NULL,
    "level" "Level" NOT NULL,
    "trafficSourceUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "trafficSourceId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "pathnameId" TEXT NOT NULL,

    CONSTRAINT "HttpTraffic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "headers" JSONB NOT NULL,
    "body" JSONB NOT NULL,
    "queryParams" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "httpTrafficId" TEXT NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "headers" JSONB NOT NULL,
    "body" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "httpTrafficId" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HttpTraffic" ADD CONSTRAINT "HttpTraffic_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HttpTraffic" ADD CONSTRAINT "HttpTraffic_trafficSourceId_fkey" FOREIGN KEY ("trafficSourceId") REFERENCES "TrafficSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HttpTraffic" ADD CONSTRAINT "HttpTraffic_pathnameId_fkey" FOREIGN KEY ("pathnameId") REFERENCES "Pathname"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_httpTrafficId_fkey" FOREIGN KEY ("httpTrafficId") REFERENCES "HttpTraffic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_httpTrafficId_fkey" FOREIGN KEY ("httpTrafficId") REFERENCES "HttpTraffic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

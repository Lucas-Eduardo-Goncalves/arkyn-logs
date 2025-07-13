-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL,
    "discordChannelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "trafficSourceId" TEXT NOT NULL,

    CONSTRAINT "Webhook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Webhook_trafficSourceId_key" ON "Webhook"("trafficSourceId");

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_trafficSourceId_fkey" FOREIGN KEY ("trafficSourceId") REFERENCES "TrafficSource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

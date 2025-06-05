/*
  Warnings:

  - Added the required column `protocol` to the `Domain` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Protocol" AS ENUM ('HTTP', 'HTTPS');

-- AlterTable
ALTER TABLE "Domain" ADD COLUMN     "protocol" "Protocol" NOT NULL;

/*
  Warnings:

  - Added the required column `elapsedTime` to the `CoreLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level` to the `CoreLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoreLog" ADD COLUMN     "elapsedTime" INTEGER NOT NULL,
ADD COLUMN     "level" "Level" NOT NULL;

-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "body" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Response" ALTER COLUMN "body" DROP NOT NULL;

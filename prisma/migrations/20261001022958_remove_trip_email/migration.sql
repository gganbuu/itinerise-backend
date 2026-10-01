/*
  Warnings:

  - You are about to drop the column `email` on the `Trip` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Trip_email_key";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "email";

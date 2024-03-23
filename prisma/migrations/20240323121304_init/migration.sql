/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `captcha` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureDay` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `execDay` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jsessionId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "captcha" TEXT NOT NULL,
ADD COLUMN     "departureDay" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "execDay" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "jsessionId" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "idNumber" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

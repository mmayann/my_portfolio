/*
  Warnings:

  - Added the required column `userId` to the `Portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SkillDetail" DROP CONSTRAINT "SkillDetail_skill_id_fkey";

-- AlterTable
ALTER TABLE "Portfolio" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firebaseUid" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillDetail" ADD CONSTRAINT "SkillDetail_skill_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

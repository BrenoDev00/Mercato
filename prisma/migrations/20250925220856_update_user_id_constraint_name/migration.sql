/*
  Warnings:

  - You are about to drop the column `userId` on the `role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."role" DROP CONSTRAINT "role_userId_fkey";

-- DropIndex
DROP INDEX "public"."role_userId_key";

-- AlterTable
ALTER TABLE "public"."role" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "role_user_id_key" ON "public"."role"("user_id");

-- AddForeignKey
ALTER TABLE "public"."role" ADD CONSTRAINT "role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

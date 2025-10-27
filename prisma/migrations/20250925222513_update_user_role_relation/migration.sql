/*
  Warnings:

  - You are about to drop the column `user_id` on the `role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."role" DROP CONSTRAINT "role_user_id_fkey";

-- DropIndex
DROP INDEX "public"."role_user_id_key";

-- AlterTable
ALTER TABLE "public"."role" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "role_id" TEXT NOT NULL DEFAULT 'temporary value';

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "public"."role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

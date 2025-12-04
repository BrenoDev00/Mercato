/*
  Warnings:

  - You are about to drop the column `user_address_id` on the `user` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_user_address_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "user_address_id",
ADD COLUMN     "address_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "user_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

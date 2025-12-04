/*
  Warnings:

  - Added the required column `user_address_id` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "user_address_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "user_address" (
    "id" TEXT NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "street" VARCHAR(64) NOT NULL,
    "number" INTEGER NOT NULL,
    "additional_information" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_user_address_id_fkey" FOREIGN KEY ("user_address_id") REFERENCES "user_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

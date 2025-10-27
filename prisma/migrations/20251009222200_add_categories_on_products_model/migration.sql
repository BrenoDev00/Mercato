/*
  Warnings:

  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_category_id_fkey";

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "category_id";

-- CreateTable
CREATE TABLE "public"."categories_on_products" (
    "id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "categories_on_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."categories_on_products" ADD CONSTRAINT "categories_on_products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories_on_products" ADD CONSTRAINT "categories_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

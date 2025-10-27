/*
  Warnings:

  - A unique constraint covering the columns `[product_id,category_id]` on the table `categories_on_products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."categories_on_products" DROP CONSTRAINT "categories_on_products_category_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."categories_on_products" DROP CONSTRAINT "categories_on_products_product_id_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "categories_on_products_product_id_category_id_key" ON "public"."categories_on_products"("product_id", "category_id");

-- AddForeignKey
ALTER TABLE "public"."categories_on_products" ADD CONSTRAINT "categories_on_products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."product_category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories_on_products" ADD CONSTRAINT "categories_on_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "public"."CartItem_cartId_productId_variantId_key";

-- AlterTable
ALTER TABLE "public"."CartItem" ADD COLUMN     "colorId" TEXT,
ADD COLUMN     "sizeId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

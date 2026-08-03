-- AlterTable
ALTER TABLE "public"."OrderItem" ADD COLUMN     "colorId" TEXT,
ADD COLUMN     "sizeId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE SET NULL ON UPDATE CASCADE;

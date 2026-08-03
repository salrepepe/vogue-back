-- CreateTable
CREATE TABLE "public"."Size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Color" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hex" TEXT NOT NULL,

    CONSTRAINT "Color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductSize" (
    "productId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,

    CONSTRAINT "ProductSize_pkey" PRIMARY KEY ("productId","sizeId")
);

-- CreateTable
CREATE TABLE "public"."ProductColor" (
    "productId" TEXT NOT NULL,
    "colorId" TEXT NOT NULL,

    CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("productId","colorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "public"."Size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Color_name_key" ON "public"."Color"("name");

-- AddForeignKey
ALTER TABLE "public"."ProductSize" ADD CONSTRAINT "ProductSize_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductSize" ADD CONSTRAINT "ProductSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "public"."Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductColor" ADD CONSTRAINT "ProductColor_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ProductColor" ADD CONSTRAINT "ProductColor_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "public"."Color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

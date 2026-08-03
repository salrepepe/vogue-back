-- AlterTable
ALTER TABLE "public"."ProductColor" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

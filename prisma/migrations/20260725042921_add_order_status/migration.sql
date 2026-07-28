-- CreateEnum
CREATE TYPE "public"."OrderStatus" AS ENUM ('NEW', 'PROCESSING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "status" "public"."OrderStatus" NOT NULL DEFAULT 'NEW';

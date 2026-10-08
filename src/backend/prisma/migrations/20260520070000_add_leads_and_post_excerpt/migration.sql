-- CreateEnum
CREATE TYPE "LeadSegment" AS ENUM ('driver', 'partner');

-- AlterTable
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "excerpt" TEXT;

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "segment" "LeadSegment" NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "province" TEXT,
    "companyName" TEXT,
    "licensePlate" TEXT,
    "projectScale" TEXT,
    "fleetSize" INTEGER,
    "source" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

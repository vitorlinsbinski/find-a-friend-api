/*
  Warnings:

  - You are about to drop the column `org_id` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `org_id` on the `pets` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[organization_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organization_id` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_org_id_fkey";

-- DropForeignKey
ALTER TABLE "pets" DROP CONSTRAINT "pets_org_id_fkey";

-- DropIndex
DROP INDEX "addresses_org_id_key";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "org_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "org_id",
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "addresses_organization_id_key" ON "addresses"("organization_id");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

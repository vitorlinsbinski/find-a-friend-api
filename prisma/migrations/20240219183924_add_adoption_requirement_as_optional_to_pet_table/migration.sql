/*
  Warnings:

  - A unique constraint covering the columns `[pet_id]` on the table `adoption_requirements` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "adoption_requirements_pet_id_key" ON "adoption_requirements"("pet_id");

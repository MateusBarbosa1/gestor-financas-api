/*
  Warnings:

  - Added the required column `id_user` to the `Despesas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `Objetivos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Despesas" ADD COLUMN     "id_user" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Objetivos" ADD COLUMN     "id_user" TEXT NOT NULL;

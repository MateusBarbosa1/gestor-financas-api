/*
  Warnings:

  - Added the required column `maturity` to the `Despesas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Despesas" ADD COLUMN     "maturity" TIMESTAMP(3) NOT NULL;

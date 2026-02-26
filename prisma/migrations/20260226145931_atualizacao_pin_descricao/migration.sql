/*
  Warnings:

  - Added the required column `pin_seguranca` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "pin_seguranca" TEXT NOT NULL,
ALTER COLUMN "descricao" DROP NOT NULL;

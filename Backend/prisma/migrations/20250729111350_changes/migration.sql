-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "isBookmarked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false;

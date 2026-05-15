-- Add coverImage column to posts table (applied via db push, not tracked in migrations)
ALTER TABLE "posts" ADD COLUMN IF NOT EXISTS "coverImage" TEXT;

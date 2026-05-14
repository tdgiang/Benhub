/**
 * Shared in-memory posts store for Next.js API routes.
 *
 * Module-level singleton — persists across requests within the same server
 * process (resets on server restart / cold starts).
 *
 * Replace this file with a real DB client when the backend PostsModule is ready.
 */
import type { Post } from "@/types";

export const postsStore: Post[] = [];

import type { LucideIcon } from "lucide-react";

// ─── Domain types ─────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
}

export interface PaginatedResult<T> {
  items: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─── NextAuth session augmentation ────────────────────────────────────────────

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
    accessToken: string;
    error?: "RefreshAccessTokenError";
  }
}

// NextAuth v5 JWT token fields are accessed via session.accessToken
// (augmented in the Session interface above)

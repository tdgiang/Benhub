import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        if (!email || !password) return null;

        try {
          const res = await fetch(`${API_URL}/api/v1/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) return null;

          const { data } = await res.json();
          const { user, accessToken, refreshToken } = data;

          return {
            id: user.id,
            name: user.firstName
              ? `${user.firstName}${user.lastName ? " " + user.lastName : ""}`
              : user.email,
            email: user.email,
            role: user.role,
            accessToken,
            refreshToken,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        return {
          ...token,
          id: user.id,
          role: (user as { role: string }).role,
          accessToken: (user as { accessToken: string }).accessToken,
          refreshToken: (user as { refreshToken: string }).refreshToken,
          accessTokenExpires: Date.now() + 14 * 60 * 1000, // 14 min (< 15m TTL)
        };
      }

      // Token still valid
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      // Refresh expired access token
      try {
        const res = await fetch(`${API_URL}/api/v1/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });

        if (!res.ok) throw new Error("Refresh failed");

        const { data } = await res.json();
        return {
          ...token,
          accessToken: data.accessToken,
          accessTokenExpires: Date.now() + 14 * 60 * 1000,
          error: undefined,
        };
      } catch {
        return { ...token, error: "RefreshAccessTokenError" };
      }
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
        accessToken: token.accessToken as string,
        error: token.error as string | undefined,
      };
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});

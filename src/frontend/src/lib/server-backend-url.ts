/**
 * Base URL for NestJS when running on the server (Route Handlers, Server Components).
 * In Docker, set INTERNAL_API_URL=http://backend:4000 — the browser still uses
 * NEXT_PUBLIC_API_URL (e.g. http://localhost/api-backend) for direct client fetches.
 */
export function getServerBackendBaseUrl(): string {
  return (
    process.env.INTERNAL_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:4000"
  );
}

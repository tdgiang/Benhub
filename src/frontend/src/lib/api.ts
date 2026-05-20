import { getServerBackendBaseUrl } from "@/lib/server-backend-url";

const API_URL = getServerBackendBaseUrl();

interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors: unknown;
}

class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiFetch<T>(
  path: string,
  options?: RequestInit & { token?: string },
): Promise<ApiResponse<T>> {
  const { token, ...fetchOptions } = options ?? {};

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...fetchOptions, headers });
  const body = await res.json().catch(() => ({ message: 'Lỗi kết nối máy chủ' }));

  if (!res.ok) {
    throw new ApiError(res.status, body.message ?? `HTTP ${res.status}`, body.errors);
  }

  return body as ApiResponse<T>;
}

export const api = {
  get: <T>(path: string, token?: string) =>
    apiFetch<T>(path, { token }),

  post: <T>(path: string, data: unknown, token?: string) =>
    apiFetch<T>(path, { method: 'POST', body: JSON.stringify(data), token }),

  patch: <T>(path: string, data: unknown, token?: string) =>
    apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(data), token }),

  delete: <T>(path: string, token?: string) =>
    apiFetch<T>(path, { method: 'DELETE', token }),
};

export { ApiError };
export type { ApiResponse };

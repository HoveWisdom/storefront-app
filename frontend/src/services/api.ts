const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    const err = data?.detail || data?.message || response.statusText;
    throw new Error(err);
  }
  return data as T;
}

export async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { signal });
  return handleResponse<T>(res);
}

export async function post<T, U = any>(path: string, body: U): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return handleResponse<T>(res);
}

export async function patch<T, U = any>(path: string, body: U): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  return handleResponse<T>(res);
}
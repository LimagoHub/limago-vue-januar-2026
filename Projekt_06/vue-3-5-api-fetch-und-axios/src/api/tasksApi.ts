import axios, { AxiosError } from "axios";
import type { Task } from "../stores/tasks";

type ApiErrorBody = { message?: string };

const http = axios.create({
  // Leer lassen, damit Vite Proxy greift: /api -> http://localhost:5052/api
  baseURL: "",
  headers: { "Content-Type": "application/json" },
  timeout: 10_000,
});

function toMessage(err: unknown): string {
  if (!err) return "Unbekannter Fehler";

  // AxiosError hat response/data/status
  const ax = err as AxiosError<ApiErrorBody>;

  // Backend liefert idealerweise { message: "..." }
  const msgFromBody = ax.response?.data?.message;
  if (msgFromBody) return msgFromBody;

  // Fallback: HTTP Status
  if (ax.response?.status) return `HTTP ${ax.response.status}`;

  // Netzwerk/Timeout/sonstiges
  if (ax.message) return ax.message;

  return "Unbekannter Fehler";
}

export async function listTasks(): Promise<Task[]> {
  try {
    const res = await http.get<Task[]>("/api/tasks");
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e));
  }
}

export async function addTask(title: string): Promise<Task> {
  try {
    const res = await http.post<Task>("/api/tasks", { title });
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e));
  }
}

export async function toggleTask(id: number): Promise<Task> {
  try {
    const res = await http.post<Task>(`/api/tasks/${id}/toggle`);
    return res.data;
  } catch (e) {
    throw new Error(toMessage(e));
  }
}

export async function removeTask(id: number): Promise<void> {
  try {
    await http.delete(`/api/tasks/${id}`);
  } catch (e) {
    throw new Error(toMessage(e));
  }
}

/*import type { Task } from "../stores/tasks";

type ApiError = { message?: string };

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    // versuche Fehlertext als JSON zu lesen
    let msg = `HTTP ${res.status}`;
    try {
      const data = (await res.json()) as ApiError;
      if (data?.message) msg = data.message;
    } catch {
      // ignore
    }
    throw new Error(msg);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}

export async function listTasks(): Promise<Task[]> {
  return request<Task[]>("/api/tasks");
}

export async function addTask(title: string): Promise<Task> {
  return request<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  });
}

export async function toggleTask(id: number): Promise<Task> {
  return request<Task>(`/api/tasks/${id}/toggle`, {
    method: "POST",
  });
}

export async function removeTask(id: number): Promise<void> {
  await request<void>(`/api/tasks/${id}`, { method: "DELETE" });
}
*/
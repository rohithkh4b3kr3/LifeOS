import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:5000/api' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

export const apiFetch = async (path: string, options?: RequestInit) => {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
  });

  const contentType = res.headers.get("content-type") || "";
  const payload = contentType.includes("application/json") ? await res.json() : await res.text();

  if (!res.ok) {
    const message = typeof payload === "string" ? payload : payload?.message;
    throw new Error(message || `Request failed (${res.status})`);
  }

  return payload;
};

export const parseMemory = async (text: string) => {
  return apiFetch("/ai/memory", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
};

export const bulkCreateTasks = async (tasks: any[]) => {
  return apiFetch("/tasks/bulk-create", {
    method: "POST",
    body: JSON.stringify({ tasks }),
  });
};

export const getTasks = async () => {
  return apiFetch("/tasks", {
    method: "GET",
  });
};

export const createBrainDump = async (text: string, userId: string = 'default-user-id') => {
  const response = await api.post('/brain-dumps', { rawText: text, userId });
  return response.data;
};

export const getBrainDumps = async (userId: string = 'default-user-id') => {
  const response = await api.get('/brain-dumps', { params: { userId } });
  return response.data;
};

export default api;

// API 服務 - 統一管理所有 API 請求

const API_BASE = '/api';

// Token 管理
const TOKEN_KEY = 'auth_token';

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  remove: () => localStorage.removeItem(TOKEN_KEY),
};

// 通用 fetch 包裝器
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStorage.get();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await request<{
      success: boolean;
      user: { id: string; email: string; name: string };
      token: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.token) {
      tokenStorage.set(response.token);
    }

    return response;
  },

  logout: async () => {
    await request('/auth/logout', { method: 'POST' });
    tokenStorage.remove();
  },

  getCurrentUser: async () => {
    return request<{
      success: boolean;
      user: { id: string; email: string; name: string };
    }>('/auth/me');
  },
};

// Dashboard API
export const dashboardApi = {
  getData: async () => {
    return request<{
      success: boolean;
      data: {
        metrics: Array<{
          title: string;
          value: string;
          unit?: string;
          status: 'good' | 'needs-improvement' | 'poor';
          trend: {
            direction: 'up' | 'down' | 'stable';
            value: string;
          };
        }>;
        pageMetrics: Array<{
          page: string;
          lcp: number;
          inp: number;
          cls: number;
          status: 'good' | 'needs-improvement' | 'poor';
        }>;
      };
    }>('/dashboard');
  },

  getMetrics: async (page?: string) => {
    const query = page ? `?page=${encodeURIComponent(page)}` : '';
    return request<{
      success: boolean;
      data: Array<{
        page: string;
        lcp: number;
        inp: number;
        cls: number;
        status: 'good' | 'needs-improvement' | 'poor';
      }>;
    }>(`/metrics${query}`);
  },
};

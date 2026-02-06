// API 請求/響應型別定義

// 登入相關
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

// 使用者相關
export interface User {
  id: string;
  email: string;
  name: string;
}

// Web Vitals 指標相關
export type MetricStatus = 'good' | 'needs-improvement' | 'poor';

export interface PageMetric {
  page: string;
  lcp: number;
  inp: number;
  cls: number;
  status: MetricStatus;
}

export interface MetricSummary {
  title: string;
  value: string;
  unit?: string;
  status: MetricStatus;
  trend: {
    direction: 'up' | 'down' | 'stable';
    value: string;
  };
}

export interface DashboardData {
  metrics: MetricSummary[];
  pageMetrics: PageMetric[];
}

// API 錯誤響應
export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

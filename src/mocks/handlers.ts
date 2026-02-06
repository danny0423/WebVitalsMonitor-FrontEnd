import { http, HttpResponse, delay } from 'msw';
import type {
  LoginRequest,
  LoginResponse,
  DashboardData,
  ApiError,
} from './types';

// Mock 資料
const mockUser = {
  id: '1',
  email: 'demo@vitalmetrics.com',
  name: 'Demo User',
};

const mockDashboardData: DashboardData = {
  metrics: [
    {
      title: 'LCP',
      value: '1.2',
      unit: 's',
      status: 'good',
      trend: {
        direction: 'down',
        value: '-0.3s from last week',
      },
    },
    {
      title: 'INP',
      value: '350',
      unit: 'ms',
      status: 'needs-improvement',
      trend: {
        direction: 'stable',
        value: 'Stable from last week',
      },
    },
    {
      title: 'CLS',
      value: '0.42',
      status: 'poor',
      trend: {
        direction: 'up',
        value: '+0.15 from last week',
      },
    },
  ],
  pageMetrics: [
    {
      page: '/home',
      lcp: 1.2,
      inp: 350,
      cls: 0.42,
      status: 'poor',
    },
    {
      page: '/products',
      lcp: 2.1,
      inp: 180,
      cls: 0.08,
      status: 'good',
    },
    {
      page: '/checkout',
      lcp: 3.8,
      inp: 450,
      cls: 0.25,
      status: 'needs-improvement',
    },
    {
      page: '/about',
      lcp: 1.5,
      inp: 120,
      cls: 0.05,
      status: 'good',
    },
    {
      page: '/contact',
      lcp: 2.8,
      inp: 280,
      cls: 0.18,
      status: 'needs-improvement',
    },
  ],
};

export const handlers = [
  // POST /api/auth/login - 登入
  http.post('/api/auth/login', async ({ request }) => {
    await delay(500); // 模擬網路延遲

    const body = (await request.json()) as LoginRequest;

    // 驗證邏輯 (demo 帳號: demo@vitalmetrics.com / password)
    if (
      body.email === 'demo@vitalmetrics.com' &&
      body.password === 'password'
    ) {
      const response: LoginResponse = {
        success: true,
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
      };
      return HttpResponse.json(response);
    }

    // 登入失敗
    const error: ApiError = {
      success: false,
      message: 'Invalid email or password',
      code: 'AUTH_INVALID_CREDENTIALS',
    };
    return HttpResponse.json(error, { status: 401 });
  }),

  // POST /api/auth/logout - 登出
  http.post('/api/auth/logout', async () => {
    await delay(200);
    return HttpResponse.json({ success: true });
  }),

  // GET /api/auth/me - 取得當前使用者
  http.get('/api/auth/me', async ({ request }) => {
    await delay(300);

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token-')) {
      const error: ApiError = {
        success: false,
        message: 'Unauthorized',
        code: 'AUTH_UNAUTHORIZED',
      };
      return HttpResponse.json(error, { status: 401 });
    }

    return HttpResponse.json({
      success: true,
      user: mockUser,
    });
  }),

  // GET /api/dashboard - 取得 Dashboard 資料
  http.get('/api/dashboard', async ({ request }) => {
    await delay(800); // 模擬載入時間

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error: ApiError = {
        success: false,
        message: 'Unauthorized',
        code: 'AUTH_UNAUTHORIZED',
      };
      return HttpResponse.json(error, { status: 401 });
    }

    return HttpResponse.json({
      success: true,
      data: mockDashboardData,
    });
  }),

  // GET /api/metrics - 取得所有頁面指標
  http.get('/api/metrics', async ({ request }) => {
    await delay(600);

    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      const error: ApiError = {
        success: false,
        message: 'Unauthorized',
        code: 'AUTH_UNAUTHORIZED',
      };
      return HttpResponse.json(error, { status: 401 });
    }

    const url = new URL(request.url);
    const page = url.searchParams.get('page');

    let filteredMetrics = mockDashboardData.pageMetrics;
    if (page) {
      filteredMetrics = filteredMetrics.filter((m) => m.page.includes(page));
    }

    return HttpResponse.json({
      success: true,
      data: filteredMetrics,
    });
  }),
];

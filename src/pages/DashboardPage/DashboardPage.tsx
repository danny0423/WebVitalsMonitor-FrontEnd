import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { MetricCard } from '../../components/MetricCard';
import { DataTable } from '../../components/DataTable';
import type { PageMetric } from '../../components/DataTable';
import { dashboardApi, authApi, tokenStorage } from '../../services/api';
import './DashboardPage.scss';

interface MetricSummary {
  title: string;
  value: string;
  unit?: string;
  status: 'good' | 'needs-improvement' | 'poor';
  trend: {
    direction: 'up' | 'down' | 'stable';
    value: string;
  };
}

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [metrics, setMetrics] = useState<MetricSummary[]>([]);
  const [pageMetrics, setPageMetrics] = useState<PageMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // 檢查是否有 token
      if (!tokenStorage.get()) {
        navigate('/');
        return;
      }

      try {
        const response = await dashboardApi.getData();
        if (response.success) {
          setMetrics(response.data.metrics);
          setPageMetrics(response.data.pageMetrics);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        // 如果是認證錯誤，導回登入頁
        if (err instanceof Error && err.message === 'Unauthorized') {
          tokenStorage.remove();
          navigate('/');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch {
      // 即使 logout API 失敗也要清除 token
      tokenStorage.remove();
    }
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="dashboard-page dashboard-page--loading">
        <div className="dashboard-page__loader">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      {/* Top Bar */}
      <header className="dashboard-page__topbar">
        <div className="dashboard-page__topbar-left">
          <div className="dashboard-page__logo">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <span className="dashboard-page__brand">VitalMetrics</span>
        </div>
        <div className="dashboard-page__topbar-right">
          <button className="dashboard-page__icon-btn" aria-label="Notifications">
            🔔
          </button>
          <button
            className="dashboard-page__avatar"
            onClick={handleLogout}
            title="Logout"
          >
            U
          </button>
        </div>
      </header>

      <div className="dashboard-page__body">
        {/* Sidebar */}
        <aside className="dashboard-page__sidebar">
          <nav className="dashboard-page__nav">
            <button
              className={`dashboard-page__nav-item ${
                activeNav === 'dashboard' ? 'dashboard-page__nav-item--active' : ''
              }`}
              onClick={() => setActiveNav('dashboard')}
            >
              <span className="dashboard-page__nav-icon">📊</span>
              <span className="dashboard-page__nav-text">Dashboard</span>
            </button>
            <button
              className={`dashboard-page__nav-item ${
                activeNav === 'sites' ? 'dashboard-page__nav-item--active' : ''
              }`}
              onClick={() => setActiveNav('sites')}
            >
              <span className="dashboard-page__nav-icon">🌐</span>
              <span className="dashboard-page__nav-text">Sites</span>
            </button>
            <button
              className={`dashboard-page__nav-item ${
                activeNav === 'reports' ? 'dashboard-page__nav-item--active' : ''
              }`}
              onClick={() => setActiveNav('reports')}
            >
              <span className="dashboard-page__nav-icon">📈</span>
              <span className="dashboard-page__nav-text">Reports</span>
            </button>
            <button
              className={`dashboard-page__nav-item ${
                activeNav === 'alerts' ? 'dashboard-page__nav-item--active' : ''
              }`}
              onClick={() => setActiveNav('alerts')}
            >
              <span className="dashboard-page__nav-icon">🔔</span>
              <span className="dashboard-page__nav-text">Alerts</span>
            </button>
            <button
              className={`dashboard-page__nav-item ${
                activeNav === 'settings' ? 'dashboard-page__nav-item--active' : ''
              }`}
              onClick={() => setActiveNav('settings')}
            >
              <span className="dashboard-page__nav-icon">⚙️</span>
              <span className="dashboard-page__nav-text">Settings</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="dashboard-page__main">
          {/* Page Header */}
          <div className="dashboard-page__header">
            <div className="dashboard-page__header-left">
              <h1 className="dashboard-page__title">Dashboard Overview</h1>
              <p className="dashboard-page__subtitle">
                Monitor your Core Web Vitals across all sites
              </p>
            </div>
            <div className="dashboard-page__header-right">
              <Button variant="primary" size="md">
                <span>➕</span>
                <span>Add Site</span>
              </Button>
            </div>
          </div>

          {error && <div className="dashboard-page__error">{error}</div>}

          {/* Metrics Row */}
          <div className="dashboard-page__metrics">
            {metrics.map((metric) => (
              <MetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                unit={metric.unit}
                status={metric.status}
                trend={metric.trend}
              />
            ))}
          </div>

          {/* Data Table */}
          <DataTable data={pageMetrics} />
        </main>
      </div>
    </div>
  );
};

import React from 'react';
import { Button } from '../../components/Button';
import { Badge } from '../../components/Badge';
import { MetricCard } from '../../components/MetricCard';
import { DataTable } from '../../components/DataTable';
import type { PageMetric } from '../../components/DataTable';
import './DashboardPage.scss';

const mockMetrics = [
  {
    page: '/home',
    lcp: 1.2,
    inp: 350,
    cls: 0.42,
    status: 'poor' as const,
  },
  {
    page: '/products',
    lcp: 2.1,
    inp: 180,
    cls: 0.08,
    status: 'good' as const,
  },
  {
    page: '/checkout',
    lcp: 3.8,
    inp: 450,
    cls: 0.25,
    status: 'needs-improvement' as const,
  },
] as PageMetric[];

export const DashboardPage: React.FC = () => {
  const [activeNav, setActiveNav] = React.useState('dashboard');

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
          <div className="dashboard-page__avatar">U</div>
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

          {/* Metrics Row */}
          <div className="dashboard-page__metrics">
            <MetricCard
              title="LCP"
              value="1.2"
              unit="s"
              status="good"
              trend={{
                direction: 'down',
                value: '-0.3s from last week',
              }}
            />
            <MetricCard
              title="INP"
              value="350"
              unit="ms"
              status="needs-improvement"
              trend={{
                direction: 'stable',
                value: 'Stable from last week',
              }}
            />
            <MetricCard
              title="CLS"
              value="0.42"
              status="poor"
              trend={{
                direction: 'up',
                value: '+0.15 from last week',
              }}
            />
          </div>

          {/* Data Table */}
          <DataTable data={mockMetrics} />
        </main>
      </div>
    </div>
  );
};

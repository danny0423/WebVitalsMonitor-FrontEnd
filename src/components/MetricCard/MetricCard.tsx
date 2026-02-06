import React from 'react';
import { Badge } from '../Badge';
import './MetricCard.scss';

export type MetricStatus = 'good' | 'needs-improvement' | 'poor';

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: MetricStatus;
  statusLabel?: string;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: string;
  };
  className?: string;
}

const statusToBadgeVariant = (status: MetricStatus): 'success' | 'warning' | 'error' => {
  switch (status) {
    case 'good':
      return 'success';
    case 'needs-improvement':
      return 'warning';
    case 'poor':
      return 'error';
  }
};

const statusLabel = (status: MetricStatus): string => {
  switch (status) {
    case 'good':
      return 'Good';
    case 'needs-improvement':
      return 'Needs Improvement';
    case 'poor':
      return 'Poor';
  }
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit,
  status,
  statusLabel: customStatusLabel,
  trend,
  className = '',
}) => {
  const classNames = [
    'metric-card',
    `metric-card--${status}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const trendIcon = trend?.direction === 'up' ? '↑' : trend?.direction === 'down' ? '↓' : '−';

  return (
    <div className={classNames}>
      <div className="metric-card__header">
        <span className="metric-card__title">{title}</span>
        <Badge variant={statusToBadgeVariant(status)}>
          {customStatusLabel || statusLabel(status)}
        </Badge>
      </div>

      <div className="metric-card__value">
        <span className={`metric-card__number metric-card__number--${status}`}>
          {value}
        </span>
        {unit && <span className="metric-card__unit">{unit}</span>}
      </div>

      {trend && (
        <div className={`metric-card__trend metric-card__trend--${trend.direction}`}>
          <span className="metric-card__trend-icon">{trendIcon}</span>
          <span className="metric-card__trend-text">{trend.value}</span>
        </div>
      )}
    </div>
  );
};

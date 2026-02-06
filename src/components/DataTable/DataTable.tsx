import React from 'react';
import { Badge } from '../Badge';
import type { MetricStatus } from '../MetricCard';
import './DataTable.scss';

export interface PageMetric {
  page: string;
  lcp: number;
  inp: number;
  cls: number;
  status: MetricStatus;
}

export interface DataTableProps {
  data: PageMetric[];
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

const getMetricStatus = (value: number, metric: 'lcp' | 'inp' | 'cls'): MetricStatus => {
  if (metric === 'lcp') {
    if (value <= 2.5) return 'good';
    if (value <= 4.0) return 'needs-improvement';
    return 'poor';
  }
  if (metric === 'inp') {
    if (value <= 200) return 'good';
    if (value <= 500) return 'needs-improvement';
    return 'poor';
  }
  if (metric === 'cls') {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }
  return 'poor';
};

export const DataTable: React.FC<DataTableProps> = ({ data, className = '' }) => {
  const classNames = ['data-table-card', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="data-table-card__header">
        <h3 className="data-table-card__title">Page Performance</h3>
        <Badge variant="gray">{data.length} pages</Badge>
      </div>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead className="data-table__head">
            <tr>
              <th className="data-table__th data-table__th--page">PAGE</th>
              <th className="data-table__th data-table__th--metric">LCP</th>
              <th className="data-table__th data-table__th--metric">INP</th>
              <th className="data-table__th data-table__th--metric">CLS</th>
              <th className="data-table__th data-table__th--status">STATUS</th>
            </tr>
          </thead>
          <tbody className="data-table__body">
            {data.map((row, index) => (
              <tr key={index} className="data-table__row">
                <td className="data-table__td data-table__td--page">{row.page}</td>
                <td className={`data-table__td data-table__td--metric data-table__td--${getMetricStatus(row.lcp, 'lcp')}`}>
                  {row.lcp.toFixed(1)}s
                </td>
                <td className={`data-table__td data-table__td--metric data-table__td--${getMetricStatus(row.inp, 'inp')}`}>
                  {row.inp}ms
                </td>
                <td className={`data-table__td data-table__td--metric data-table__td--${getMetricStatus(row.cls, 'cls')}`}>
                  {row.cls.toFixed(2)}
                </td>
                <td className="data-table__td data-table__td--status">
                  <Badge variant={statusToBadgeVariant(row.status)}>
                    {statusLabel(row.status)}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

import React from 'react';
import './Badge.scss';

export interface BadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'gray';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'gray',
  children,
  className = '',
}) => {
  const classNames = [
    'badge',
    `badge--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classNames}>{children}</span>;
};

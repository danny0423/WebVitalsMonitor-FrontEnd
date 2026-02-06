import React from 'react';
import './Input.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const inputClassNames = [
    'input',
    error && 'input--error',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const wrapperClassNames = [
    'input-wrapper',
    fullWidth && 'input-wrapper--full-width',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClassNames}>
      {label && <label className="input-label">{label}</label>}
      <input className={inputClassNames} {...props} />
      {(error || helperText) && (
        <span className={`input-helper ${error ? 'input-helper--error' : ''}`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { authApi } from '../../services/api';
import './LoginPage.scss';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(email, password);
      if (response.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__brand">
        <div className="login-page__brand-content">
          <div className="login-page__logo">
            <svg
              width="64"
              height="64"
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
          <h1 className="login-page__brand-title">VitalMetrics</h1>
          <p className="login-page__brand-subtitle">
            Monitor your Web Vitals performance
            <br />
            in real-time, all in one place.
          </p>
        </div>
      </div>

      <div className="login-page__form-panel">
        <div className="login-page__form-card">
          <div className="login-page__form-header">
            <h2 className="login-page__form-title">Welcome back</h2>
            <p className="login-page__form-subtitle">
              Sign in to your VitalMetrics account
            </p>
          </div>

          {error && <div className="login-page__error">{error}</div>}

          <form onSubmit={handleSubmit} className="login-page__form">
            <Input
              type="email"
              label="Email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              disabled={isLoading}
            />

            <div className="login-page__password-field">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="login-page__toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <div className="login-page__forgot">
              <a href="#" className="login-page__forgot-link">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <div className="login-page__demo-hint">
              <small>
                Demo: demo@vitalmetrics.com / password
              </small>
            </div>

            <div className="login-page__footer">
              <span className="login-page__footer-text">
                Don't have an account?
              </span>
              <a href="#" className="login-page__footer-link">
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

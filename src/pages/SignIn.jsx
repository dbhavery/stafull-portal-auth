/**
 * SignIn Page
 */

import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@shared/hooks';
import AuthLayout from '../components/AuthLayout';

export function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get('return');

  const { login, loading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password');
      return;
    }

    const result = await login(email, password);

    if (result.success) {
      const user = result.data.user;

      // Check if email needs verification
      if (!user.emailVerified) {
        navigate('/verify', { state: { email } });
        return;
      }

      // Check if terms need acceptance
      if (!user.termsAccepted) {
        navigate('/terms');
        return;
      }

      // Redirect to portal or return URL
      if (returnUrl) {
        window.location.href = returnUrl;
      } else {
        const portalUrl = result.data.portal;
        const portalUrls = {
          holdings: 'https://hq.stafull.com',
          franchise: 'https://app.stafull.com',
          management: 'https://app.stafull.com',
          driver: 'https://driver.stafull.com',
          customer: 'https://my.stafull.com',
          employer: 'https://my.stafull.com',
          employee: 'https://my.stafull.com',
          investor: 'https://my.stafull.com',
          lender: 'https://my.stafull.com',
        };
        window.location.href = portalUrls[portalUrl] || 'https://my.stafull.com';
      }
    } else {
      setError(result.error || 'Invalid email or password');
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Welcome back</h2>
          <p className="auth-card-subtitle">Sign in to your StaFull account</p>
        </div>

        {error && (
          <div className="auth-alert error">{error}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div style={{ textAlign: 'right' }}>
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="auth-link">Sign up</Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignIn;

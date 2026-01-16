/**
 * ResetPassword Page - Set new password
 */

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    // TODO: Implement password reset API call
    // For now, simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSuccess(true);
    setLoading(false);
  };

  // Invalid or missing token
  if (!token) {
    return (
      <AuthLayout>
        <div className="auth-card">
          <div className="auth-card-header">
            <h2 className="auth-card-title">Invalid Link</h2>
            <p className="auth-card-subtitle">
              This password reset link is invalid or has expired.
            </p>
          </div>

          <Link to="/forgot-password" className="auth-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Request New Link
          </Link>

          <div className="auth-footer">
            <Link to="/signin" className="auth-link">Back to sign in</Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  // Success state
  if (success) {
    return (
      <AuthLayout>
        <div className="auth-card">
          <div className="auth-card-header">
            <h2 className="auth-card-title">Password Reset</h2>
            <p className="auth-card-subtitle">
              Your password has been successfully reset.
            </p>
          </div>

          <div className="auth-alert success">
            You can now sign in with your new password.
          </div>

          <Link to="/signin" className="auth-button" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
            Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Create new password</h2>
          <p className="auth-card-subtitle">
            Enter your new password below
          </p>
        </div>

        {error && (
          <div className="auth-alert error">{error}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label" htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              className="auth-input"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              autoFocus
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="auth-input"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="auth-footer">
          <Link to="/signin" className="auth-link">Back to sign in</Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ResetPassword;

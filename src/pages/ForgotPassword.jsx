/**
 * ForgotPassword Page - Password reset request
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendVerification } from '@shared/services';
import AuthLayout from '../components/AuthLayout';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    // Send password reset email (using verification endpoint for now)
    const { ok } = await sendVerification(email);

    if (ok) {
      setSuccess(true);
    } else {
      setError('Failed to send reset email. Please try again.');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <AuthLayout>
        <div className="auth-card">
          <div className="auth-card-header">
            <h2 className="auth-card-title">Check your email</h2>
            <p className="auth-card-subtitle">
              We sent a password reset link to<br />
              <strong>{email}</strong>
            </p>
          </div>

          <div className="auth-alert success">
            If an account exists with this email, you will receive password
            reset instructions shortly.
          </div>

          <div className="auth-footer">
            <Link to="/signin" className="auth-link">Back to sign in</Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Reset your password</h2>
          <p className="auth-card-subtitle">
            Enter your email and we&apos;ll send you a reset link
          </p>
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

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="auth-footer">
          Remember your password?{' '}
          <Link to="/signin" className="auth-link">Sign in</Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;

/**
 * SignUp Page
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/hooks';
import AuthLayout from '../components/AuthLayout';

export function SignUp() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    if (!validate()) return;

    const result = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone || undefined,
    });

    if (result.success) {
      // Navigate to verification page
      navigate('/verify', { state: { email: formData.email } });
    } else {
      if (result.code === 'EMAIL_EXISTS') {
        setErrors((prev) => ({ ...prev, email: 'An account with this email already exists' }));
      } else {
        setGeneralError(result.error || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Create your account</h2>
          <p className="auth-card-subtitle">Join StaFull today</p>
        </div>

        {generalError && (
          <div className="auth-alert error">{generalError}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: 'var(--space-3, 14px)' }}>
            <div className="auth-input-group" style={{ flex: 1 }}>
              <label className="auth-label" htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className={`auth-input ${errors.firstName ? 'error' : ''}`}
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                autoFocus
              />
              {errors.firstName && <span className="auth-error">{errors.firstName}</span>}
            </div>

            <div className="auth-input-group" style={{ flex: 1 }}>
              <label className="auth-label" htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className={`auth-input ${errors.lastName ? 'error' : ''}`}
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                autoComplete="family-name"
              />
              {errors.lastName && <span className="auth-error">{errors.lastName}</span>}
            </div>
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`auth-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="auth-error">{errors.email}</span>}
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="phone">Phone (optional)</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="auth-input"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`auth-input ${errors.password ? 'error' : ''}`}
              placeholder="At least 8 characters"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <span className="auth-error">{errors.password}</span>}
          </div>

          <div className="auth-input-group">
            <label className="auth-label" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`auth-input ${errors.confirmPassword ? 'error' : ''}`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="auth-error">{errors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/signin" className="auth-link">Sign in</Link>
        </div>
      </div>
    </AuthLayout>
  );
}

export default SignUp;

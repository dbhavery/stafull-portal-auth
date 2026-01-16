/**
 * Terms Page - Terms of Service acceptance
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@shared/hooks';
import AuthLayout from '../components/AuthLayout';

export function Terms() {
  const navigate = useNavigate();
  const { acceptTerms, user, loading, getPortalUrl } = useAuth();

  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!accepted) {
      setError('You must accept the Terms of Service to continue');
      return;
    }

    const result = await acceptTerms();

    if (result.success) {
      // Redirect to appropriate portal
      if (user) {
        const portalUrl = getPortalUrl(user.role);
        window.location.href = portalUrl;
      } else {
        navigate('/signin');
      }
    } else {
      setError(result.error || 'Failed to accept terms. Please try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Terms of Service</h2>
          <p className="auth-card-subtitle">
            Please review and accept our terms to continue
          </p>
        </div>

        {error && (
          <div className="auth-alert error">{error}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="terms-content">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using StaFull&apos;s services, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree to abide
              by these terms, please do not use our services.
            </p>

            <h3>2. Service Description</h3>
            <p>
              StaFull provides mobile fuel delivery management services, including but not
              limited to route optimization, delivery scheduling, customer management,
              and financial tracking for franchise operations.
            </p>

            <h3>3. User Responsibilities</h3>
            <p>
              You are responsible for maintaining the confidentiality of your account
              credentials and for all activities that occur under your account. You agree
              to notify StaFull immediately of any unauthorized use of your account.
            </p>

            <h3>4. Data Privacy</h3>
            <p>
              We collect and process personal data in accordance with our Privacy Policy.
              By using our services, you consent to the collection and use of your
              information as described therein.
            </p>

            <h3>5. Intellectual Property</h3>
            <p>
              All content, features, and functionality of StaFull services are owned by
              StaFull Holdings and are protected by international copyright, trademark,
              and other intellectual property laws.
            </p>

            <h3>6. Limitation of Liability</h3>
            <p>
              StaFull shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or inability
              to use the service.
            </p>

            <h3>7. Modifications</h3>
            <p>
              StaFull reserves the right to modify these terms at any time. We will
              notify users of any material changes via email or through the service.
              Continued use of the service after such modifications constitutes
              acceptance of the updated terms.
            </p>

            <h3>8. Governing Law</h3>
            <p>
              These terms shall be governed by and construed in accordance with the
              laws of the State of Delaware, without regard to its conflict of law
              provisions.
            </p>
          </div>

          <div className="auth-checkbox-group">
            <input
              type="checkbox"
              id="accept-terms"
              className="auth-checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label htmlFor="accept-terms" className="auth-checkbox-label">
              I have read and agree to the Terms of Service and Privacy Policy
            </label>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || !accepted}
          >
            {loading ? 'Processing...' : 'Accept & Continue'}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Terms;

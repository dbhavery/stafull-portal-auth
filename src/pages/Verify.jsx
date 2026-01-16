/**
 * Verify Page - Email verification code entry
 */

import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@shared/hooks';
import { sendVerification } from '@shared/services';
import AuthLayout from '../components/AuthLayout';

export function Verify() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { verifyEmail, loading, getPortalUrl, user } = useAuth();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const inputRefs = useRef([]);

  // Redirect if no email provided
  useEffect(() => {
    if (!email && !user?.email) {
      navigate('/signin');
    }
  }, [email, user, navigate]);

  const handleChange = (index, value) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all digits entered
    if (value && index === 5) {
      const fullCode = newCode.join('');
      if (fullCode.length === 6) {
        handleSubmit(fullCode);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);

    if (pasted.length === 6) {
      const newCode = pasted.split('');
      setCode(newCode);
      handleSubmit(pasted);
    }
  };

  const handleSubmit = async (codeString) => {
    const verifyCode = codeString || code.join('');

    if (verifyCode.length !== 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    const userEmail = email || user?.email;
    const result = await verifyEmail(userEmail, verifyCode);

    if (result.success) {
      setSuccess('Email verified successfully!');

      // Navigate to terms if needed, otherwise redirect
      setTimeout(() => {
        if (user && !user.termsAccepted) {
          navigate('/terms');
        } else if (user) {
          const portalUrl = getPortalUrl(user.role);
          window.location.href = portalUrl;
        } else {
          navigate('/signin');
        }
      }, 1500);
    } else {
      setError(result.error || 'Invalid verification code');
      // Clear code on error
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError('');

    const userEmail = email || user?.email;
    const { ok } = await sendVerification(userEmail);

    if (ok) {
      setSuccess('A new verification code has been sent to your email');
      setTimeout(() => setSuccess(''), 5000);
    } else {
      setError('Failed to resend code. Please try again.');
    }

    setResendLoading(false);
  };

  const userEmail = email || user?.email;

  return (
    <AuthLayout>
      <div className="auth-card">
        <div className="auth-card-header">
          <h2 className="auth-card-title">Verify your email</h2>
          <p className="auth-card-subtitle">
            We sent a 6-digit code to<br />
            <strong>{userEmail}</strong>
          </p>
        </div>

        {error && (
          <div className="auth-alert error">{error}</div>
        )}

        {success && (
          <div className="auth-alert success">{success}</div>
        )}

        <form
          className="auth-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="auth-code-input" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="auth-code-digit"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                autoFocus={index === 0}
              />
            ))}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading || code.join('').length !== 6}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>

        <div className="auth-footer">
          Didn&apos;t receive the code?{' '}
          <button
            type="button"
            className="auth-link"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={handleResend}
            disabled={resendLoading}
          >
            {resendLoading ? 'Sending...' : 'Resend code'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}

export default Verify;

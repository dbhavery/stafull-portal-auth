import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@shared/contexts';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import Terms from './pages/Terms';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function AuthRedirect() {
  const { user, loading, isAuthenticated, getPortalUrl } = useAuth();

  if (loading) {
    return (
      <div className="auth-layout">
        <div className="auth-main">
          <div className="auth-card">
            <div className="auth-card-header">
              <p className="auth-card-subtitle">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If authenticated, check verification and terms
  if (isAuthenticated && user) {
    // Check email verification
    if (!user.emailVerified) {
      return <Navigate to="/verify" replace />;
    }

    // Check terms acceptance
    if (!user.termsAccepted) {
      return <Navigate to="/terms" replace />;
    }

    // Redirect to appropriate portal
    const portalUrl = getPortalUrl(user.role);
    window.location.href = portalUrl;
    return null;
  }

  return <SignIn />;
}

function App() {
  // Handle session expiry
  const handleSessionExpired = () => {
    console.log('[AUTH] Session expired');
  };

  // Handle session warning
  const handleSessionWarning = () => {
    console.log('[AUTH] Session expiring soon');
  };

  return (
    <AuthProvider
      onSessionExpired={handleSessionExpired}
      onSessionWarning={handleSessionWarning}
    >
      <Routes>
        <Route path="/" element={<AuthRedirect />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

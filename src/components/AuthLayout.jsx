/**
 * AuthLayout - Common layout for auth pages
 */

import { StaFullLogo } from '@shared/components';

export function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <aside className="auth-sidebar">
        <div className="auth-sidebar-content">
          <div className="auth-logo">
            <StaFullLogo size="lg" />
          </div>
          <h1 className="auth-tagline">
            Mobile Fuel Delivery,<br />
            <span>Reimagined.</span>
          </h1>
          <p className="auth-description">
            The all-in-one platform for franchise operations, driver management,
            and customer delivery tracking.
          </p>
        </div>
      </aside>
      <main className="auth-main">
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;

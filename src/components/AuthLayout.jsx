/**
 * AuthLayout - Common layout for auth pages
 * Uses approved SVG logo files per DESIGN-RULES Section 9
 */

// Logo path - dark background uses dark variant (white "Stā" + red "Full")
const LOGO_SRC = '/logos/stafull-logo-dark-transparent.svg';

export function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <aside className="auth-sidebar">
        <div className="auth-sidebar-content">
          <div className="auth-logo">
            <img src={LOGO_SRC} alt="StāFull" className="auth-logo-img" />
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

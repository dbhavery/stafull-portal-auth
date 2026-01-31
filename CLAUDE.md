# StaFull Auth Portal - Agent Guide
**Version:** 1.0 | **Updated:** 2026-01-27 | **Status:** ACTIVE

---

## PORTAL OVERVIEW

| Property | Value |
|----------|-------|
| Port | 5170 |
| Domain | auth.stafull.com |
| Purpose | Centralized authentication hub |
| Stack | React 18, Vite, React Router v6 |

---

## ROUTES

| Path | Component | Purpose |
|------|-----------|---------|
| `/signin` | SignIn | Login form with dev test accounts |
| `/signup` | SignUp | New user registration |
| `/forgot-password` | ForgotPassword | Password reset request |
| `/reset-password` | ResetPassword | Token-based password reset |
| `/verify` | Verify | Email verification handler |
| `/terms` | Terms | Terms of service |

---

## AUTHENTICATION FLOW

1. User enters credentials at `/signin`
2. API validates and returns JWT + user object with role
3. Portal stores token in localStorage
4. Portal redirects to appropriate role-based portal:
   - `holdings_admin` → hq.stafull.com (port 5174)
   - `franchise_owner`, `manager` → franchise.stafull.com (port 5175)
   - `driver` → driver.stafull.com (port 5176)
   - `customer`, `employer`, `employee`, `investor`, `sba_lender` → my.stafull.com (port 5177)

---

## API ENDPOINTS USED

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/auth/login` | Authenticate user |
| POST | `/auth/register` | Create new account |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |
| GET | `/auth/verify-email` | Verify email address |

---

## DEV TEST ACCOUNTS

All accounts use password: `pass`

| Role | Email | Redirects To |
|------|-------|--------------|
| Holdings Admin | admin@test.com | HQ Portal |
| Franchise Owner | owner@test.com | Franchise Portal |
| Manager | manager@test.com | Franchise Portal |
| Driver | driver@test.com | Driver Portal |
| Customer | customer@test.com | Customer Portal |

---

## FILE STRUCTURE

```
stafull-portal-auth/
├── src/
│   ├── main.jsx          # React entry point
│   ├── App.jsx           # Router configuration
│   ├── App.css           # Global styles
│   ├── services/
│   │   └── api.js        # Auth API service
│   └── pages/
│       ├── SignIn.jsx
│       ├── SignUp.jsx
│       ├── ForgotPassword.jsx
│       ├── ResetPassword.jsx
│       ├── Verify.jsx
│       ├── Terms.jsx
│       └── Auth.module.css
├── index.html
├── package.json
├── vite.config.js
└── CLAUDE.md
```

---

## DESIGN COMPLIANCE

- Uses CSS Modules (Auth.module.css)
- Follows stafull-design-system tokens
- Montserrat font family only
- No emojis in UI
- Premium industrial theme with amber accents

---

## COMMANDS

```bash
npm install     # Install dependencies
npm run dev     # Start dev server (port 5170)
npm run build   # Production build
npm run preview # Preview production build
```

---

## PROHIBITIONS

- No `<form>` elements (use `<div>` with onClick handlers)
- No hardcoded colors (use CSS tokens)
- No font weights 300, 800, 900
- No red in shadows

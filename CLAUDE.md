# StaFull Auth Portal

> **DESIGN AUTHORITY**: `stafull-design-system/src/stafull-system.css` (HIGHEST)
> **DESIGN RULES**: See `stafull-shared/docs/rules/DESIGN-RULES.md` for all design rules.

## Overview
Unified authentication portal for all StaFull users. Handles sign-in, sign-up, email verification, and terms acceptance.

## Domain
`auth.stafull.com`

## Tech Stack
- React 18
- Vite
- React Router DOM v6
- @stafull/shared (design system & auth context)

## Key Files
- `src/App.jsx` - Main routing and auth flow
- `src/pages/SignIn.jsx` - Email/password login
- `src/pages/SignUp.jsx` - New user registration
- `src/pages/Verify.jsx` - Email verification code entry
- `src/pages/Terms.jsx` - Terms of Service acceptance
- `src/pages/ForgotPassword.jsx` - Password reset request
- `src/pages/ResetPassword.jsx` - New password form

## Authentication Flow
1. User enters email + password on SignIn page
2. If email not verified -> redirect to Verify page
3. If terms not accepted -> redirect to Terms page
4. On success -> redirect to appropriate portal based on role

## Role Portal Mapping
| Role | Portal URL |
|------|-----------|
| holdings_admin | hq.stafull.com |
| franchise_owner | app.stafull.com |
| manager | app.stafull.com |
| driver | driver.stafull.com |
| customer | my.stafull.com |
| employer | my.stafull.com |
| employee | my.stafull.com |
| investor | my.stafull.com |
| sba_lender | my.stafull.com |

## Development
```bash
npm install
npm run dev  # Starts on port 5170
```

## Deployment
Deploy to Railway with domain `auth.stafull.com`

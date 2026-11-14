# Security Review: Refresh Tokens

Scope: refresh-token implementation and directly relevant call paths/config under `sara7a/src`.

## Findings

### Medium — Refresh tokens are not rotated or revoked

- **File:** `sara7a/src/lib/middleWare/auth/authGard.js`, lines 18–20
- **Confidence:** 8/10
- **Issue:** A valid refresh token is accepted to issue a new access token, but the refresh token itself is not rotated or revoked. It remains valid for its seven-day lifetime. The reviewed auth routes provide no logout endpoint, and password reset does not invalidate existing tokens. A copied refresh token can therefore continue to be used until expiry, including after a password reset.
- **Related code:** `sara7a/src/lib/utils/securityUtils/refreshUserToken.js`, lines 3–6, leaves the refresh cookie unchanged; `sara7a/src/app/auth/services/authService.js`, lines 74–76, sets a seven-day expiry.
- **Recommendation:** Track refresh sessions server-side, rotate refresh tokens when used, and revoke them on logout and password changes.

## Unconfirmed deployment-dependent risk

The refresh-cookie settings omit `Secure` and an explicit `SameSite` value in `sara7a/src/app/auth/controllers/authController.js`, lines 16–23. The code review alone does not establish whether this causes transport or cross-site exposure; that depends on deployment and browser context.

## Testing

No relevant test files were found. `npm test --prefix sara7a` exits with `Error: no test specified`.

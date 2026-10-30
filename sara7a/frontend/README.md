# Sara7a frontend

React and Vite client for Sara7a. It includes the landing page, account registration and verification, sign in, OTP password reset, inbox dashboard, and an anonymous message page.

## Run locally

```sh
npm install
copy .env.example .env
npm run dev
```

The dev server runs at `http://localhost:5173`. Requests to `/auth`, `/users`, and `/messages` are proxied to `http://localhost:3000`. Set `VITE_API_URL` in `.env` to use a different API origin.

## Backend routes used

The auth screens use the implemented routes:

- `POST /auth/register` with `{ name, email, password }`
- `PATCH /auth/verify` with `{ email, value }`
- `POST /auth/login` with `{ email, password }`
- `POST /auth/google` with `{ credential }` from Google Identity Services
- `POST /auth/send-otp` with `{ email }`
- `PATCH /auth/reset-password` with `{ email, value, password }`

The frontend expects these routes for messaging:

- `GET /messages` returns the signed-in user's inbox
- `POST /messages` with `{ receiver, content }` sends an anonymous message
- `GET /users/:username` returns a public user profile

The frontend keeps the auth cookie on the browser side automatically via `withCredentials`, so the HTTP-only access token is sent with each request. The app also includes a compatibility fallback for older message endpoints that still accept `POST /messages/:receiverId` with `{ content }`.

For Google sign-in, set `VITE_GOOGLE_CLIENT_ID` in the frontend `.env` and `WEB_CLIENT_ID` in the backend environment to the same Google OAuth web client ID. Add `http://localhost:5173` to that OAuth client's authorized JavaScript origins.

# Production deployment checklist

Use this when deploying the Simplicon app (frontend + backend) to a live site.

---

## Backend (Node/Express)

### 1. Environment variables (server)

Create or set these on your host (e.g. Heroku, Railway, Render, your VPS):

| Variable       | Required | Description |
|----------------|----------|-------------|
| `MONGODB_URI`  | Yes      | Production MongoDB connection string (e.g. MongoDB Atlas). Overrides `config/default.json` DB. |
| `SECRET`       | Yes      | Strong random string for JWT signing (e.g. `openssl rand -hex 32`). **Never commit this.** |
| `PORT`         | No       | Port the server listens on. Many hosts set this automatically. |
| `FRONTEND_URL` | Yes*     | Full origin of your frontend (e.g. `https://yoursite.com`) for CORS. *Required in production so only your site can call the API. |

### 2. Database

- **Do not** use `config/default.json` DB in production (it points to localhost).
- Use a hosted MongoDB (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)) and set `MONGODB_URI` on the server.

### 3. CORS

- Backend is configured to use `FRONTEND_URL` as the allowed origin when set.
- If you have multiple frontend origins, you’ll need to extend the CORS config in `index.js` to accept an array of origins.

### 4. File uploads

- `uploads/` is served from the app. For production, consider using cloud storage (e.g. S3, Cloudinary) and serving files from there so uploads survive restarts and scale.

---

## Frontend (React)

### 1. Environment variables (build time)

Create `.env.production` in `Simplicon_frontend/` (or set in your host’s build env):

```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

Examples:

- Backend at `https://api.yoursite.com` → `REACT_APP_API_URL=https://api.yoursite.com/api`
- Same domain, API under `/api` → `REACT_APP_API_URL=https://yoursite.com/api`

**Important:** React only reads variables that start with `REACT_APP_`. Rebuild the app after changing them.

### 2. Build

```bash
cd Simplicon_frontend
npm run build
```

Deploy the contents of `build/` to your static host (Vercel, Netlify, S3, etc.).

### 3. Same-domain option

If you serve the React app and the Node app from the same domain (e.g. Node serves both API and static build):

- Set `REACT_APP_API_URL` to a relative URL, e.g. `/api`, and ensure the backend is mounted at `/api` and the frontend is served for other routes.

---

## Security checklist

- [ ] `SECRET` is set on the backend and is strong and unique.
- [ ] `MONGODB_URI` points to production DB; not using localhost DB in production.
- [ ] `FRONTEND_URL` is set so CORS only allows your frontend origin.
- [ ] `.env` and `.env.production` are not committed (they should be in `.gitignore`).
- [ ] HTTPS is used in production for both frontend and backend.

---

## Quick reference

| Environment | Backend .env / server env | Frontend .env.production |
|-------------|---------------------------|---------------------------|
| Development | `PORT=1331`, optional `MONGODB_URI`, `SECRET` for JWT | (optional) `REACT_APP_API_URL=http://localhost:1331/api` |
| Production  | `MONGODB_URI`, `SECRET`, `FRONTEND_URL`, `PORT` (if needed) | `REACT_APP_API_URL=https://your-api-domain.com/api` |

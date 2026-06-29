# Football-tracker

World Cup 2026 tracker with MongoDB-backed user accounts.

## MongoDB Atlas setup

1. Copy `.env.example` to `.env`.
2. Put your Atlas URI in `MONGODB_URI`.
3. Set `JWT_SECRET` to a long random value.
4. Keep `.env` private. It is ignored by git.

Example:

```bash
cp .env.example .env
```

Use a database name in your connection string, for example:

```text
mongodb+srv://<username>:<password>@cluster0.p0xfja9.mongodb.net/football-tracker?retryWrites=true&w=majority&appName=Cluster0
```

## Development

```bash
npm install
npm run dev
```

`npm run dev` starts both:

- Express API on `http://localhost:5050`
- Vite frontend on `http://localhost:5173`

The frontend proxies `/api/*` requests to the Express server.

## Account system

The Account tab supports:

- Register
- Sign in
- HttpOnly session cookie auth
- Password hashing with `bcryptjs`
- Profile update with favorite team
- Sign out

## Production

```bash
npm run build
npm run server
```

The Express server serves `dist/` when a production build exists.

# Lewedi

A community-focused website for Lewedi Development Initiative, with a React front end and a small Express/SQLite authentication API.

## Run locally

Install dependencies (requires npm network access):

```bash
npm install
cd server && npm install && cd ..
```

Start the API in one terminal:

```bash
npm run server
```

Start the website in another terminal:

```bash
npm run dev
```

The browser app will be available at `http://localhost:5173`.

## Structure

- `src/pages` contains the Home, About, Stories, Contact, and Auth routes.
- `src/components` contains the shared navigation, footer, reveal animation, and story card.
- `src/data` contains editable story content.
- `server/server.js` creates the SQLite users table and exposes sign-up/sign-in endpoints.
- `public/logo.png` is the supplied logo and is also used as the favicon.

Set `JWT_SECRET` in production before deploying the API.

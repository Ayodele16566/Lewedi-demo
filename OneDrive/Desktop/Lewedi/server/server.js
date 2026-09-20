import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
const db = new Database('lewedi.db');
const secret = process.env.JWT_SECRET || 'replace-this-in-production';

const sanitizeEmail = (value = '') => String(value).trim().toLowerCase();
const sanitizeName = (value = '') => String(value).trim();
const isStrongPassword = (value = '') => typeof value === 'string' && value.length >= 8;

const buildUserPayload = (user) => ({ id: user.id, name: user.name, email: user.email });

const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) return res.status(401).json({ error: 'Authentication required.' });

  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Session expired or invalid.' });
  }
};

db.exec('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", 'data:'],
      objectSrc: ["'none'"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", 'http://localhost:3001', 'http://localhost:5173'],
    },
  },
}));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  const dbCheck = db.prepare('SELECT 1 AS ok').get();
  res.json({ ok: !!dbCheck, database: 'better-sqlite3' });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(req.user.id);

  if (!user) return res.status(404).json({ error: 'User not found.' });

  res.json({ user: buildUserPayload(user) });
});

app.post('/api/auth/signup', (req, res) => {
  const name = sanitizeName(req.body.name);
  const email = sanitizeEmail(req.body.email);
  const password = String(req.body.password ?? '');

  if (!name || !email || !password || !isStrongPassword(password)) {
    return res.status(400).json({ error: 'Please provide a name, valid email and password of 8+ characters.' });
  }

  try {
    const passwordHash = bcrypt.hashSync(password, 12);
    const result = db.prepare('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)').run(name, email, passwordHash);
    const user = { id: result.lastInsertRowid, name, email };
    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '7d' });
    res.status(201).json({ token, user: buildUserPayload(user) });
  } catch {
    res.status(409).json({ error: 'An account with that email already exists.' });
  }
});

app.post('/api/auth/signin', (req, res) => {
  const email = sanitizeEmail(req.body.email);
  const password = String(req.body.password ?? '');
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Email or password is incorrect.' });
  }

  const safeUser = buildUserPayload(user);
  res.json({ token: jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '7d' }), user: safeUser });
});

app.listen(3001, () => console.log('Lewedi API listening on http://localhost:3001'))

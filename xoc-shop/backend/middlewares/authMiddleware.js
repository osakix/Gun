// backend/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

// DON'T import itself here

export function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
}

export function adminOnly(req, res, next) {
  if (!req.user?.isAdmin) return res.sendStatus(403);
  next();
}
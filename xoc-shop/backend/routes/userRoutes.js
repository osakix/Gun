import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Middleware auth
function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(403);
  }
}

// Update profile
router.put('/profile', auth, async (req, res) => {
  const { name, bio, avatar, links, theme } = req.body;
  const user = await User.findById(req.user.id);
  if (!user) return res.sendStatus(404);
  user.name = name;
  user.bio = bio;
  user.avatar = avatar;
  user.links = links;
  user.theme = theme;
  await user.save();
  res.json({ message: 'Profile updated' });
});

// Get own profile
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

export default router;
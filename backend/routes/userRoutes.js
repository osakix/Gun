// backend/routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';
import { auth, adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin: Set drop rates for a specific user
router.post('/set-drop-rate/:userId', auth, adminOnly, async (req, res) => {
  const { userId } = req.params;
  const { common, rare, legendary } = req.body;
  
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  user.dropRates = { common, rare, legendary };
  await user.save();
  res.json({ message: 'Drop rate updated' });
});

// Top-up wallet
router.post('/topup', auth, async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);
  user.wallet += amount;
  await user.save();
  res.json({ message: 'Wallet topped up', wallet: user.wallet });
});

// Get current user info
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

router.get('/history', auth, async (req, res) => {
  const user = await User.findById(req.user.id).populate('rollHistory.itemId');
  const history = user.rollHistory.map(entry => ({
    name: entry.itemId.name,
    rarity: entry.itemId.rarity,
    image: entry.itemId.image,
    date: entry.date
  }));
  res.json(history);
});
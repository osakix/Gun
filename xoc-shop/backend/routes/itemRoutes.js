// backend/routes/itemRoutes.js
import express from 'express';
import { auth } from '../middlewares/authMiddleware.js';
import Item from '../models/Item.js';
import User from '../models/User.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Roll for a random item based on user drop rates
router.post('/roll', auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  if (user.wallet < 10) return res.status(400).json({ message: 'Insufficient funds' });
  user.wallet -= 10;
  
  const { common, rare, legendary } = user.dropRates;
  const roll = Math.random() * 100;
  
  let rarity = 'common';
  if (roll < legendary) rarity = 'legendary';
  else if (roll < legendary + rare) rarity = 'rare';
  
  const items = await Item.find({ rarity });
  const randomItem = items[Math.floor(Math.random() * items.length)];
  
  // เพิ่มตรงนี้เพื่อเก็บประวัติ
  user.rollHistory.push({ itemId: randomItem._id });
  
  await user.save();
  res.json({ item: randomItem, rarity });
});

export default router;
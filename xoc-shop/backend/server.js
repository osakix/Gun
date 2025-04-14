import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Public profile access
import User from './models/User.js';
app.get('/u/:username', async (req, res) => {
  const user = await User.findOne({ username: req.params.username }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => console.log('Server running'));
});
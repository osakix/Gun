// backend/models/Item.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: String,
  rarity: { type: String, enum: ['common', 'rare', 'legendary'] },
  image: String,
  price: Number
});

export default mongoose.model('Item', itemSchema);
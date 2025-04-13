// backend/utils/seedItems.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from '../models/Item.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const items = [
  { name: 'AK-47 | Redline', rarity: 'rare', image: 'ak_redline.jpg', price: 100 },
  { name: 'AWP | Dragon Lore', rarity: 'legendary', image: 'awp_dragon.jpg', price: 1000 },
  { name: 'P250 | Sand Dune', rarity: 'common', image: 'p250_sand.jpg', price: 5 },
  { name: 'Glock-18 | Fade', rarity: 'rare', image: 'glock_fade.jpg', price: 120 },
];

await Item.deleteMany();
await Item.insertMany(items);
console.log('Items seeded!');
process.exit();
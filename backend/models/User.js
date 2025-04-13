// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  wallet: { type: Number, default: 0 },
  dropRates: {
    common: { type: Number, default: 70 },
    rare: { type: Number, default: 25 },
    legendary: { type: Number, default: 5 }
  }
});

export default mongoose.model('User', userSchema);

rollHistory: [{
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  date: { type: Date, default: Date.now }
}]
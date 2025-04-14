import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  label: String,
  url: String
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  bio: String,
  avatar: String,
  links: [linkSchema],
  theme: { type: String, enum: ['light', 'dark', 'system'], default: 'system' }
});

export default mongoose.model('User', userSchema);
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nama_user: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  profilePhoto: { type: String },
  createdAt: { type: Date, default: Date.now }
  
});

const User = mongoose.model('User', userSchema);

export default User;

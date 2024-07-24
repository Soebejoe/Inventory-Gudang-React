import mongoose from 'mongoose';

// URL koneksi MongoDB Anda
const mongoURI = 'mongodb+srv://inventoryreact:inventoryreact@inventoryreact.yuxe47g.mongodb.net/db_inventory?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;

import mongoose from 'mongoose';

// console.log('MONGO_URI from env:', process.env.MONGO_URI);
// console.log('Attempting to connect to MongoDB...');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

export default connectDB;

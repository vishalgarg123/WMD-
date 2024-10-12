
import mongoose from 'mongoose';

const connectDB = async () => {
  mongoose.set('strictQuery', false); // Disable strict query mode (optional)

  try {
    await mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://localhost:27017/WMD');
    console.log('MongoDB connected successfully');
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
import mongoose from 'mongoose';

const MONGODB = process.env.MONGODB;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB);
  } catch (error) {
    console.error('ERROR AL CONECTARSE A MONGODB:', error);
    throw error;
  }
};

export default connectToDatabase;

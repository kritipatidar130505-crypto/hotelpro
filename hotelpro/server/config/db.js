const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotelpro', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning]: Could not connect to local/remote MongoDB instance: ${error.message}`);
    console.warn(`[Fallback Mode]: In-memory storage/mock data handler will be used for testing without live Mongo.`);
  }
};

module.exports = connectDB;

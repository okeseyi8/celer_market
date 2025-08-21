import mongoose from "mongoose";

async function connectDB(retries = 5, delay = 5000): Promise<void> {
  const uri = process.env.DATABASE_URI;

  if (!uri) {
    throw new Error("DATABASE_URI is not set in environment variables");
  }

  const attemptConnection = async (retriesLeft: number): Promise<void> => {
    try {
      const conn = await mongoose.connect(uri, {
        dbName: "CelerCluster0",
        serverSelectionTimeoutMS: 5000, // fail fast if Mongo isn't reachable
      });
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err: any) {
      console.error(`❌ MongoDB connection error: ${err.message}`);
      if (retriesLeft > 0) {
        console.log(`🔄 Retrying in ${delay / 1000}s... (${retriesLeft} attempts left)`);
        setTimeout(() => attemptConnection(retriesLeft - 1), delay);
      } else {
        console.error("❌ Could not connect to MongoDB after multiple attempts.");
        // Notice: no process.exit() here — app keeps running
      }
    }
  };

  await attemptConnection(retries);
}

export default connectDB;


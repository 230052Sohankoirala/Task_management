import mongoose from "mongoose";

export async function connectDB() {
  mongoose.set("strictQuery", true);

  const db = await mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME,
    serverSelectionTimeoutMS: 10000,
  });

  console.log(`MongoDB connected: ${db.connection.host}/${db.connection.name}`);
  return db;
}

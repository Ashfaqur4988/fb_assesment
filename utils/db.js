import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`db connection done: ${conn.connection.host}`);
  } catch (error) {
    console.log("error connecting to db", error);
    process.exit(1);
  }
};

import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL, options);
    console.log(`Connection to database on Worker Process: ${process.pid}`);
  } catch (error) {
    console.log(
      `Connection Error: ${error.stack} on worker process: ${process.pid}`,
    );
    process.exit(1);
  }
};

export default connectDB;

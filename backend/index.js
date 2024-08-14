import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

process.on("unhandledRejection", (error) => {
  console.error(`unhandledRejection: ${error.message}`);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

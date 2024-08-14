import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";

dotenv.config();
app.use(cors());

const app = express();
const PORT = process.env.PORT || 4000;

connectDB();

const rootRouter = router;

process.on("unhandledRejection", (error) => {
  console.error(`unhandledRejection: ${error.message}`);
  process.exit(1);
});

app.get("/", (req, res) => {
    res.send("Hello Fucking world");
  });
  
app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






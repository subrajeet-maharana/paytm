import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

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

import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";

const app = express();
app.use(cors());

dotenv.config();
const port = process.env.PORT;

const rootRouter = router;

app.get("/", (req, res) => {
  res.send("Hello Fucking world");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/v1", rootRouter);

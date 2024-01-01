import "dotenv/config";
import express from "express";
import connectDB from "./utils/db.js";

const app = express();

//middleware
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello world");
});
const port = process.env.PORT;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server listening at port ${port}`);
  });
});

import "dotenv/config";
import express from "express";
import connectDB from "./utils/db.js";
import authRoute from "./routes/auth.js";
const app = express();

//middleware
app.use(express.json());
app.use("/api", authRoute);
app.get("/", (req, res) => {
  res.send("hello worl");
});
const port = process.env.PORT;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server listening at port ${port}`);
  });
});

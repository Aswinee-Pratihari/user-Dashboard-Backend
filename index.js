import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import authRoute from "./routes/auth.js";
import contactRoute from "./routes/contact.js";
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use("/api", authRoute);
app.use("/api/contacts", contactRoute);
app.get("/", (req, res) => {
  res.send("hello worl");
});
const port = process.env.PORT;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server listening at port ${port}`);
  });
});

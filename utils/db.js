import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const instance = await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log(`DB Connected ${instance.connection.host}`);
  } catch (error) {
    console.log("connection Error", error);
    process.exit(1);
  }
};

export default connectDB;

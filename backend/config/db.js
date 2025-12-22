import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // optional recommended options depending on mongoose version
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

<<<<<<< HEAD
export default connectDB;
=======
export default connectDB;
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3

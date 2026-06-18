import mongoose from "mongoose";

/**
 * Function to connect the application to MongoDB using Mongoose
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // If connection is successful, log success message
    console.log("Connected to MongoDB");
  } catch (error) {
    // If connection fails, log the error for debugging
    console.log(error);

    // Exit the process with failure code (prevents app from running without DB)
    process.exit(1);
  }
};

export default connectDB;
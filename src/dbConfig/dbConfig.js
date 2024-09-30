import mongoose from "mongoose";

export async function connect() {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected to MongoDB !!!");
    return;
  }
  try {
    // console.log("DB connection string", process.env.MONGO_URI)
    mongoose.connect(process.env.MONGO_URI);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDB connection Error, Please make sure DB is up and running",
        error
      );
      console.error('Cause:', error.cause);
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong while connecting to the DB");
  }
}

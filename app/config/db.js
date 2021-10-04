const mongoose = require("mongoose");
const logger = require("../helpers/pino.js");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    logger.info("MongoDB Connection Success 👍");
  } catch (error) {
    logger.info("MongoDB Connection Failed 💥");
    process.exit(1);
  }
};

module.exports = connectDB;
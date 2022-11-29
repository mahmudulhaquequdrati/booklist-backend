const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://password_is_mahmud:mahmud@cluster0.7rnigrv.mongodb.net/bookSelf"
    );
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;

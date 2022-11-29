const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // follow the above example to create a schema for your books
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },

  author: {
    type: String,
  },
  publisher: {
    type: String,
  },
  isbn: {
    type: String,
  },
  avail: {
    type: String,
    required: true,
  },
  who: {
    type: String,
  },
  due: {
    type: String,
  },
});

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);

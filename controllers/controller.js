let inventory = require("../Inventory");
const Book = require("../models/Book");

//get all books and awail status
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (req.query.avail != undefined) {
      booksByAvaiStatus(req, res);
    } else {
      const info = books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          avail: book.avail,
          isbn: book.isbn,
        };
      });
      res.status(200).send({ message: info });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//get book by id
const booksById = async (req, res) => {
  // get a book by id from mongodb
  try {
    const book = await Book.findOne({
      id: req.params.id,
    });
    if (book) {
      res.status(200).send({ message: book });
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
//get books by avail status
const booksByAvaiStatus = async (req, res) => {
  try {
    const books = await Book.find({ avail: req.query.avail });
    if (books) {
      const info = books.map((book) => {
        return {
          id: book.id,
          title: book.title,
          author: book.author,
          avail: book.avail,
          isbn: book.isbn,
        };
      });
      res.status(200).send({ message: info });
    } else {
      res.status(404).send({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const createBook = async (req, res) => {
  // create a new book in mongodb
  try {
    let book = req.body;
    if (book.avail !== undefined && book.id) {
      let bookExists = await Book.findOne({ id: req.body?.id });
      if (bookExists) {
        // res.status(403).send({ message: req.body.id + " id is already exist" });
        throw new Error(req.body.id + " id is already exist");
      } else {
        let newBook = new Book(book);
        let result = await newBook.save();
        res.status(201).send({ message: result });
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
//update books by id
const updateById = async (req, res) => {
  try {
    const book = await Book.findOne({
      id: req.params.id,
    });
    if (book) {
      const filter = { id: req.params.id };
      let update = req.body;
      if (update.avail === "true") {
        update.who = "";
        update.due = "";
      }
      console.log(update);
      const result = await Book.findOneAndUpdate(filter, update, {
        new: true,
      });
      res.status(200).send({ message: result });
    } else {
      res.status(403).send({ message: "Book " + req.params.id + " not found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//delete by id

const deleteById = async (req, res) => {
  try {
    const book = await Book.findOne({ id: req.params.id });
    if (book) {
      await Book.deleteOne({ id: req.params.id });
      res.status(200).send({ message: "Book " + req.params.id + " deleted" });
    } else {
      res
        .status(204)
        .send({ message: "Book " + req.params.id + " not deleted" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
module.exports = {
  getBooks,
  booksById,
  booksByAvaiStatus,
  createBook,
  updateById,
  deleteById,
};

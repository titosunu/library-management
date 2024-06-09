// controller books layer handle req & res
const express = require("express");
const {
  getAllBooks,
  getBooksByCode,
  createBooks,
  deleteBook,
  editBookByCode,
} = require("./book.service");

const router = express.Router();

// get list books
router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get detail book
router.get("/:code", async (req, res) => {
  try {
    const codeBook = req.params.code;
    const books = await getBooksByCode(codeBook);
    res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// create new book
router.post("/", async (req, res) => {
  try {
    const newBook = req.body;
    const books = await createBooks(newBook);
    res.send({
      data: books,
      message: "create new book success!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// delete book by code
router.delete("/:code", async (req, res) => {
  try {
    const codeBook = req.params.code;
    await deleteBook(codeBook);
    res.send("book deleted!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// edit book by code
router.patch("/:code", async (req, res) => {
  try {
    const codeBook = req.params.code;
    const newBook = req.body;
    const books = await editBookByCode(codeBook, newBook);
    res.send({
      data: books,
      message: "book success edited!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

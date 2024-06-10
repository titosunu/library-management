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

//schema swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         author:
 *           type: string
 *         stock:
 *           type: integer
 *         borrowedBy:
 *           type: object
 */
// end schema swagger

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management
 */

// get list books
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all Books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       400:
 *         description: Book is empty
 */
router.get("/", async (req, res) => {
  try {
    const books = await getAllBooks();
    res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end get list books

// get detail book
/**
 * @swagger
 * /books/{code}:
 *   get:
 *     summary: Get a book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     responses:
 *       200:
 *         description: The details of the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book not found
 */
router.get("/:code", async (req, res) => {
  try {
    const codeBook = req.params.code;
    const books = await getBooksByCode(codeBook);
    res.send(books);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end get detail book

// create new book
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 */
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
// end create new book

// delete book by code
/**
 * @swagger
 * /books/{code}:
 *   delete:
 *     summary: Delete a book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book not found
 */
router.delete("/:code", async (req, res) => {
  try {
    const codeBook = req.params.code;
    await deleteBook(codeBook);
    res.send("book deleted!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end delete book by code

// edit book by code
/**
 * @swagger
 * /books/{code}:
 *   patch:
 *     summary: Edit a book by code
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The book code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book edited successfully
 *       400:
 *         description: Bad request
 */
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
// end edit book by code

module.exports = router;

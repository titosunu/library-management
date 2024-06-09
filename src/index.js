const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// CRUD Books
const booksController = require("./book/book.controller");
app.use("/books", booksController);

// CRUD Members
const membersController = require("./member/member.controller");
app.use("/members", membersController);

// Borrow books
const borrowController = require("./borrow/borrow.controller");
app.use("/borrow", borrowController);

// Return Books
const returnController = require("./return/return.controller");
app.use("/return", returnController);

app.listen(PORT, () => {
  console.log(`Express Api running on PORT http://localhost:${PORT}/`);
});

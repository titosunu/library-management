const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// CRUD Books
app.get("/books", async (req, res) => {
  const books = await prisma.book.findMany();
  res.send(books);
});

app.get("/books/:code", async (req, res) => {
  const codeBook = req.params.code;

  const books = await prisma.book.findUnique({
    where: {
      code: codeBook,
    },
  });

  if (!books) {
    return res.status(400).send("book not found!");
  }

  res.send(books);
});

app.post("/books", async (req, res) => {
  const newBook = req.body;

  const books = await prisma.book.create({
    data: {
      title: newBook.title,
      author: newBook.author,
    },
  });

  res.send({
    data: books,
    message: "create new book success!",
  });
});

app.delete("/books/:code", async (req, res) => {
  const codeBook = req.params.code;

  await prisma.book.delete({
    where: {
      code: codeBook,
    },
  });

  res.send("book deleted!");
});

app.patch("/books/:code", async (req, res) => {
  const codeBook = req.params.code;
  const newBook = req.body;

  const books = await prisma.book.update({
    where: {
      code: codeBook,
    },
    data: {
      title: newBook.title,
      author: newBook.author,
      borrowedBy: newBook.borrowedBy,
    },
  });

  res.send({
    data: books,
    message: "book success edited!",
  });
});
// End CRUD Books

// CRUD Member
// ...
// EndCRUD Member

app.listen(PORT, () => {
  console.log(`Express Api running on PORT http://localhost:${PORT}/`);
});

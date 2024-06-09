// repository books layer handle to communication with db
const prisma = require("../db");

const findBooks = async () => {
  const books = await prisma.book.findMany();
  return books;
};

const findBooksByCode = async (codeBook) => {
  const books = await prisma.book.findUnique({
    where: {
      code: codeBook,
    },
  });
  return books;
};

const findBooksByName = async (title) => {
  const nameBook = await prisma.book.findFirst({
    where: {
      title,
    },
  });
  return nameBook;
};

const insertBook = async (newBook) => {
  const books = await prisma.book.create({
    data: {
      title: newBook.title,
      author: newBook.author,
    },
  });
  return books;
};

const deleteBookByCode = async (codeBook) => {
  await prisma.book.delete({
    where: {
      code: codeBook,
    },
  });
};

const editBook = async (codebook, newBook) => {
  const books = await prisma.book.update({
    where: {
      code: codebook,
    },
    data: {
      title: newBook.title,
      author: newBook.author,
      borrowedBy: newBook.borrowedBy,
    },
  });
  return books;
};

module.exports = {
  findBooks,
  findBooksByCode,
  findBooksByName,
  insertBook,
  deleteBookByCode,
  editBook,
};

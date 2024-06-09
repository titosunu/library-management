// service books layer handle logic
const {
  findBooks,
  findBooksByCode,
  deleteBookByCode,
  insertBook,
  editBook,
  findBooksByName,
} = require("./book.repository");

const getAllBooks = async () => {
  const books = await findBooks();
  if (!books) {
    throw new Error("books is empty");
  }
  return books;
};

const getBooksByCode = async (codeBook) => {
  const books = await findBooksByCode(codeBook);
  if (!books) {
    throw Error("book not found");
  }
  return books;
};

const createBooks = async (newBook) => {
  const bookByName = await findBooksByName(newBook.title);
  if (bookByName) {
    throw new Error("title already use");
  }
  const books = await insertBook(newBook);
  return books;
};

const deleteBook = async (codeBook) => {
  await getBooksByCode(codeBook);
  await deleteBookByCode(codeBook);
};

const editBookByCode = async (codeBook, newBook) => {
  await getBooksByCode(codeBook);
  const books = await editBook(codeBook, newBook);
  return books;
};

module.exports = {
  getAllBooks,
  getBooksByCode,
  createBooks,
  deleteBook,
  editBookByCode,
};

// service borrow layer handle logic
const {
  findMemberByCode,
  findBookByCode,
  countBorrowBook,
  insertBorrowedBook,
  updateBook,
} = require("./borrow.repository");

const borrowBook = async (memberId, bookId) => {
  const member = await findMemberByCode(memberId);
  const book = await findBookByCode(bookId);
  const borrowedBooksCount = await countBorrowBook(memberId);

  if (!member || !book) {
    throw new Error("Member or Book not found");
  }

  if (member.penaltyEndDate && new Date() < new Date(member.penaltyEndDate)) {
    throw new Error("Member is currently penalized");
  }

  if (borrowedBooksCount >= 2) {
    throw new Error("Member cannot borrow more than 2 books");
  }

  if (book.quantity <= 0) {
    throw new Error("Book is not available");
  }

  await insertBorrowedBook(memberId, bookId);
  await updateBook(bookId);
};

module.exports = {
  borrowBook,
};

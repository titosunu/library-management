// repository borrow layer handle to communication with db
const prisma = require("../db");

const findMemberByCode = async (memberId) => {
  const memberByCode = await prisma.member.findUnique({
    where: { code: memberId },
  });
  return memberByCode;
};

const findBookByCode = async (bookId) => {
  const bookByCode = await prisma.book.findUnique({ where: { code: bookId } });
  return bookByCode;
};

const countBorrowBook = async (memberId) => {
  const borrowedBooksCount = await prisma.borrowedBook.count({
    where: { memberId },
  });
  return borrowedBooksCount;
};

const insertBorrowedBook = async (memberId, bookId) => {
  await prisma.borrowedBook.create({
    data: {
      memberId,
      bookId,
    },
  });
};

const updateBook = async (bookId) => {
  await prisma.book.update({
    where: { code: bookId },
    data: { stock: { decrement: 1 } },
  });
};

module.exports = {
  findMemberByCode,
  findBookByCode,
  countBorrowBook,
  insertBorrowedBook,
  updateBook,
};

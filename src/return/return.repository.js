// repository return layer handle to communication with db
const prisma = require("../db");

const findMemberByCode = async (memberId) => {
  const member = await prisma.member.findUnique({
    where: { code: memberId },
  });
  return member;
};

const findBookByCode = async (bookId) => {
  const book = await prisma.book.findUnique({ where: { code: bookId } });
  return book;
};

const findBorrowedBook = async (memberId, bookId) => {
  const borrowedBook = await prisma.borrowedBook.findFirst({
    where: {
      memberId,
      bookId,
    },
  });
  return borrowedBook;
};

const daysBorrowedBook = async (borrowedBook) => {
  (new Date() - new Date(borrowedBook.borrowedAt)) / (1000 * 60 * 60 * 24);
};

const deleteBorrowedBook = async (borrowedBook) => {
  await prisma.borrowedBook.delete({
    where: { id: borrowedBook.id },
  });
};

const updateBook = async (bookId) => {
  await prisma.book.update({
    where: { code: bookId },
    data: { stock: { increment: 1 } },
  });
};

module.exports = {
  findMemberByCode,
  findBookByCode,
  findBorrowedBook,
  deleteBorrowedBook,
  updateBook,
  daysBorrowedBook,
};

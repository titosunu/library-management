// service return layer handle logic
const {
  findMemberByCode,
  findBookByCode,
  findBorrowedBook,
  deleteBorrowedBook,
  updateBook,
  daysBorrowedBook,
} = require("./return.repository");

const memberReturnBook = async (memberId, bookId) => {
  const member = await findMemberByCode(memberId);
  const book = await findBookByCode(bookId);
  const borrowedBook = await findBorrowedBook(memberId, bookId);
  const daysBorrowed = daysBorrowedBook(borrowedBook);

  if (!member || !book) {
    throw new Error("Member or Book not found");
  }

  if (!borrowedBook) {
    throw new Error("This book was not borrowed by the member");
  }

  if (daysBorrowed > 7) {
    await prisma.member.update({
      where: { code: memberId },
      data: {
        penaltyEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    });
  }

  await deleteBorrowedBook(borrowedBook);
  await updateBook(bookId);
};

module.exports = {
  memberReturnBook,
};

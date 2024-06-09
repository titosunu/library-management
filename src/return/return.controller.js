const express = require("express");
const prisma = require("../db");

const router = express();

router.post("/", async (req, res) => {
  const { memberId, bookId } = req.body;

  try {
    const member = await prisma.member.findUnique({
      where: { code: memberId },
    });
    const book = await prisma.book.findUnique({ where: { code: bookId } });

    if (!member || !book) {
      return res.status(404).send("Member or Book not found");
    }

    const borrowedBook = await prisma.borrowedBook.findFirst({
      where: {
        memberId,
        bookId,
      },
    });

    if (!borrowedBook) {
      return res.status(400).send("This book was not borrowed by the member");
    }

    const daysBorrowed =
      (new Date() - new Date(borrowedBook.borrowedAt)) / (1000 * 60 * 60 * 24);
    if (daysBorrowed > 7) {
      await prisma.member.update({
        where: { code: memberId },
        data: {
          penaltyEndDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        }, // Penalti 3 hari
      });
    }

    await prisma.borrowedBook.delete({
      where: { id: borrowedBook.id },
    });

    await prisma.book.update({
      where: { code: bookId },
      data: { stock: { increment: 1 } },
    });

    res.status(200).send("Book returned successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

const express = require("express");
const prisma = require("../db");

const router = express.Router();

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

    if (member.penaltyEndDate && new Date() < new Date(member.penaltyEndDate)) {
      return res.status(400).send("Member is currently penalized");
    }

    const borrowedBooksCount = await prisma.borrowedBook.count({
      where: { memberId },
    });

    if (borrowedBooksCount >= 2) {
      return res.status(400).send("Member cannot borrow more than 2 books");
    }

    if (book.quantity <= 0) {
      return res.status(400).send("Book is not available");
    }

    await prisma.borrowedBook.create({
      data: {
        memberId,
        bookId,
      },
    });

    await prisma.book.update({
      where: { code: bookId },
      data: { stock: { decrement: 1 } },
    });

    res.status(200).send("Book borrowed successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;

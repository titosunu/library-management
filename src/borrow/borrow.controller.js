// controller borrow layer handle req & res
const express = require("express");
const { borrowBook } = require("./borrow.service");

const router = express.Router();

// schema swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     BorrowedBook:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         memberId:
 *           type: string
 *         bookId:
 *           type: string
 *         borrowedAt:
 *           type: string
 *           format: date-time
 *         member:
 *           $ref: '#/components/schemas/Member'
 *         book:
 *           $ref: '#/components/schemas/Book'
 */
// end schema swagger

// borrow
/**
 * @swagger
 * /borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrow]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               memberId:
 *                 type: string
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully borrowed the book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BorrowedBook'
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  const { memberId, bookId } = req.body;
  try {
    const borrow = await borrowBook(memberId, bookId);
    res.send({
      data: borrow,
      message: "Book borrowed successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//end borrow

module.exports = router;

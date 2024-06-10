// controller return layer handle req & res
const express = require("express");
const { memberReturnBook } = require("./return.service");

const router = express();

/**
 * @swagger
 * tags:
 *   name: Return
 *   description: Endpoints for returning books
 */

// return
/**
 * @swagger
 * /return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Return]
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
 *         description: Successfully returned the book
 *       500:
 *         description: Internal server error
 */
router.post("/", async (req, res) => {
  const { memberId, bookId } = req.body;

  try {
    const memberReturn = await memberReturnBook(memberId, bookId);
    res.send({
      data: memberReturn,
      message: "Book returned successfully",
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
// end return

module.exports = router;

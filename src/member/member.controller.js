// layer handle req & res members
const express = require("express");
const {
  getMemberByCode,
  createMember,
  getMembers,
  deleteMember,
  editMember,
} = require("./member.service");

const router = express.Router();

// schema swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         code:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         borrowedBooks:
 *           type: array
 *           items:
 *             type: string
 *             format: uuid
 *         penaltyEndDate:
 *           type: string
 *           format: date
 */
// end schema swagger

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Member management
 */

// get list members
/**
 * @swagger
 * /members:
 *   get:
 *     summary: Get all Members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Member'
 */
router.get("/", async (req, res) => {
  try {
    const members = await getMembers();
    res.send(members);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end list members

// get detail member
/**
 * @swagger
 * /members/{code}:
 *   get:
 *     summary: Get a member by code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *     responses:
 *       200:
 *         description: The details of the member
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Member'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Member not found
 */
router.get("/:code", async (req, res) => {
  try {
    const codeMember = req.params.code;
    const member = await getMemberByCode(codeMember);
    res.send(member);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end get detail member

// create new member
/**
 * @swagger
 * /members:
 *   post:
 *     summary: Create a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", async (req, res) => {
  try {
    const newMember = req.body;
    const member = await createMember(newMember);
    res.send({
      data: member,
      message: "create new member success!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end create new member

// delete member by code
/**
 * @swagger
 * /members/{code}:
 *   delete:
 *     summary: Delete a member by code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *     responses:
 *       200:
 *         description: Member deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete("/:code", async (req, res) => {
  try {
    const codeMember = req.params.code;
    await deleteMember(codeMember);
    res.send("member deleted!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end delete member by code

// edit member by code
/**
 * @swagger
 * /members/{code}:
 *   patch:
 *     summary: Edit a member by code
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The member code
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member edited successfully
 *       400:
 *         description: Bad request
 */
router.patch("/:code", async (req, res) => {
  try {
    const codeMember = req.params.code;
    const newMember = req.body;
    const members = await editMember(codeMember, newMember);
    res.send({
      data: members,
      message: "member success edited!",
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// end edit member by code

module.exports = router;

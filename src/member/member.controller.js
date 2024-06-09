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

// get list members
router.get("/", async (req, res) => {
  try {
    const members = await getMembers();
    res.send(members);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// get detail member
router.get("/:code", async (req, res) => {
  try {
    const codeMember = req.params.code;
    const member = await getMemberByCode(codeMember);
    res.send(member);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// create new member
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

// delete member by code
router.delete("/:code", async (req, res) => {
  try {
    const codeMember = req.params.code;
    await deleteMember(codeMember);
    res.send("member deleted!");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// edit member by code
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

module.exports = router;

// service members layer handle logic
const { member } = require("../db");
const {
  findMemberByCode,
  findMembers,
  findMemberByName,
  insertMember,
  deleteMemberByCode,
  editMemberByCode,
} = require("./member.repository");

const getMembers = async () => {
  const members = await findMembers();
  if (!members) {
    throw new Error("members is empty!");
  }
  return members;
};

const getMemberByCode = async (codeMember) => {
  const members = await findMemberByCode(codeMember);
  if (!members) {
    throw new Error("member not found");
  }
  return members;
};

const createMember = async (newMember) => {
  const memberByName = await findMemberByName(newMember.name);
  if (memberByName) {
    throw new Error("name already use");
  }
  const member = await insertMember(newMember);
  return member;
};

const deleteMember = async (codeMember) => {
  await getMemberByCode(codeMember);
  await deleteMemberByCode(codeMember);
};

const editMember = async (codeMember, newMember) => {
  await getMemberByCode(codeMember);
  const members = await editMemberByCode(codeMember, newMember);
  return members;
};

module.exports = {
  getMemberByCode,
  getMembers,
  createMember,
  deleteMember,
  editMember,
};

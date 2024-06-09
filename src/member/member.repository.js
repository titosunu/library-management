// repository members layer handle to communication with db
const prisma = require("../db");

const findMembers = async () => {
  const members = await prisma.member.findMany({
    include: {
      borrowedBooks: true,
    },
  });
  return members;
};

const findMemberByCode = async (codeMember) => {
  const member = await prisma.member.findUnique({
    where: {
      code: codeMember,
    },
  });
  return member;
};

const findMemberByName = async (name) => {
  const nameMember = await prisma.member.findFirst({
    where: {
      name,
    },
  });
  return nameMember;
};

const insertMember = async (newMember) => {
  const member = await prisma.member.create({
    data: {
      name: newMember.name,
    },
  });
  return member;
};

const deleteMemberByCode = async (codeMember) => {
  await prisma.member.delete({
    where: {
      code: codeMember,
    },
  });
};

const editMemberByCode = async (codeMember, newMember) => {
  const members = await prisma.member.update({
    where: {
      code: codeMember,
    },
    data: {
      name: newMember.name,
    },
  });
  return members;
};

module.exports = {
  findMemberByCode,
  findMemberByName,
  findMembers,
  insertMember,
  deleteMemberByCode,
  editMemberByCode,
};

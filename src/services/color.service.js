const prisma = require("../../prisma/client");

async function getColors() {
  return prisma.color.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

async function createColor(data) {
  return prisma.color.create({
    data: {
      name: data.name,
      hex: data.hex,
    },
  });
}

async function deleteColor(id) {
  return prisma.color.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  getColors,
  createColor,
  deleteColor,
};

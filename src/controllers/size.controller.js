const prisma = require("../../prisma/client");

async function getSizes(req, res) {
  try {
    const sizes = await prisma.size.findMany({
      orderBy: {
        name: "asc",
      },
    });

    res.json(sizes);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function createSize(req, res) {
  try {
    const { name } = req.body;

    const size = await prisma.size.create({
      data: {
        name,
      },
    });

    res.json(size);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

async function deleteSize(req, res) {
  try {
    await prisma.size.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

module.exports = {
  getSizes,
  createSize,
  deleteSize,
};

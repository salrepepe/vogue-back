const prisma = require("../../prisma/client");
const slugify = require("slugify");

async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        sortOrder: "asc",
      },
    });

    const map = {};

    categories.forEach((category) => {
      map[category.id] = {
        ...category,
        children: [],
      };
    });

    const tree = [];

    categories.forEach((category) => {
      if (category.parentId) {
        map[category.parentId]?.children.push(map[category.id]);
      } else {
        tree.push(map[category.id]);
      }
    });

    res.json(tree);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function createCategory(req, res) {
  try {
    const { name, parentId } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
      locale: "ru",
    });

    let fullPath = slug;

    if (parentId) {
      const parent = await prisma.category.findUnique({
        where: {
          id: parentId,
        },
      });

      fullPath = `${parent.fullPath}/${slug}`;
    }

    const category = await prisma.category.create({
      data: {
        name,

        slug,

        fullPath,

        parentId: parentId || null,
      },
    });

    res.json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteCategory(req, res) {
  try {
    await prisma.category.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
};

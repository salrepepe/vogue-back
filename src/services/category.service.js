const prisma = require("../../prisma/client");
const slugify = require("slugify");

async function getCategoryTree() {
  const categories = await prisma.category.findMany({
    where: {
      parentId: null,
    },

    include: {
      children: {
        include: {
          children: true,
        },
      },
    },

    orderBy: {
      sortOrder: "asc",
    },
  });

  return categories;
}

async function resolveCategoryByPath(path) {
  return prisma.category.findUnique({
    where: {
      fullPath: path,
    },

    include: {
      children: true,
    },
  });
}
async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      sortOrder: "asc",
    },

    select: {
      id: true,
      name: true,
      fullPath: true,
      parentId: true,
    },
  });
}

async function createCategory(data) {
  const { name, parentId } = data;

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

    if (!parent) {
      throw new Error("Parent category not found");
    }

    fullPath = `${parent.fullPath}/${slug}`;
  }

  console.log({
    name,
    slug,
    parentId,
    fullPath,
  });

  return prisma.category.create({
    data: {
      name,

      slug,

      fullPath,

      parentId: parentId || null,
    },
  });
}

async function deleteCategory(id) {
  return prisma.category.delete({
    where: {
      id,
    },
  });
}

module.exports = {
  getCategoryTree,
  resolveCategoryByPath,

  getAllCategories,
  createCategory,
  deleteCategory,
};

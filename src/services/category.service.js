const prisma = require("../../prisma/client");
const buildCategoryTree = require("../utils/buildCategoryTree");

/**
 * Получить дерево категорий (для меню)
 */
async function getCategoryTree() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return buildCategoryTree(categories);
}

/**
 * Резолв категории по fullPath
 * /men/shoes/sneakers
 */
async function resolveCategoryByPath(path) {
  const normalized = `/${path}`.replace(/\/+/g, "/");

  return prisma.category.findUnique({
    where: { fullPath: normalized },
  });
}

/**
 * Получить все дочерние категории (включая себя)
 */
async function getCategorySubtreeIds(categoryId) {
  const all = await prisma.category.findMany();

  const collect = (id) => {
    const children = all.filter((c) => c.parentId === id);
    return children.flatMap((c) => [c.id, ...collect(c.id)]);
  };

  return [categoryId, ...collect(categoryId)];
}

module.exports = {
  getCategoryTree,
  resolveCategoryByPath,
  getCategorySubtreeIds,
};
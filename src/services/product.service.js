const prisma = require("../../prisma/client");
const { resolveCategoryByPath, getCategorySubtreeIds } =
  require("./category.service");

/**
 * Получить товары каталога (Lamoda-style engine)
 */
async function getProducts(query) {
 const {
  path,
  category,
  brand,
  page = 1,
  limit = 20,
  sort,
  search,
} = query;

console.time("1");
await prisma.product.findMany({ take: 20 });
console.timeEnd("1");

console.time("2");
await prisma.product.findMany({ take: 20 });
console.timeEnd("2");

console.time("3");
await prisma.product.findMany({ take: 20 });
console.timeEnd("3");

const categoryPath = path || category;

  const skip = (Number(page) - 1) * Number(limit);

  let categoryIds = [];

  /**
   * 1. CATEGORY TREE FILTER (/men/shoes)
   */
 if (categoryPath) {
    const category = await resolveCategoryByPath(categoryPath);

    if (category) {
        categoryIds = await getCategorySubtreeIds(category.id);
    }
}

  /**
   * 2. WHERE BUILDER
   */
  const where = {
    isActive: true,

    ...(brand && {
      brand: { slug: brand },
    }),

    ...(categoryIds.length > 0 && {
      categoryId: { in: categoryIds },
    }),

    ...(search && {
      name: {
        contains: search,
        mode: "insensitive",
      },
    }),
  };

  /**
   * 3. SORTING
   */
  const orderBy =
    sort === "price_asc"
      ? { price: "asc" }
      : sort === "price_desc"
      ? { price: "desc" }
      : { createdAt: "desc" };

  /**
   * 4. QUERY
   */
  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy,
      include: {
        category: true,
        brand: true,
      },
    }),

    prisma.product.count({ where }),
  ]);

  return {
    data: products,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
  };
}

/**
 * ONE PRODUCT
 */
async function getProductById(id) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      brand: true,
      variants: true,
    },
  });
}

module.exports = {
  getProducts,
  getProductById,
};
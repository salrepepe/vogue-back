const prisma = require("../prisma/client");

async function run() {
  const products = await prisma.product.findMany({
    include: { category: true },
  });

  for (const p of products) {
    if (!p.category) continue;

    let gender = null;
    let cleanCategorySlug = p.category.slug;

    // 🧠 разбор старых slug
    if (p.category.slug.startsWith("men-")) {
      gender = "MEN";
      cleanCategorySlug = p.category.slug.replace("men-", "");
    }

    if (p.category.slug.startsWith("women-")) {
      gender = "WOMEN";
      cleanCategorySlug = p.category.slug.replace("women-", "");
    }

    if (p.category.slug.startsWith("kids-")) {
      gender = "KIDS";
      cleanCategorySlug = p.category.slug.replace("kids-", "");
    }

    // 🔎 ищем новую категорию
    const newCategory = await prisma.category.findUnique({
      where: { slug: cleanCategorySlug },
    });

    if (!newCategory) continue;

    await prisma.product.update({
      where: { id: p.id },
      data: {
        gender,
        categoryId: newCategory.id,
      },
    });
  }

  console.log("✅ MIGRATION DONE");
}

run();
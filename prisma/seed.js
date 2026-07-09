const prisma = require("./client");

const { seedBrands } = require("./seeds/brands.seed");
const { seedCategories } = require("./seeds/categories.seed");
const { seedProducts } = require("./seeds/products.seed");


async function main() {

  console.log("🌱 DATABASE SEED START");


  // 1. Очистка данных
  console.log("🧹 Cleaning database...");

  // await prisma.productVariant.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.brand.deleteMany();


  console.log("✅ Database cleaned");



  // 2. Brands

  await seedBrands();



  // 3. Categories

  await seedCategories();



  // 4. Products

  await seedProducts();



  console.log("🔥 DATABASE SEED COMPLETE");

}



main()
  .catch((error) => {

    console.error(
      "❌ SEED ERROR:",
      error
    );

    process.exit(1);

  })
  .finally(async () => {

    await prisma.$disconnect();

  });
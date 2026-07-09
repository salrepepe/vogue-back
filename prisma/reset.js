const prisma = require("../prisma/client");

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();

  console.log("DB RESET DONE");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
const prisma = require("../prisma/client");

async function main() {
  console.log("🌱 Seeding...");

  // BRANDS

  const nike = await prisma.brand.create({
    data: {
      name: "Nike",
      slug: "nike",
    },
  });

  const adidas = await prisma.brand.create({
    data: {
      name: "Adidas",
      slug: "adidas",
    },
  });

  const gucci = await prisma.brand.create({
    data: {
      name: "Gucci",
      slug: "gucci",
    },
  });

  // CATEGORY

  const men = await prisma.category.create({
    data: {
      name: "Men",
      slug: "men",
      fullPath: "men",
    },
  });

  const shoes = await prisma.category.create({
    data: {
      name: "Shoes",
      slug: "shoes",
      fullPath: "men/shoes",
      parentId: men.id,
    },
  });

  const sneakers = await prisma.category.create({
    data: {
      name: "Sneakers",
      slug: "sneakers",
      fullPath: "men/shoes/sneakers",
      parentId: shoes.id,
    },
  });

  // PRODUCTS

  const product1 = await prisma.product.create({
    data: {
      name: "Nike Air Max",

      slug: "nike-air-max",

      price: 180,

      images: ["https://example.com/nike.jpg"],

      brandId: nike.id,

      categoryId: shoes.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Gucci Sneakers",

      slug: "gucci-sneakers",

      price: 650,

      images: ["https://example.com/gucci.jpg"],

      brandId: gucci.id,

      categoryId: shoes.id,
    },
  });

  // VARIANTS

  await prisma.productVariant.create({
    data: {
      productId: product1.id,

      size: "42",

      color: "Black",
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: product1.id,

      size: "43",

      color: "White",
    },
  });

  await prisma.productVariant.create({
    data: {
      productId: product2.id,

      size: "41",

      color: "Green",
    },
  });

  // ORDER TEST

  await prisma.order.create({
    data: {
      name: "Muhammed",

      phone: "+996555000000",

      address: "Bishkek",

      total: 830,

      status: "NEW",

      items: {
        create: [
          {
            productId: product1.id,

            quantity: 1,

            price: 180,
          },

          {
            productId: product2.id,

            quantity: 1,

            price: 650,
          },
        ],
      },
    },
  });

  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });

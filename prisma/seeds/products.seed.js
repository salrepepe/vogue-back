const prisma = require("../../prisma/client");


const productImages = [
  "https://images.unsplash.com/photo-1485968579580-b6d095142e6e",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  "https://images.unsplash.com/photo-1445205170230-053b83016050",
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
  "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
];


const sizes = [
  "S",
  "M",
  "L",
  "XL",
];


const shoesSizes = [
  "40",
  "41",
  "42",
  "43",
  "44",
];


async function createVariants(productId, isShoes = false) {

  const list = isShoes ? shoesSizes : sizes;


  for (const size of list) {

    await prisma.productVariant.create({
      data: {
        productId,
        size,
        color: "Black",
        stock: Math.floor(Math.random() * 20) + 1,
        sku: `${productId}-${size}`,
      },
    });

  }

}



function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}



async function seedProducts() {

  console.log("🌱 Products seed start");


  const categories = await prisma.category.findMany();

  const brands = await prisma.brand.findMany();


  const products = [];


  for (const brand of brands) {


    for (let i = 1; i <= 15; i++) {


      const category =
        categories[
          Math.floor(
            Math.random() * categories.length
          )
        ];


      products.push({

        name:
          `${brand.name} Premium Collection ${i}`,

        slug:
          slugify(
            `${brand.slug}-premium-${i}`
          ),


        description:
          `${brand.name} эксклюзивная коллекция. Премиальное качество, натуральные материалы и современный дизайн.`,


        price:
          Math.floor(
            Math.random() * 5000
          ) + 500,


        oldPrice:
          i % 3 === 0
            ? Math.floor(Math.random() * 7000) + 6000
            : null,


        isSale:
          i % 3 === 0,


        images:[
          productImages[
            i % productImages.length
          ],
        ],


        categoryId:
          category.id,


        brandId:
          brand.id,


        isActive:true,


        isFeatured:
          i % 5 === 0,

      });

    }

  }



  for (const item of products) {


    const product =
      await prisma.product.create({
        data:item,
      });



    await createVariants(
      product.id,
      item.name.includes("Shoes")
    );

  }


  console.log(
    `✅ Products created: ${products.length}`
  );

}


module.exports = {
  seedProducts,
};
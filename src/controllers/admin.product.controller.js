const prisma = require("../../prisma/client");
const slugify = require("slugify");
const { deleteImage } = require("../services/upload.service");

async function getAdminProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        brand: true,
        category: true,
        variants: true,
      },
    });

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Cannot get products",
    });
  }
}

async function createProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      images,
      brandId,
      categoryId,
      sizes = [],
      colors = [],
    } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
      locale: "ru",
    });

    const product = await prisma.product.create({
      data: {
        name,

        slug,

        description,

        price: Number(price),

        images,

        brandId,

        categoryId,

        sizes: {
          create: sizes.map((sizeId) => ({
            size: {
              connect: {
                id: sizeId,
              },
            },
          })),
        },

        colors: {
          create: colors.map((item) => ({
            color: {
              connect: {
                id: item.colorId,
              },
            },

            images: item.images || [],
          })),
        },
      },

      include: {
        sizes: {
          include: {
            size: true,
          },
        },

        colors: {
          include: {
            color: true,
          },
        },
      },
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      images,
      brandId,
      categoryId,
      sizes = [],
      colors = [],
    } = req.body;

    const slug = slugify(name, {
      lower: true,
      strict: true,
      locale: "ru",
    });

    const product = await prisma.$transaction(async (tx) => {
      // Удаляем старые размеры
      await tx.productSize.deleteMany({
        where: {
          productId: id,
        },
      });

      // Удаляем старые цвета
      await tx.productColor.deleteMany({
        where: {
          productId: id,
        },
      });

      // Обновляем товар и создаём новые связи
      return await tx.product.update({
        where: {
          id,
        },

        data: {
          name,
          slug,
          description,
          price: Number(price),
          images,
          brandId,
          categoryId,

          sizes: {
            create: sizes.map((sizeId) => ({
              size: {
                connect: {
                  id: sizeId,
                },
              },
            })),
          },

          colors: {
            create: colors.map((item) => ({
              color: {
                connect: {
                  id: item.colorId,
                },
              },
              images: item.images || [],
            })),
          },
        },

        include: {
          brand: true,
          category: true,

          sizes: {
            include: {
              size: true,
            },
          },

          colors: {
            include: {
              color: true,
            },
          },
        },
      });
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // удаляем все изображения из R2
    for (const image of product.images) {
      await deleteImage(image);
    }

    // удаляем товар (варианты удалятся каскадом, если настроен onDelete: Cascade)
    await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getAdminProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};

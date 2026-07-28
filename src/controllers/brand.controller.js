const prisma = require("../../prisma/client");
const { deleteImage } = require("../services/upload.service");
const slugify = require("slugify");

async function getBrands(req, res) {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(brands);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function createBrand(req, res) {
  try {
    const { name, logo, banner } = req.body;
    const slug = slugify(name, {
      lower: true,
      strict: true,
      locale: "ru",
    });

    const exists = await prisma.brand.findUnique({
      where: {
        slug,
      },
    });

    if (exists) {
      return res.status(400).json({
        message: "Бренд уже существует",
      });
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        logo,
        slug,
        banner,
      },
    });

    res.json(brand);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteBrand(req, res) {
  try {
    const brand = await prisma.brand.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found",
      });
    }

    if (brand.logo) {
      await deleteImage(brand.logo);
    }

    await prisma.brand.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  getBrands,
  createBrand,
  deleteBrand,
};

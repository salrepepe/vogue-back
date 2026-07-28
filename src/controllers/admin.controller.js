const prisma = require("../../prisma/client");

async function getDashboard(req, res) {
  try {
    const [orders, products, brands, revenue] = await Promise.all([
      prisma.order.count(),

      prisma.product.count(),

      prisma.brand.count(),

      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),
    ]);

    res.json({
      orders,

      products,

      brands,

      revenue: revenue._sum.total || 0,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Dashboard error",
    });
  }
}

module.exports = {
  getDashboard,
};

const { sendStatusToTelegram } = require("../services/telegram.service");
async function getOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Cannot get orders",
    });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: req.params.id,
      },

      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
        },
      },
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Cannot get order",
    });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const { status } = req.body;

    const order = await prisma.order.update({
      where: {
        id: req.params.id,
      },

      data: {
        status,
      },
    });

    await sendStatusToTelegram(order);

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Cannot update status",
    });
  }
}

module.exports = {
  getOrders,
  getOrderById,
  updateOrderStatus,
};

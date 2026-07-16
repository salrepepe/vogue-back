const prisma = require("../../prisma/client");
const { sendOrderToTelegram } = require("./telegram.service");

async function createOrder({ sessionId, name, phone, address }) {
  const cart = await prisma.cart.findUnique({
    where: {
      sessionId,
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

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart empty");
  }

  const total = cart.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const order = await prisma.order.create({
    data: {
      name,
      phone,
      address,
      total,

      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
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

  console.log(JSON.stringify(order, null, 2));

  await prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  await sendOrderToTelegram(order);

  return order;
}

module.exports = {
  createOrder,
};

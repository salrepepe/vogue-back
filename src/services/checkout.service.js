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

          sizeId: item.sizeId,
          colorId: item.colorId,

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
          size: true,
          color: true,
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
async function createDirectOrder({
  productId,
  sizeId,
  colorId,
  quantity,
  name,
  phone,
  address,
}) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const order = await prisma.order.create({
    data: {
      name,
      phone,
      address,

      total: product.price * quantity,

      items: {
        create: {
          productId: product.id,

          sizeId,
          colorId,

          quantity,
          price: product.price,
        },
      },
    },

    include: {
      items: {
        include: {
          product: true,
          size: true,
          color: true,
        },
      },
    },
  });

  await sendOrderToTelegram(order);

  return order;
}

module.exports = {
  createOrder,
  createDirectOrder,
};

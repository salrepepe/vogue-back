const prisma = require("../../prisma/client");

/**
 * Получить или создать корзину
 */
async function getOrCreateCart(sessionId) {
  let cart = await prisma.cart.findUnique({
    where: {
      sessionId,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        sessionId,
      },
    });
  }

  return cart;
}

/**
 * Получить товары корзины
 */
async function getCart(sessionId) {
  const cart = await getOrCreateCart(sessionId);

  const items = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: {
        include: {
          brand: true,
        },
      },
      variant: true,
    },
  });

  const total = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const count = items.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return {
    items,
    total,
    count,
  };
}

/**
 * Добавить товар в корзину
 */
async function addToCart({ sessionId, productId, variantId, quantity = 1 }) {
  const cart = await getOrCreateCart(sessionId);

  const existing = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId,
      variantId,
    },
  });

  if (existing) {
    return prisma.cartItem.update({
      where: {
        id: existing.id,
      },
      data: {
        quantity: existing.quantity + quantity,
      },
    });
  }

  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      variantId,
      quantity,
    },
  });
}
// Изменить количество товара
async function updateCartItem(itemId, quantity) {
  return prisma.cartItem.update({
    where: {
      id: itemId,
    },
    data: {
      quantity,
    },
  });
}

// Удалить товар из корзины
async function removeCartItem(itemId) {
  return prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });
}

// Очистить корзину
async function clearCart(sessionId) {
  const cart = await prisma.cart.findUnique({
    where: {
      sessionId,
    },
  });

  if (!cart) return;

  return prisma.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });
}

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};

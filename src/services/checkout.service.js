const prisma = require("../../prisma/client");
const { sendTelegramMessage } = require("./telegram.service");

async function checkout(sessionId) {
  const cart = await prisma.cart.findFirst({
    where: { sessionId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const order = await prisma.order.create({
    data: {
      sessionId,
      total,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
    include: { items: true },
  });

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  let text = `🛒 <b>НОВЫЙ ЗАКАЗ</b>\n\n`;

  cart.items.forEach((item) => {
    text += `• ${item.product.name} x${item.quantity} = $${item.product.price * item.quantity}\n`;
  });

  text += `\n💰 <b>ИТОГО:</b> $${total}`;
  text += `\n🆔 Session: ${sessionId}`;

  await sendTelegramMessage(text);

  return order;
}

module.exports = { checkout };
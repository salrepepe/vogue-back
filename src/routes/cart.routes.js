const router = require("express").Router();
const prisma = require("../../prisma/client");

// добавить в корзину
router.post("/", async (req, res) => {
  try {
    const { sessionId, productId, quantity } = req.body;

    let cart = await prisma.cart.findFirst({
      where: { sessionId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { sessionId },
      });
    }

    const item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// получить корзину
router.get("/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;

    const cart = await prisma.cart.findFirst({
      where: { sessionId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
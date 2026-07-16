const cartService = require("../services/cart.services");

async function getCart(req, res) {
  try {
    const sessionId = req.headers["x-cart-session"];

    const cart = await cartService.getCart(sessionId);

    res.json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Cart error",
    });
  }
}

async function addToCart(req, res) {
  try {
    const sessionId = req.headers["x-cart-session"];

    const item = await cartService.addToCart({
      sessionId,
      ...req.body,
    });

    res.json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Add cart error",
    });
  }
}

async function updateItem(req, res) {
  try {
    const item = await cartService.updateCartItem(
      req.params.itemId,
      Number(req.body.quantity),
    );

    res.json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Update cart error",
    });
  }
}

async function removeItem(req, res) {
  try {
    const item = await cartService.removeCartItem(req.params.itemId);

    res.json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Remove cart error",
    });
  }
}

async function clear(req, res) {
  try {
    const sessionId = req.headers["x-cart-session"];

    await cartService.clearCart(sessionId);

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Clear cart error",
    });
  }
}

module.exports = {
  getCart,
  addToCart,
  updateItem,
  removeItem,
  clear,
};

const checkoutService = require("../services/checkout.service");

async function checkout(req, res) {
  try {
    const sessionId = req.headers["x-cart-session"];

    const order = await checkoutService.createOrder({
      sessionId,

      ...req.body,
    });

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
}

async function directCheckout(req, res) {
  try {
    const order = await checkoutService.createDirectOrder({
      ...req.body,
    });

    res.json(order);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = {
  checkout,
  directCheckout,
};

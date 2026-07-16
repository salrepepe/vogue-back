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

module.exports = {
  checkout,
};

const router = require("express").Router();
const { checkout } = require("../services/checkout.service");

router.post("/", async (req, res) => {
  try {
    const { sessionId } = req.body;

    const order = await checkout(sessionId);

    res.json({
      success: true,
      order,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
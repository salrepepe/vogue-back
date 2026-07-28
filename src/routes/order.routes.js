const router = require("express").Router();

const {
  getOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/order.controller");

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

module.exports = router;

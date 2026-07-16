const router = require("express").Router();

const {
  getCart,
  addToCart,
  updateItem,
  removeItem,
  clear,
} = require("../controllers/cart.controller");

router.get("/", getCart);

router.post("/", addToCart);

router.patch("/:itemId", updateItem);

router.delete("/:itemId", removeItem);

router.delete("/", clear);

module.exports = router;

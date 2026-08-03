const router = require("express").Router();

const {
  checkout,
  directCheckout,
} = require("../controllers/checkout.controller");

router.post("/", checkout);
router.post("/direct", directCheckout);

module.exports = router;

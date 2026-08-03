const router = require("express").Router();

const { getBrands, getBrandById } = require("../controllers/brand.controller");

router.get("/", getBrands);
router.get("/:id", getBrandById);

module.exports = router;

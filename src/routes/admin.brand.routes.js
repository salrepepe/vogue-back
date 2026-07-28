const router = require("express").Router();

const authMiddleware = require("../middleware/auth.middleware");

const { createBrand, deleteBrand } = require("../controllers/brand.controller");

router.use(authMiddleware);

router.post("/", createBrand);

router.delete("/:id", deleteBrand);

module.exports = router;

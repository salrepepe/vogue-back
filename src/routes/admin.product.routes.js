const router = require("express").Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getAdminProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/admin.product.controller");

router.use(authMiddleware);

router.get("/", getAdminProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

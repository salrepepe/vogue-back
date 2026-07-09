const router = require("express").Router();
const productService = require("../services/product.service");

/**
 * GET PRODUCTS (MAIN CATALOG)
 * /api/products?path=men/shoes&page=1&limit=20&sort=price_desc
 */
router.get("/", async (req, res) => {
  try {
    const result = await productService.getProducts(req.query);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * GET ONE PRODUCT
 */
router.get("/:id", async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
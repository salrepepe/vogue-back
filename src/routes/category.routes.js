const router = require("express").Router();
const categoryService = require("../services/category.service");

/**
 * TREE (для меню)
 * GET /api/categories/tree
 */
router.get("/tree", async (req, res) => {
  try {
    const tree = await categoryService.getCategoryTree();
    res.json(tree);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

/**
 * RESOLVE (самый важный endpoint)
 * GET /api/categories/resolve?path=men/shoes/sneakers
 */
router.get("/resolve", async (req, res) => {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({ error: "path is required" });
    }

    const category = await categoryService.resolveCategoryByPath(path);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
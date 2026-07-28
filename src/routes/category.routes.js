const router = require("express").Router();
const categoryService = require("../services/category.service");

router.get("/tree", async (req, res) => {
  try {
    const tree = await categoryService.getCategoryTree();

    res.json(tree);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.json(categories);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);

    res.json(category);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);

    res.json({
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});


router.get("/resolve", async (req, res) => {
  try {
    const { path } = req.query;

    if (!path) {
      return res.status(400).json({
        error: "path is required",
      });
    }

    const category = await categoryService.resolveCategoryByPath(path);

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    res.json(category);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

module.exports = router;

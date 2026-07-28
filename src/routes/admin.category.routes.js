const router = require("express").Router();

const authMiddleware = require("../middleware/auth.middleware");

const categoryService = require("../services/category.service");

router.use(authMiddleware);

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

module.exports = router;

const router = require("express").Router();

const authMiddleware = require("../middleware/auth.middleware");

const colorService = require("../services/color.service");

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const colors = await colorService.getColors();

    res.json(colors);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const color = await colorService.createColor(req.body);

    res.json(color);
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await colorService.deleteColor(req.params.id);

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

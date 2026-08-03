const router = require("express").Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getSizes,
  createSize,
  deleteSize,
} = require("../controllers/size.controller");

router.use(authMiddleware);

router.get("/", getSizes);

router.post("/", createSize);

router.delete("/:id", deleteSize);

module.exports = router;

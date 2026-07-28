const router = require("express").Router();

const uploadMiddleware = require("../middleware/upload.middleware");
const authMiddleware = require("../middleware/auth.middleware");

const { upload } = require("../controllers/upload.controller");

router.use(authMiddleware);

router.post("/", uploadMiddleware.single("image"), upload);

module.exports = router;

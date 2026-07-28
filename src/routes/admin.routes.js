const router = require("express").Router();

const authMiddleware = require("../middleware/auth.middleware");

const { getDashboard } = require("../controllers/admin.controller");

router.use(authMiddleware);

router.get("/dashboard", getDashboard);

module.exports = router;

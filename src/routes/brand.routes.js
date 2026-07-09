const router = require("express").Router();
const prisma = require("../../prisma/client");

router.get("/", async (req, res) => {
  const brands = await prisma.brand.findMany();
  res.json(brands);
});

module.exports = router;
const express = require("express");
const cors = require("cors");
const prisma = require("../prisma/client.js");
const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const compression = require("compression");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(compression());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.get("/test-db", async (req, res) => {
  await prisma.$queryRaw`SELECT 1`;

  res.json({
    ok: true,
  });
});

app.use("/api/products", productRoutes);
app.use("/api/checkout", require("./routes/checkout.routes"));
app.use("/api/cart", require("./routes/cart.routes"));
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

module.exports = app;

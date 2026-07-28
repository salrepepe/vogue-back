const express = require("express");
const cors = require("cors");
const prisma = require("../prisma/client.js");
const compression = require("compression");
const bcrypt = require("bcrypt");
const path = require("path");

const productRoutes = require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const brandRoutes = require("./routes/brand.routes");
const authRoutes = require("./routes/auth.routes");
const uploadRoutes = require("./routes/upload.routes");

const adminBrandRoutes = require("./routes/admin.brand.routes.js");
const adminCategoryRoutes = require("./routes/admin.category.routes.js");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://vogue-front.vercel.app"],
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

// ===== ADMIN =====

app.use("/api/admin", require("./routes/admin.routes"));

app.use("/api/admin/orders", require("./routes/order.routes"));

app.use("/api/admin/products", require("./routes/admin.product.routes"));

app.use("/api/admin/brands", adminBrandRoutes);

app.use("/api/admin/categories", adminCategoryRoutes);

app.use("/api/admin/upload", uploadRoutes);

// ===== AUTH =====

app.use("/api/auth", authRoutes);

// ===== PUBLIC =====

app.use("/api/products", productRoutes);

app.use("/api/checkout", require("./routes/checkout.routes"));

app.use("/api/cart", require("./routes/cart.routes"));

app.use("/api/categories", categoryRoutes);

app.use("/api/brands", brandRoutes);

module.exports = app;

require("dotenv").config();

const app = require("./app");
const prisma = require("../prisma/client");

const PORT = process.env.PORT || 5500;

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
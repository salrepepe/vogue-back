const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function login(req, res) {
  const { login, password } = req.body;

  if (login !== process.env.ADMIN_LOGIN) {
    return res.status(401).json({
      message: "Неверный логин",
    });
  }

  const valid = await bcrypt.compare(
    password,
    process.env.ADMIN_PASSWORD_HASH
  );

  if (!valid) {
    return res.status(401).json({
      message: "Неверный пароль",
    });
  }

  const token = jwt.sign(
    {
      role: "admin",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({
    token,
  });
}

module.exports = {
  login,
};
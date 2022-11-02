const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Não autorizado. Por favor faça login");
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // Get User id from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Utilizador não encontrado");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Não autorizado. Por favor faça login");
  }
});

module.exports = protect;

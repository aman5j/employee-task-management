const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const {
  registerValidation,
  loginValidation,
} = require("../middleware/validationMiddleware");

const router = express.Router();

// POST /api/auth/register
router.post("/register", registerValidation, register);

// POST /api/auth/login
router.post("/login", loginValidation, login);

module.exports = router;
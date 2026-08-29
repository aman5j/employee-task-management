const express = require("express");

const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get(
  "/stats",
  protect,
  requireRole("admin"),
  getDashboardStats
);

module.exports = router;
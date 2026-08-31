const express = require("express");

const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const {
  createEmployeeValidation,
} = require("../middleware/validationMiddleware");

const router = express.Router();

// Create employee
router.post(
  "/",
  protect,
  requireRole("admin"),
  createEmployeeValidation,
  createEmployee
);

// Get all employees
router.get(
  "/",
  protect,
  requireRole("admin"),
  getEmployees
);

// Update employee
router.put(
  "/:id",
  protect,
  requireRole("admin"),
  updateEmployee
);

// Delete employee
router.delete(
  "/:id",
  protect,
  requireRole("admin"),
  deleteEmployee
);

module.exports = router;
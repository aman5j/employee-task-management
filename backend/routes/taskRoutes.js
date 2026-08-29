const express = require("express");

const protect = require("../middleware/authMiddleware");
const requireRole = require("../middleware/roleMiddleware");

const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  assignTask,
  getMyTasks,
  updateMyTaskStatus,
} = require("../controllers/taskController");

const {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
  updateTaskStatusValidation,
} = require("../middleware/validationMiddleware");

const router = express.Router();

// ==========================================
// ADMIN ROUTES
// ==========================================

// Create task
router.post(
  "/",
  protect,
  requireRole("admin"),
  createTaskValidation,
  createTask
);

// Get all tasks
router.get(
  "/",
  protect,
  requireRole("admin"),
  getAllTasks
);

// Update task
router.put(
  "/:id",
  protect,
  requireRole("admin"),
  updateTaskValidation,
  updateTask
);

// Delete task
router.delete(
  "/:id",
  protect,
  requireRole("admin"),
  taskIdValidation,
  deleteTask
);

// Reassign task
router.patch(
  "/:id/assign",
  protect,
  requireRole("admin"),
  taskIdValidation,
  updateTaskValidation,
  assignTask
);

// ==========================================
// EMPLOYEE ROUTES
// ==========================================

// Get my tasks
router.get(
  "/my",
  protect,
  requireRole("employee"),
  getMyTasks
);

// Update my task status
router.patch(
  "/:id/status",
  protect,
  requireRole("employee"),
  updateTaskStatusValidation,
  updateMyTaskStatus
);

module.exports = router;
const { body, param } = require("express-validator");

// ==========================================
// AUTH VALIDATION
// ==========================================

const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("role")
    .optional()
    .isIn(["admin", "employee"])
    .withMessage("Role must be either admin or employee"),
];

const loginValidation = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];

// ==========================================
// EMPLOYEE VALIDATION
// ==========================================

const createEmployeeValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// ==========================================
// TASK VALIDATION
// ==========================================

const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Task description is required"),

  body("assignedTo")
    .notEmpty()
    .withMessage("assignedTo is required")
    .isMongoId()
    .withMessage("assignedTo must be a valid MongoDB ObjectId"),

  body("dueDate")
    .notEmpty()
    .withMessage("Due date is required")
    .isISO8601()
    .withMessage("dueDate must be a valid date"),

  body("status")
    .optional()
    .isIn(["Todo", "In Progress", "Completed"])
    .withMessage(
      "Status must be Todo, In Progress, or Completed"
    ),
];

const updateTaskValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Task title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim(),

  body("assignedTo")
    .optional()
    .isMongoId()
    .withMessage("assignedTo must be a valid MongoDB ObjectId"),

  body("status")
    .optional()
    .isIn(["Todo", "In Progress", "Completed"])
    .withMessage(
      "Status must be Todo, In Progress, or Completed"
    ),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage("dueDate must be a valid date"),
];

const taskIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),
];

const updateTaskStatusValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),

  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["Todo", "In Progress", "Completed"])
    .withMessage(
      "Status must be Todo, In Progress, or Completed"
    ),
];

module.exports = {
  registerValidation,
  loginValidation,
  createEmployeeValidation,
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation,
  updateTaskStatusValidation,
};
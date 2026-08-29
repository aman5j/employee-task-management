const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/User");

// ==========================================
// CREATE EMPLOYEE
// ==========================================

const createEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    const existingEmployee = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmployee) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "employee",
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: {
        employee: {
          id: employee._id,
          name: employee.name,
          email: employee.email,
          role: employee.role,
          createdAt: employee.createdAt,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET ALL EMPLOYEES
// ==========================================

const getEmployees = async (req, res, next) => {
  try {
    const employees = await User.find({
      role: "employee",
    })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Employees fetched successfully",
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
};
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

    const { name, email, password, department, designation } = req.body;

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
      department: department || "",
      designation: designation || "",
      role: "employee",
    });

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: {
        employee: {
          _id: employee._id,
          id: employee._id,
          name: employee.name,
          email: employee.email,
          department: employee.department || "",
          designation: employee.designation || "",
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

// UPDATE EMPLOYEE
const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, department, designation } = req.body;

    const employee = await User.findOne({ _id: id, role: "employee" });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    if (email && email.toLowerCase() !== employee.email) {
      const emailExists = await User.findOne({ email: email.toLowerCase() });
      if (emailExists) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use by another account",
        });
      }
      employee.email = email.toLowerCase();
    }

    if (name) employee.name = name;
    if (department !== undefined) employee.department = department;
    if (designation !== undefined) employee.designation = designation;
    if (password) employee.password = await bcrypt.hash(password, 10);

    await employee.save();

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: {
        _id: employee._id,
        id: employee._id,
        name: employee.name,
        email: employee.email,
        department: employee.department || "",
        designation: employee.designation || "",
        role: employee.role,
        createdAt: employee.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await User.findOneAndDelete({ _id: id, role: "employee" });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
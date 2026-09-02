// const { validationResult } = require("express-validator");

// const Task = require("../models/Task");
// const User = require("../models/User");

// // ==========================================
// // CREATE TASK
// // ADMIN ONLY
// // ==========================================

// const createTask = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         data: errors.array(),
//       });
//     }

//     const {
//       title,
//       description,
//       assignedTo,
//       dueDate,
//       status,
//       priority
//     } = req.body;

//     const employee = await User.findOne({
//       _id: assignedTo,
//       role: "employee",
//     });

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//         data: null,
//       });
//     }

//     const task = await Task.create({
//       title,
//       description,
//       assignedTo,
//       assignedBy: req.user._id,
//       dueDate,
//       priority: priority || "medium",
//       status: status || "Todo",
//     });

//     const populatedTask = await Task.findById(task._id)
//       .populate("assignedTo", "name email")
//       .populate("assignedBy", "name email");

//     return res.status(201).json({
//       success: true,
//       message: "Task created successfully",
//       data: populatedTask,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==========================================
// // GET ALL TASKS
// // ADMIN ONLY
// // ==========================================

// const getAllTasks = async (req, res, next) => {
//   try {
//     const tasks = await Task.find()
//       .populate("assignedTo", "name email")
//       .populate("assignedBy", "name email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "Tasks fetched successfully",
//       data: tasks,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==========================================
// // UPDATE TASK
// // ADMIN ONLY
// // ==========================================

// const updateTask = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         data: errors.array(),
//       });
//     }

//     const { id } = req.params;

//     const task = await Task.findById(id);

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: "Task not found",
//         data: null,
//       });
//     }

//     const {
//       title,
//       description,
//       assignedTo,
//       dueDate,
//       status,
//       priority
//     } = req.body;

//     if (assignedTo) {
//       const employee = await User.findOne({
//         _id: assignedTo,
//         role: "employee",
//       });

//       if (!employee) {
//         return res.status(404).json({
//           success: false,
//           message: "Employee not found",
//           data: null,
//         });
//       }

//       task.assignedTo = assignedTo;
//     }

//     if (title !== undefined) {
//       task.title = title;
//     }

//     if (description !== undefined) {
//       task.description = description;
//     }

//     if (dueDate !== undefined) {
//       task.dueDate = dueDate;
//     }

//     if (status !== undefined) {
//       task.status = status;
//     }

//     if (priority !== undefined) task.priority = priority;

//     await task.save();

//     const updatedTask = await Task.findById(task._id)
//       .populate("assignedTo", "name email")
//       .populate("assignedBy", "name email");

//     return res.status(200).json({
//       success: true,
//       message: "Task updated successfully",
//       data: updatedTask,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==========================================
// // DELETE TASK
// // ADMIN ONLY
// // ==========================================

// const deleteTask = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         data: errors.array(),
//       });
//     }

//     const { id } = req.params;

//     const task = await Task.findById(id);

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: "Task not found",
//         data: null,
//       });
//     }

//     await task.deleteOne();

//     return res.status(200).json({
//       success: true,
//       message: "Task deleted successfully",
//       data: null,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==========================================
// // REASSIGN TASK
// // ADMIN ONLY
// // ==========================================

// const assignTask = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         data: errors.array(),
//       });
//     }

//     const { id } = req.params;
//     const { assignedTo } = req.body;

//     if (!assignedTo) {
//       return res.status(400).json({
//         success: false,
//         message: "assignedTo is required",
//         data: null,
//       });
//     }

//     const employee = await User.findOne({
//       _id: assignedTo,
//       role: "employee",
//     });

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         message: "Employee not found",
//         data: null,
//       });
//     }

//     const task = await Task.findById(id);

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: "Task not found",
//         data: null,
//       });
//     }

//     task.assignedTo = assignedTo;

//     await task.save();

//     const updatedTask = await Task.findById(task._id)
//       .populate("assignedTo", "name email")
//       .populate("assignedBy", "name email");

//     return res.status(200).json({
//       success: true,
//       message: "Task reassigned successfully",
//       data: updatedTask,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==========================================
// // GET MY TASKS
// // EMPLOYEE ONLY
// // ==========================================

// const getMyTasks = async (req, res, next) => {
//   try {
//     const tasks = await Task.find({
//       assignedTo: req.user._id,
//     })
//       .populate("assignedBy", "name email")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "Your tasks fetched successfully",
//       data: tasks,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ==========================================
// // UPDATE MY TASK STATUS
// // EMPLOYEE ONLY
// // ==========================================

// const updateMyTaskStatus = async (req, res, next) => {
//   try {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         success: false,
//         message: "Validation failed",
//         data: errors.array(),
//       });
//     }

//     const { id } = req.params;
//     const { status } = req.body;

//     const task = await Task.findById(id);

//     if (!task) {
//       return res.status(404).json({
//         success: false,
//         message: "Task not found",
//         data: null,
//       });
//     }

//     // IMPORTANT:
//     // Employee can update ONLY their own task.
//     if (task.assignedTo.toString() !== req.user._id.toString()) {
//       return res.status(403).json({
//         success: false,
//         message: "You can only update your own assigned tasks",
//         data: null,
//       });
//     }

//     task.status = status;

//     await task.save();

//     const updatedTask = await Task.findById(task._id)
//       .populate("assignedBy", "name email");

//     return res.status(200).json({
//       success: true,
//       message: "Task status updated successfully",
//       data: updatedTask,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = {
//   createTask,
//   getAllTasks,
//   updateTask,
//   deleteTask,
//   assignTask,
//   getMyTasks,
//   updateMyTaskStatus,
// };

const { validationResult } = require("express-validator");
const Task = require("../models/Task");
const User = require("../models/User");

// ==========================================
// CREATE TASK (ADMIN)
// ==========================================
const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg || "Validation failed",
        data: errors.array(),
      });
    }

    const { title, description, assignedTo, dueDate, status, priority } = req.body;

    const employee = await User.findOne({ _id: assignedTo, role: "employee" });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
        data: null,
      });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      assignedBy: req.user._id,
      dueDate,
      priority: priority || "medium",
      status: status || "todo",
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: populatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET ALL TASKS (ADMIN)
// ==========================================
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE TASK (ADMIN)
// ==========================================
const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array()[0].msg || "Validation failed",
        data: errors.array(),
      });
    }

    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        data: null,
      });
    }

    const { title, description, assignedTo, dueDate, status, priority } = req.body;

    if (assignedTo) {
      const employee = await User.findOne({ _id: assignedTo, role: "employee" });
      if (!employee) {
        return res.status(404).json({
          success: false,
          message: "Employee not found",
          data: null,
        });
      }
      task.assignedTo = assignedTo;
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;

    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE TASK (ADMIN)
// ==========================================
const deleteTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: errors.array(),
      });
    }

    const { id } = req.params;
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
        data: null,
      });
    }

    await task.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// REASSIGN TASK (ADMIN)
// ==========================================
const assignTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: errors.array(),
      });
    }

    const { id } = req.params;
    const { assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({
        success: false,
        message: "assignedTo is required",
      });
    }

    const employee = await User.findOne({ _id: assignedTo, role: "employee" });
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    task.assignedTo = assignedTo;
    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Task reassigned successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET MY TASKS (EMPLOYEE)
// ==========================================
const getMyTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id })
      .populate("assignedBy", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Your tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE MY TASK STATUS (EMPLOYEE)
// ==========================================
const updateMyTaskStatus = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        data: errors.array(),
      });
    }

    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You can only update your own assigned tasks",
      });
    }

    task.status = status;
    await task.save();

    const updatedTask = await Task.findById(task._id)
      .populate("assignedBy", "name email");

    return res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  assignTask,
  getMyTasks,
  updateMyTaskStatus,
};
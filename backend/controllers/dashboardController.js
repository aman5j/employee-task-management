const Task = require("../models/Task");
const User = require("../models/User");

const getDashboardStats = async (req, res, next) => {
  try {
    const totalEmployees = await User.countDocuments({
      role: "employee",
    });

    const totalTasks = await Task.countDocuments();

    const todoTasks = await Task.countDocuments({
      status: "Todo",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const completedTasks = await Task.countDocuments({
      status: "Completed",
    });

    return res.status(200).json({
      success: true,
      message: "Dashboard statistics fetched successfully",
      data: {
        totalEmployees,
        totalTasks,
        tasksByStatus: {
          Todo: todoTasks,
          "In Progress": inProgressTasks,
          Completed: completedTasks,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
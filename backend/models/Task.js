// const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: [true, "Task title is required"],
//       trim: true,
//       minlength: [3, "Task title must be at least 3 characters"],
//       maxlength: [100, "Task title cannot exceed 100 characters"],
//     },

//     description: {
//       type: String,
//       required: [true, "Task description is required"],
//       trim: true,
//       maxlength: [1000, "Task description cannot exceed 1000 characters"],
//     },

//     assignedTo: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "Assigned employee is required"],
//     },

//     assignedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: [true, "Assigned by is required"],
//     },

//     priority: {
//       type: String,
//       enum: ["low", "medium", "high"],
//       default: "medium",
//     },

//     status: {
//       type: String,
//       enum: ["Todo", "In Progress", "Completed"],
//       default: "Todo",
//     },

//     dueDate: {
//       type: Date,
//       required: [true, "Due date is required"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Task", taskSchema);


const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      minlength: [3, "Task title must be at least 3 characters"],
      maxlength: [100, "Task title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
      maxlength: [1000, "Task description cannot exceed 1000 characters"],
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assigned employee is required"],
    },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Assigned by is required"],
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "completed", "Todo", "In Progress", "Completed"],
      default: "todo",
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
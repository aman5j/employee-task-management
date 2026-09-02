import { useEffect, useState } from "react";

const initialForm = {
  title: "",
  description: "",
  assignedTo: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
};


function TaskForm({
  task,
  employees,
  onSubmit,
  onCancel,
  loading,
}) {
  const [formData, setFormData] =
    useState(initialForm);


  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description:
          task.description || "",

        assignedTo:
          task.assignedTo?._id ||
          task.assignedTo ||
          "",

        priority:
          task.priority || "medium",

        status:
          task.status || "todo",

        dueDate:
          task.dueDate
            ? task.dueDate.split("T")[0]
            : "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [task]);


  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      {/* Title */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Task Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>


      {/* Description */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          placeholder="Enter task description"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>


      {/* Employee */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Assign Employee
        </label>

        <select
          name="assignedTo"
          value={formData.assignedTo}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">
            Select employee
          </option>

          {employees.map((employee) => (
            <option
              key={
                employee._id ||
                employee.id
              }
              value={
                employee._id ||
                employee.id
              }
            >
              {employee.name} -{" "}
              {employee.email}
            </option>
          ))}
        </select>
      </div>


      {/* Priority */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Priority
        </label>

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="low">
            Low
          </option>

          <option value="medium">
            Medium
          </option>

          <option value="high">
            High
          </option>
        </select>
      </div>


      {/* Status */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Status
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="todo">
            Todo
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>
        </select>
      </div>


      {/* Due Date */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Due Date
        </label>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>


      {/* Buttons */}

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : task
              ? "Update Task"
              : "Create Task"}
        </button>
      </div>

    </form>
  );
}


export default TaskForm;
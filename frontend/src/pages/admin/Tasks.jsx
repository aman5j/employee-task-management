import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../../redux/slices/taskSlice";

import { fetchEmployees } from "../../redux/slices/employeeSlice";

import TaskForm from "../../components/forms/TaskForm";


function Tasks() {
  const dispatch = useDispatch();


  const {
    tasks,
    loading,
    error,
  } = useSelector(
    (state) => state.tasks
  );


  const {
    employees,
  } = useSelector(
    (state) => state.employees
  );


  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [priorityFilter, setPriorityFilter] =
    useState("all");

  const [showForm, setShowForm] =
    useState(false);

  const [editingTask, setEditingTask] =
    useState(null);


  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchEmployees());
  }, [dispatch]);


  const filteredTasks = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        !searchValue ||
        task.title
          ?.toLowerCase()
          .includes(searchValue) ||
        task.description
          ?.toLowerCase()
          .includes(searchValue);


      const matchesStatus =
        statusFilter === "all" ||
        task.status === statusFilter;


      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;


      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    tasks,
    search,
    statusFilter,
    priorityFilter,
  ]);


  const handleCreate = async (data) => {
    const result =
      await dispatch(
        createTask(data)
      );

    if (
      createTask.fulfilled.match(result)
    ) {
      setShowForm(false);
    }
  };


  const handleUpdate = async (data) => {
    if (!editingTask) {
      return;
    }

    const id =
      editingTask._id ||
      editingTask.id;


    const result =
      await dispatch(
        updateTask({
          id,
          data,
        })
      );


    if (
      updateTask.fulfilled.match(result)
    ) {
      setEditingTask(null);
      setShowForm(false);
    }
  };


  const handleDelete = async (task) => {
    const id =
      task._id ||
      task.id;


    const confirmed =
      window.confirm(
        `Delete "${task.title}"?`
      );


    if (!confirmed) {
      return;
    }


    await dispatch(
      deleteTask(id)
    );
  };


  const openCreateForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };


  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };


  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };


  const getEmployeeName = (task) => {
    if (
      task.assignedTo &&
      typeof task.assignedTo ===
        "object"
    ) {
      return (
        task.assignedTo.name ||
        task.assignedTo.email ||
        "Unknown"
      );
    }


    const employee =
      employees.find(
        (item) =>
          (item._id || item.id) ===
          task.assignedTo
      );


    return (
      employee?.name ||
      "Unknown"
    );
  };


  const getStatusClass = (status) => {
    if (status === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "in-progress") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-slate-100 text-slate-700";
  };


  const getPriorityClass = (priority) => {
    if (priority === "high") {
      return "bg-red-100 text-red-700";
    }

    if (priority === "medium") {
      return "bg-orange-100 text-orange-700";
    }

    return "bg-green-100 text-green-700";
  };


  return (
    <div>

      {/* Header */}

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Tasks
          </h1>

          <p className="mt-1 text-slate-500">
            Create and manage employee tasks.
          </p>
        </div>


        <button
          onClick={openCreateForm}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
        >
          + Create Task
        </button>
      </div>


      {/* Error */}

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}


      {/* Filters */}

      <div className="mb-5 grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-3">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />


        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none"
        >
          <option value="all">
            All Status
          </option>

          <option value="todo">
            Todo
          </option>

          <option value="in-progress">
            In Progress
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>


        <select
          value={priorityFilter}
          onChange={(event) =>
            setPriorityFilter(
              event.target.value
            )
          }
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none"
        >
          <option value="all">
            All Priority
          </option>

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


      {/* Task Form */}

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {editingTask
                ? "Edit Task"
                : "Create Task"}
            </h2>

            <button
              onClick={closeForm}
              className="text-slate-500 hover:text-slate-900"
            >
              ✕
            </button>
          </div>


          <TaskForm
            task={editingTask}
            employees={employees}
            onSubmit={
              editingTask
                ? handleUpdate
                : handleCreate
            }
            onCancel={closeForm}
            loading={loading}
          />

        </div>
      )}


      {/* Table */}

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Task
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Assigned To
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Priority
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Due Date
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-slate-200">

              {loading &&
              tasks.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    Loading tasks...
                  </td>
                </tr>

              ) : filteredTasks.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No tasks found.
                  </td>
                </tr>

              ) : (

                filteredTasks.map(
                  (task) => (

                    <tr
                      key={
                        task._id ||
                        task.id
                      }
                      className="hover:bg-slate-50"
                    >

                      <td className="px-5 py-4">

                        <p className="font-semibold text-slate-900">
                          {task.title}
                        </p>

                        <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                          {task.description}
                        </p>

                      </td>


                      <td className="px-5 py-4 text-slate-600">
                        {getEmployeeName(task)}
                      </td>


                      <td className="px-5 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getPriorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>

                      </td>


                      <td className="px-5 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusClass(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>

                      </td>


                      <td className="px-5 py-4 text-slate-600">
                        {task.dueDate
                          ? new Date(
                              task.dueDate
                            ).toLocaleDateString()
                          : "-"}
                      </td>


                      <td className="px-5 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            onClick={() =>
                              openEditForm(task)
                            }
                            className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium hover:bg-slate-200"
                          >
                            Edit
                          </button>


                          <button
                            onClick={() =>
                              handleDelete(task)
                            }
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      <p className="mt-4 text-sm text-slate-500">
        Showing {filteredTasks.length} of{" "}
        {tasks.length} tasks
      </p>

    </div>
  );
}


export default Tasks;
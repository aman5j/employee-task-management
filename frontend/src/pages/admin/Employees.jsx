import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../../redux/slices/employeeSlice";

import EmployeeForm from "../../components/forms/EmployeeForm";

function Employees() {
  const dispatch = useDispatch();

  const {
    employees,
    loading,
    error,
  } = useSelector(
    (state) => state.employees
  );

  const [search, setSearch] =
    useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingEmployee, setEditingEmployee] =
    useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const filteredEmployees = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    if (!searchValue) {
      return employees;
    }

    return employees.filter((employee) => {
      return (
        employee.name
          ?.toLowerCase()
          .includes(searchValue) ||
        employee.email
          ?.toLowerCase()
          .includes(searchValue) ||
        employee.department
          ?.toLowerCase()
          .includes(searchValue) ||
        employee.designation
          ?.toLowerCase()
          .includes(searchValue)
      );
    });
  }, [employees, search]);

  const handleCreate = async (data) => {
    const result =
      await dispatch(
        createEmployee(data)
      );

    if (
      createEmployee.fulfilled.match(result)
    ) {
      setShowForm(false);
      dispatch(fetchEmployees()); // Refreshes the employee list automatically
    }
  };

  const handleUpdate = async (data) => {
    if (!editingEmployee) {
      return;
    }

    const id =
      editingEmployee._id ||
      editingEmployee.id;

    const result =
      await dispatch(
        updateEmployee({
          id,
          data,
        })
      );

    if (
      updateEmployee.fulfilled.match(result)
    ) {
      setEditingEmployee(null);
      setShowForm(false);
    }
  };

  const handleDelete = async (employee) => {
    const id =
      employee._id ||
      employee.id;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${employee.name}?`
    );

    if (!confirmed) {
      return;
    }

    await dispatch(
      deleteEmployee(id)
    );
  };

  const openAddForm = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const openEditForm = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div>
      {/* Header */}

      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Employees
          </h1>

          <p className="mt-1 text-slate-500">
            Manage employees in your organization.
          </p>
        </div>

        <button
          onClick={openAddForm}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-5 rounded-lg bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Search */}

      <div className="mb-5 rounded-xl bg-white p-4 shadow-sm">
        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search by name, email, department or designation..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Form */}

      {showForm && (
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {editingEmployee
                ? "Edit Employee"
                : "Add Employee"}
            </h2>

            <button
              onClick={closeForm}
              className="text-slate-500 hover:text-slate-900"
            >
              ✕
            </button>
          </div>

          <EmployeeForm
            employee={editingEmployee}
            onSubmit={
              editingEmployee
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
          <table className="w-full min-w-[800px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Name
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Email
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Department
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Designation
                </th>

                <th className="px-5 py-4 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {loading &&
              employees.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    Loading employees...
                  </td>
                </tr>
              ) : filteredEmployees.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-5 py-10 text-center text-slate-500"
                  >
                    No employees found.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(
                  (employee) => (
                    <tr
                      key={
                        employee._id ||
                        employee.id
                      }
                      className="hover:bg-slate-50"
                    >
                      <td className="px-5 py-4 font-medium">
                        {employee.name}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {employee.email}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {employee.department ||
                          "-"}
                      </td>

                      <td className="px-5 py-4 text-slate-600">
                        {employee.designation ||
                          "-"}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              openEditForm(
                                employee
                              )
                            }
                            className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                employee
                              )
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

      {/* Result count */}

      <p className="mt-4 text-sm text-slate-500">
        Showing {filteredEmployees.length} of{" "}
        {employees.length} employees
      </p>
    </div>
  );
}

export default Employees;
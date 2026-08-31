import { useEffect, useState } from "react";

const initialForm = {
  name: "",
  email: "",
  password: "",
  department: "",
  designation: "",
};

function EmployeeForm({
  employee,
  onSubmit,
  onCancel,
  loading,
}) {
  const [formData, setFormData] =
    useState(initialForm);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        password: "",
        department:
          employee.department || "",
        designation:
          employee.designation || "",
      });
    } else {
      setFormData(initialForm);
    }
  }, [employee]);

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

    const data = {
      name: formData.name,
      email: formData.email,
      department: formData.department,
      designation: formData.designation,
    };

    if (!employee && formData.password) {
      data.password = formData.password;
    }

    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Enter employee name"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="Enter employee email"
        />
      </div>

      {!employee && (
        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!employee}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
            placeholder="Enter password"
          />
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Department
        </label>

        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="e.g. Development"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Designation
        </label>

        <input
          type="text"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          placeholder="e.g. MERN Developer"
        />
      </div>

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
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : employee
              ? "Update Employee"
              : "Add Employee"}
        </button>
      </div>
    </form>
  );
}

export default EmployeeForm;
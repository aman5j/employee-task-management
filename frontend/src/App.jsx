import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminLayout from "./components/layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Employees from "./pages/admin/Employees";
import Tasks from "./pages/admin/Tasks";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected */}

        <Route element={<ProtectedRoute />}>
          {/* Admin */}

          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />

              <Route path="/admin/employees" element={<Employees />} />

              {/* <Route
                path="/admin/tasks"
                element={
                  <div className="rounded-xl bg-white p-6">
                    Task Management — Coming Next
                  </div>
                }
              />
            </Route> */}

            <Route
              path="/admin/tasks"
              element={<Tasks />}
            />

            </Route>
            
          </Route>

          {/* Employee */}

          <Route element={<RoleRoute allowedRoles={["employee"]} />}>
            <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          </Route>
        </Route>

        {/* Fallback */}

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

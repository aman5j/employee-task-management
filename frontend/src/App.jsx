import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          
          {/* Admin Routes */}

          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />
          </Route>

          {/* Employee Routes */}

          <Route
            element={
              <RoleRoute
                allowedRoles={["employee"]}
              />
            }
          >
            <Route
              path="/employee/dashboard"
              element={<EmployeeDashboard />}
            />
          </Route>

        </Route>

        {/* Unknown Route */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
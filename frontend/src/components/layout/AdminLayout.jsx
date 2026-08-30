import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../redux/slices/authSlice";

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      label: "Employees",
      path: "/admin/employees",
    },
    {
      label: "Tasks",
      path: "/admin/tasks",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        {/* Sidebar */}

        <aside className="hidden w-64 flex-col bg-slate-900 text-white md:flex">
          <div className="border-b border-slate-700 px-6 py-5">
            <h1 className="text-xl font-bold">
              Task Manager
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Admin Panel
            </p>
          </div>

          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-slate-700 p-4">
            <button
              onClick={handleLogout}
              className="w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-red-400 transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}

        <div className="flex min-w-0 flex-1 flex-col">
          {/* Topbar */}

          <header className="border-b border-slate-200 bg-white">
            <div className="flex items-center justify-between px-4 py-4 md:px-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Admin Dashboard
                </h2>

                <p className="text-sm text-slate-500">
                  Manage employees and tasks
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-900">
                  {user?.name}
                </p>

                <p className="text-sm capitalize text-slate-500">
                  {user?.role}
                </p>
              </div>
            </div>
          </header>

          {/* Page */}

          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slices/authSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Employee Task Management
          </h1>

          <p className="text-sm text-slate-500">
            {user?.role === "admin"
              ? "Admin Panel"
              : "Employee Panel"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-medium text-slate-900">
              {user?.name}
            </p>

            <p className="text-sm capitalize text-slate-500">
              {user?.role}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
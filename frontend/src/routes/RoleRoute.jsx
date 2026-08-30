import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function RoleRoute({ allowedRoles }) {
  const { user } = useSelector(
    (state) => state.auth
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    if (user.role === "employee") {
      return (
        <Navigate
          to="/employee/dashboard"
          replace
        />
      );
    }

    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RoleRoute;
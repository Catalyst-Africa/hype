import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const emailVerified = useSelector((state) => state.auth.user.emailVerified);
  const loggedIn = useSelector((state) => state.app.loggedIn);

  const userRole = "admin";

  if (loggedIn && userRole === "admin")
    if (!emailVerified) return <Navigate to="/verify-email" />;
    else return <Outlet />;
  else return <Navigate to="/admin/login" />;
};

export default AdminRoute;

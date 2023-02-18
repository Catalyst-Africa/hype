import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const emailVerified = useSelector((state) => state.auth.user.emailVerified);
  const isAdmin = useSelector((state) => state.auth.user.isAdmin);
  const loggedIn = useSelector((state) => state.app.loggedIn);

  if (loggedIn)
    if (!emailVerified) return <Navigate to="/verify-email" />;
    else if (isAdmin) return <Navigate to="/admin/dashboard" />;
    else return <Outlet />;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;

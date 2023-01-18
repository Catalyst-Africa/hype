import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const emailVerified = useSelector((state) => state.auth.user.emailVerified);
  const loggedIn = useSelector((state) => state.app.loggedIn);

  if (loggedIn)
    if (!emailVerified) return <Navigate to="/verify-email" />;
    else return <Outlet />;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;

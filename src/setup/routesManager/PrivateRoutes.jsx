import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const emailVerified = useSelector((state) => state.user.emailVerified);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  if (isLoggedIn)
    if (!emailVerified) return <Navigate to="/email-verification" />;
    else return <Outlet />;
  else return <Navigate to="/login" />;
};

export default PrivateRoute;

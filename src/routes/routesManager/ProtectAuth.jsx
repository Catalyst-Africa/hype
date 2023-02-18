import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectAuth = () => {
  const loggedIn = useSelector((state) => state.app.loggedIn);
  const emailVerified = useSelector((state) => state.auth.user.emailVerified);

  if (loggedIn)
    if (!emailVerified) return <Navigate to="/verify-email" />;
    else return <Navigate to="/dashboard" />;
  else return <Outlet />;
};

export default ProtectAuth;

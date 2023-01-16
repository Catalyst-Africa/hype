import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectAuth = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const emailVerified = useSelector((state) => state.user.emailVerified);

  if (isLoggedIn)
    if (!emailVerified) return <Navigate to="/verify-email" />;
    else return <Navigate to="/dashboard" />;
  else return <Outlet />;
};

export default ProtectAuth;

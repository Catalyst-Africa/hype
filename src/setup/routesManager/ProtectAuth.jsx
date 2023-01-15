import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectAuth = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default ProtectAuth;

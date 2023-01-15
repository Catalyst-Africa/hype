import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectEmailVerification = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  if (isLoggedIn) return <Outlet />;
  else return <Navigate to="/login" />;
};

export default ProtectEmailVerification;

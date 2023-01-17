import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectEmailVerification = () => {
  const loggedIn = useSelector((state) => state.app.loggedIn);

  if (loggedIn) return <Outlet />;
  else return <Navigate to="/login" />;
};

export default ProtectEmailVerification;

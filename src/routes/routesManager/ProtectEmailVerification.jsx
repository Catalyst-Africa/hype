import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectEmailVerification = () => {
  const loggedIn = useSelector((state) => state.app.loggedIn);
  const emailVerified = useSelector((state) => state.auth.user.emailVerified);

  if (loggedIn && !emailVerified) return <Outlet />;
  else return <Navigate to="/login" />;
};

export default ProtectEmailVerification;

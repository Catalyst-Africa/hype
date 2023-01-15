import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoute;

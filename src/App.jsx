import { useEffect } from "react";
import { Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import authRoutes from "@/routes/AuthRoutes";
import publicRoutes from "@/routes/PublicRoutes";
import privateRoutes from "@/routes/PrivateRoutes";
import adminRoutes from "@/routes/AdminRoutes";

import { OverlayLoader } from "@/components/ui";
import { auth } from "@/setup/firebase/firebase";
import { updateAuth } from "@/setup/redux/slices/app/appSlice";
import { updateUser } from "@/setup/redux/slices/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await user.getIdTokenResult();
        const adminRole = role.claims.admin;
        dispatch(updateAuth(true));
        dispatch(updateUser({ ...user, adminRole }));
      } else {
        dispatch(updateAuth(false));
      }
    });
  }, [auth]);

  if (loading) {
    return <OverlayLoader />;
  }

  return (
    <>
      <Toaster />
      <Routes>
        {authRoutes}
        {publicRoutes}
        {privateRoutes}
        {adminRoutes}
      </Routes>
    </>
  );
};

export default App;

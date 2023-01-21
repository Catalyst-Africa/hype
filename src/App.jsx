import { useEffect } from "react";
import { Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

import authRoutes from "@/routes/AuthRoutes";
import publicRoutes from "@/routes/PublicRoutes";
import privateRoutes from "@/routes/PrivateRoutes";

import { OverlayLoader } from "@/components/ui";
import { auth } from "@/setup/firebase/firebase";
import { updateAuth } from "@/setup/redux/slices/app/appSlice";
import { updateUser } from "@/setup/redux/slices/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(updateAuth(true));
        dispatch(updateUser(user));
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
      </Routes>
    </>
  );
};

export default App;

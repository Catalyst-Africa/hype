import { useEffect } from "react";
import { Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";

import authRoutes from "@/routes/AuthRoutes";
import publicRoutes from "@/routes/PublicRoutes";
import privateRoutes from "@/routes/PrivateRoutes";

import { auth } from "@/setup/firebase/firebase";
import { updateAuth } from "@/setup/slices/app/appSlice";
import { updateUser } from "@/setup/slices/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { OverlayLoader } from "@/components/ui";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(updateAuth(true));
        const { uid, email, emailVerified, photoURL, displayName } = user;
        dispatch(
          updateUser({ uid, email, emailVerified, photoURL, displayName }),
        );
      } else dispatch(updateAuth(false));
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

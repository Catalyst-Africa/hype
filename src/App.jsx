import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Routes } from "react-router-dom";

import authRoutes from "@/routes/AuthRoutes";
import publicRoutes from "@/routes/PublicRoutes";
import privateRoutes from "@/routes/PrivateRoutes";

import { auth } from "@/setup/firebase/firebase";
import { setIsLoggedIn } from "@/setup/slices/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { OverlayLoader } from "@/components/ui";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) dispatch(setIsLoggedIn(true));
      else dispatch(setIsLoggedIn(false));
    });
  }, []);

  if (loading) {
    return <OverlayLoader />;
  }

  return (
    <Routes>
      {authRoutes}
      {publicRoutes}
      {privateRoutes}
    </Routes>
  );
};

export default App;

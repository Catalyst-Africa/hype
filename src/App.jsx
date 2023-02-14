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
import { doc, getDoc } from "firebase/firestore";
import { db } from "./setup/firebase/firebase";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.loading);
  const userUpdateLoading = useSelector((state) => state.auth.rerender);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        const role = await user.getIdTokenResult();
        const adminRole = role.claims.admin;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        const data = docSnap.data();
        dispatch(updateAuth(true));
        dispatch(updateUser({ ...user, data, adminRole }));
        // dispatch(updateAuth(false));
      } else {
        dispatch(updateAuth(false));
      }
    });
  }, [auth, userUpdateLoading]);

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

import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";
import { Login, SignUp, VerifyEmail } from "@/pages/auth";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/verify-email" element={<VerifyEmail />} />
  </Route>
);

export default authRoutes;

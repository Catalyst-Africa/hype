import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";
import { Login, SignUp, EmailVerification } from "@/pages/auth";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/email-verification" element={<EmailVerification />} />
  </Route>
);

export default authRoutes;

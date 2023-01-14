import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";
import {
  Login,
  SignUp,
  EmailVerification,
  ForgotPassword,
  ResetPassword,
} from "@/pages/auth";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/email-verification" element={<EmailVerification />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password" element={<ResetPassword />} />
  </Route>
);

export default authRoutes;

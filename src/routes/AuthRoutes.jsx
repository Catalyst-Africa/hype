import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";
import ProtectAuth from "@/setup/routesManager/ProtectAuth";

import {
  Login,
  SignUp,
  EmailVerification,
  ForgotPassword,
  ResetPassword,
} from "@/pages/auth";

import { ActionUrlHandler } from "@/components/functional";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route element={<ProtectAuth />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Route>

    <Route path="/auth" element={<ActionUrlHandler />} />
    <Route path="/email-verification" element={<EmailVerification />} />
  </Route>
);

export default authRoutes;

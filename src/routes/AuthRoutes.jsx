import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";
import ProtectAuth from "@/setup/routesManager/ProtectAuth";
import ProtectEmailVerification from "@/setup/routesManager/ProtectEmailVerification";

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
    <Route path="/auth" element={<ActionUrlHandler />} />
    <Route element={<ProtectAuth />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
    </Route>
    <Route element={<ProtectEmailVerification />}>
      <Route path="/email-verification" element={<EmailVerification />} />
    </Route>
  </Route>
);

export default authRoutes;

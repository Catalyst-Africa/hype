import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";
import { Login, SignUp } from "@/pages/auth";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Route>
);

export default authRoutes;

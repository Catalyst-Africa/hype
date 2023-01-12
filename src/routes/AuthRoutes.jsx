import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";
import { Login } from "@/pages/auth";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={<Login />} />
  </Route>
);

export default authRoutes;

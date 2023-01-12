import { Route } from "react-router-dom";

import { AuthLayout } from "@/layouts";

const authRoutes = (
  <Route element={<AuthLayout />}>
    <Route path="/login" element={"872178"} />
  </Route>
);

export default authRoutes;

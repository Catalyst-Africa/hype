import { Route } from "react-router-dom";

import AdminRoute from "@/routes/routesManager/AdminRoutes";
import { AdminLayout } from "@/layouts";
import { Dashboard } from "../pages/admin";
import { AddHype } from "../pages/admin/hype/molecules";

const adminRoutes = (
  <Route element={<AdminRoute />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/hypes" element={"Hypes"} />
      <Route path="/admin/categories" element={"Categories"} />
      <Route path="/admin/add-hype" element={<AddHype />} />
    </Route>
  </Route>
);

export default adminRoutes;

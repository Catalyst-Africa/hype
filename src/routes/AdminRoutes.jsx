import { Route } from "react-router-dom";

import ProtectAdmin from "@/routes/routesManager/ProtectAdmin";
import { AdminLayout } from "@/layouts";
import { Dashboard } from "../pages/admin";
import { AddHype } from "../pages/admin/hype/molecules";

const adminRoutes = (
  <Route element={<ProtectAdmin />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/hypes" element={"Hypes"} />
      <Route path="/admin/categories" element={"Categories"} />
      <Route path="/admin/add-hype" element={<AddHype />} />
    </Route>
  </Route>
);

export default adminRoutes;

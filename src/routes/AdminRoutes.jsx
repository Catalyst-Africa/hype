import { Route } from "react-router-dom";

import ProtectAdmin from "@/routes/routesManager/ProtectAdmin";
import { AdminLayout } from "@/layouts";
import { Dashboard, HypeCategories, Users, ViewHypes } from "../pages/admin";
import { AddHype, EditHype } from "../pages/admin/hype/molecules";

const adminRoutes = (
  <Route element={<ProtectAdmin />}>
    <Route element={<AdminLayout />}>
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/hypes" element={<ViewHypes />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/categories" element={<HypeCategories />} />
      <Route path="/admin/add-hype" element={<AddHype />} />
      <Route path="/admin/edit-hype/:id" element={<EditHype />} />
    </Route>
  </Route>
);

export default adminRoutes;

import { Route } from "react-router-dom";

import PrivateRoute from "@/routes/routesManager/PrivateRoutes";
import { PrivateLayout } from "@/layouts";
import { Dashboard } from "../pages/private";

const privateRoutes = (
  <Route element={<PrivateRoute />}>
    <Route element={<PrivateLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/analytics" element={""} />
      <Route path="/gems" element={""} />
      <Route path="/settings" element={""} />
    </Route>
  </Route>
);

export default privateRoutes;

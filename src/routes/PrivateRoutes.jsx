import { Route } from "react-router-dom";

import PrivateRoute from "@/routes/routesManager/PrivateRoutes";
import { PrivateLayout } from "@/layouts";

const privateRoutes = (
  <Route element={<PrivateRoute />}>
    <Route element={<PrivateLayout />}>
      <Route path="/dashboard" element={""} />
      <Route path="/analytics" element={""} />
      <Route path="/gems" element={""} />
      <Route path="/settings" element={""} />
    </Route>
  </Route>
);

export default privateRoutes;

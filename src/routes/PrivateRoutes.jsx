import { Route } from "react-router-dom";

import PrivateRoute from "@/setup/routesManager/PrivateRoutes";

const privateRoutes = (
  <Route element={<PrivateRoute />}>
    <Route path="/dashboard" element={"Private Routes"} />
  </Route>
);

export default privateRoutes;

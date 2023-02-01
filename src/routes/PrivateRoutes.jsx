import { Route } from "react-router-dom";

import PrivateRoute from "@/routes/routesManager/PrivateRoutes";
import { PrivateLayout } from "@/layouts";
import { Dashboard, GemsPolls, Profile, Settings } from "../pages/private";
import {
  AccountSettings,
  ChangePasswordSettings,
  InterfaceThemeSettings,
} from "../pages/private/settings/molecules";

const privateRoutes = (
  <Route element={<PrivateRoute />}>
    <Route element={<PrivateLayout />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/gems-polls" element={<GemsPolls />} />
      <Route path="/settings" element={<Settings />}>
        <Route path="" element={<AccountSettings />} />
        <Route path="interface-theme" element={<InterfaceThemeSettings />} />
        <Route path="password" element={<ChangePasswordSettings />} />
      </Route>
    </Route>
  </Route>
);

export default privateRoutes;

import { Route } from "react-router-dom";

import PrivateRoute from "@/routes/routesManager/PrivateRoutes";
import { PrivateLayout } from "@/layouts";
import {
  Dashboard,
  GemsPolls,
  Profile,
  Hype,
  Settings,
} from "../pages/private";
import {
  AccountSettings,
  ChangePasswordSettings,
  InterfaceThemeSettings,
} from "../pages/private/settings/molecules";
import { SendHype } from "../pages/private/hype/molecules";

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
      <Route path="/send-hype" element={<Hype />}>
        <Route path="" element={<SendHype />} />
      </Route>
      <Route path="*" element={"Not found"} />
    </Route>
  </Route>
);

export default privateRoutes;

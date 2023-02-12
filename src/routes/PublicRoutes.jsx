import { Route } from "react-router-dom";
import { PublicLayout } from "@/layouts";
import { Home, HypeMessage, NotFound, Terms } from "../pages/public";

const publicRoutes = (
  <>
    <Route path="/" element={<PublicLayout />}>
      <Route path="" element={<Home />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/hype/message/:id" element={<HypeMessage />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </>
);

export default publicRoutes;

import { Routes } from "react-router-dom";

import authRoutes from "@/routes/AuthRoutes";
import publicRoutes from "@/routes/PublicRoutes";
import privateRoutes from "@/routes/PrivateRoutes";

const App = () => {
  return (
    <Routes>
      {authRoutes}
      {publicRoutes}
      {privateRoutes}
    </Routes>
  );
};

export default App;

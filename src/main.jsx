import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import CustomThemeProvider from "@/context/CustomThemeProvider";
import GlobalStyles from "@/styles/global/Global.styled";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <GlobalStyles />
      <Router>
        <App />
      </Router>
    </CustomThemeProvider>
  </React.StrictMode>,
);

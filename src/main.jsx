import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { IconContext } from "react-icons";
import { Provider } from "react-redux";

import App from "./App";
import CustomThemeProvider from "@/context/CustomThemeProvider";
import GlobalStyles from "@/styles/global/Global.styled";
import { ScrollToTop } from "@/components/functional";
import { store } from "@/setup/redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CustomThemeProvider>
        <GlobalStyles />
        <Router>
          <ScrollToTop />
          <IconContext.Provider value={{ size: "24px" }}>
            <App />
          </IconContext.Provider>
        </Router>
      </CustomThemeProvider>
    </Provider>
  </React.StrictMode>,
);

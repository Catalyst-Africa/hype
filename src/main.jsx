import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { IconContext } from "react-icons";

import App from "./App";
import { ScrollToTop } from "@/components/functional";
import CustomThemeProvider from "@/context/CustomThemeProvider";
import GlobalStyles from "@/styles/global/Global.styled";
import { store } from "@/setup/redux/store/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
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
  </Provider>,
  // </React.StrictMode>,
);

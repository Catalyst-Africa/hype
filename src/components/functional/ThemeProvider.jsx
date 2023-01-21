import { useSelector } from "react-redux";
import { ThemeProvider as Theme } from "styled-components";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.app.theme);

  return <Theme theme={theme}>{children}</Theme>;
};

export default ThemeProvider;

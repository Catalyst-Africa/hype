import PropTypes from "prop-types";
import { useState, useEffect, createContext } from "react";
import { ThemeProvider } from "styled-components";

import { dark, light } from "@/styles/global/Theme";

export const ThemeContext = createContext({
  theme: light,
  toggleTheme: () => {},
});

const CustomThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? light : dark,
  );

  const setInitialTheme = () => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === null) {
      localStorage.setItem("theme", "light");
      setTheme(light);
    } else setTheme(storedTheme === "light" ? light : dark);
  };

  const toggleTheme = () => {
    const newTheme = theme === light ? dark : light;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme === light ? "light" : "dark");
  };

  // Call setInitialTheme when the component mounts
  useEffect(() => {
    setInitialTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Prop Types

CustomThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomThemeProvider;

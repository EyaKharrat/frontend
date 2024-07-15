import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext({});

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem("themeMode") || LIGHT_THEME;
  });

  useEffect(() => {
    window.localStorage.setItem("themeMode", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;

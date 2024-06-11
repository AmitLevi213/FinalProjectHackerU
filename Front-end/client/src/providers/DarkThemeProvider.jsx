import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { node } from "prop-types";

const ThemeContext = createContext(null);

export const DarkThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("isDark");
    return storedTheme ? JSON.parse(storedTheme) : false;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => {
      localStorage.setItem("isDark", JSON.stringify(!prev));
      return !prev;
    });
  }, [setIsDark]);

  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDark ? "dark" : "light",
      },
    });
  }, [isDark]);

  const value = useMemo(() => {
    return {
      toggleDarkMode,
      isDark,
    };
  }, [toggleDarkMode, isDark]);

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

DarkThemeProvider.propTypes = {
  children: node.isRequired,
};

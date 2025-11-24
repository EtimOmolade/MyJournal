import { createContext, useState, useContext } from "react";
import { Appearance } from "react-native";
import { lightTheme, darkTheme } from "../constants/theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme(); // auto-detect system
  const [theme, setTheme] = useState(colorScheme === "dark" ? darkTheme : lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

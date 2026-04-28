import React, { createContext, useState, useContext, useEffect } from "react";

const themePresets = {
  dark: {
    name: "暗黑",
    primary: "#1d9af2",
    secondary: "#292D3E",
    accent: "#24ff9f",
    background: "#13172c",
    text: "#ffffff",
    border: "#1d9af2",
  },
  neon: {
    name: "霓虹",
    primary: "#ff00ff",
    secondary: "#0a0a1a",
    accent: "#00ffff",
    background: "#050510",
    text: "#ff00ff",
    border: "#00ffff",
  },
  minimal: {
    name: "极简",
    primary: "#333333",
    secondary: "#f5f5f5",
    accent: "#666666",
    background: "#ffffff",
    text: "#333333",
    border: "#333333",
  },
  retro: {
    name: "复古",
    primary: "#e07b39",
    secondary: "#2d1b69",
    accent: "#f4d03f",
    background: "#1a1a2e",
    text: "#f4d03f",
    border: "#e07b39",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [customTheme, setCustomTheme] = useState(null);

  const getTheme = () => {
    if (customTheme) {
      return customTheme;
    }
    return themePresets[currentTheme] || themePresets.dark;
  };

  const applyTheme = (themeName) => {
    if (themePresets[themeName]) {
      setCurrentTheme(themeName);
      setCustomTheme(null);
    }
  };

  const updateCustomTheme = (colors) => {
    setCustomTheme({
      name: "自定义",
      ...colors,
    });
    setCurrentTheme("custom");
  };

  const resetToDefault = () => {
    setCurrentTheme("dark");
    setCustomTheme(null);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: getTheme(),
        currentTheme,
        themePresets,
        applyTheme,
        updateCustomTheme,
        resetToDefault,
        customTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;

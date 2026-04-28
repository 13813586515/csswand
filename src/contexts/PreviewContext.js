import React, { createContext, useState, useContext } from "react";

const PreviewContext = createContext();

const defaultPreviewSettings = {
  backgroundColor: "#13172c",
  textContent: "Button",
  fontSize: "14px",
  width: "auto",
  height: "32px",
  padding: "0 15px",
};

export const PreviewProvider = ({ children }) => {
  const [previewSettings, setPreviewSettings] = useState(defaultPreviewSettings);

  const updateSetting = (key, value) => {
    setPreviewSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPreview = () => {
    setPreviewSettings(defaultPreviewSettings);
  };

  return (
    <PreviewContext.Provider
      value={{
        previewSettings,
        updateSetting,
        resetPreview,
        defaultPreviewSettings,
      }}
    >
      {children}
    </PreviewContext.Provider>
  );
};

export const usePreview = () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
};

export default PreviewContext;

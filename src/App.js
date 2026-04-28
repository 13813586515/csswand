import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import EffectBoard from "./components/EffectBoard/EffectBoard";

import { css } from "emotion";
import cssLetter from "./css-letter.png";
import ColorPicker from "./components/ColorPicker/ColorPicker";
import ThemeSelector from "./components/ThemeSelector/ThemeSelector";
import PreviewSettings from "./components/PreviewSettings/PreviewSettings";

import { ThemeProvider } from "./contexts/ThemeContext";
import { PreviewProvider } from "./contexts/PreviewContext";

function App() {
  return (
    <ThemeProvider>
      <PreviewProvider>
        <div className="App">
          <Header />

          <div>
            <p
              className={css`
                margin: 0;
                font-size: 18px;
                margin-top: 40px;
                letter-spacing: 4px;
              `}
            >
              Welcome to
            </p>
            <br />
            <img src={cssLetter} alt="css gradient" width="250" />
            <p
              className={css`
                margin: 0;
                font-size: 18px;
                margin-top: 40px;
                letter-spacing: 2px;
              `}
            >
              Easy Copy-Paste Beautiful CSS <br />
              That can be easily customized further at your own choice
            </p>
          </div>

          <div
            className={css`
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              gap: 16px;
              margin-top: 20px;
            `}
          >
            <ColorPicker />
            <ThemeSelector />
            <PreviewSettings />
          </div>

          <EffectBoard />
        </div>
      </PreviewProvider>
    </ThemeProvider>
  );
}

export default App;

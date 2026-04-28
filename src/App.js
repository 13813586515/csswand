import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import EffectBoard from "./components/EffectBoard/EffectBoard";

import { css } from "emotion";
import cssLetter from "./css-letter.png";
import ColorPicker from "./components/ColorPicker/ColorPicker";

import EffectCombiner from "./components/EffectCombiner/EffectCombiner";
import ShadowGenerator from "./components/ShadowGenerator/ShadowGenerator";
import GradientGenerator from "./components/GradientGenerator/GradientGenerator";
import BorderRadiusGenerator from "./components/BorderRadiusGenerator/BorderRadiusGenerator";

class App extends Component {
  state = {
    currentPage: "effects"
  };

  renderPage() {
    const { currentPage } = this.state;
    
    switch (currentPage) {
      case "effects":
        return (
          <>
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

            <ColorPicker />

            <EffectBoard />
          </>
        );
      
      case "combiner":
        return <EffectCombiner />;
      
      case "shadow":
        return <ShadowGenerator />;
      
      case "gradient":
        return <GradientGenerator />;
      
      case "borderRadius":
        return <BorderRadiusGenerator />;
      
      default:
        return null;
    }
  }

  render() {
    const { currentPage } = this.state;

    return (
      <div className="App">
        <Header />
        
        <div className="navigation-container">
          <nav className="main-navigation">
            <button
              className={`nav-button ${currentPage === "effects" ? "active" : ""}`}
              onClick={() => this.setState({ currentPage: "effects" })}
            >
              <i className="fas fa-magic"></i>
              <span>效果展示</span>
            </button>
            
            <button
              className={`nav-button ${currentPage === "combiner" ? "active" : ""}`}
              onClick={() => this.setState({ currentPage: "combiner" })}
            >
              <i className="fas fa-layer-group"></i>
              <span>效果组合器</span>
            </button>
            
            <button
              className={`nav-button ${currentPage === "shadow" ? "active" : ""}`}
              onClick={() => this.setState({ currentPage: "shadow" })}
            >
              <i className="fas fa-cloud"></i>
              <span>阴影生成器</span>
            </button>
            
            <button
              className={`nav-button ${currentPage === "gradient" ? "active" : ""}`}
              onClick={() => this.setState({ currentPage: "gradient" })}
            >
              <i className="fas fa-palette"></i>
              <span>渐变生成器</span>
            </button>
            
            <button
              className={`nav-button ${currentPage === "borderRadius" ? "active" : ""}`}
              onClick={() => this.setState({ currentPage: "borderRadius" })}
            >
              <i className="fas fa-square"></i>
              <span>圆角生成器</span>
            </button>
          </nav>
        </div>

        {this.renderPage()}
      </div>
    );
  }
}

export default App;

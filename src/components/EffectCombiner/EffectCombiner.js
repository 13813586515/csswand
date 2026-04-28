import React, { Component } from "react";
import { Checkbox, Button, Alert, Tabs, Card } from "antd";
import { css } from "emotion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./EffectCombiner.css";

import {
  growBtnStyle,
  growHtmlVariable,
  growCssVariable
} from "../../effects/GrowBtn";
import {
  shrinkStyle,
  shrinkHtmlVariable,
  shrinkCssVariable
} from "../../effects/Shrink";
import {
  opacityStyle,
  opacityHtmlVariable,
  opacityCssVariable
} from "../../effects/Opacity";
import {
  rotateStyle,
  rotateHtmlVariable,
  rotateCssVariable
} from "../../effects/Rotate30";
import {
  squarecircleStyle,
  squarecircleHtmlVariable,
  squarecircleCssVariable
} from "../../effects/SquaretoCircle";
import {
  tdshadowStyle,
  tdshadowHtmlVariable,
  tdshadowCssVariable
} from "../../effects/3DShadow";
import {
  swingStyle,
  swingHtmlVariable,
  swingCssVariable
} from "../../effects/Swing";
import {
  rippleStyle,
  rippleHtmlVariable,
  rippleCssVariable
} from "../../effects/Ripple";
import {
  pressDownStyle,
  pressDownHtmlVariable,
  pressDownCssVariable
} from "../../effects/PressDown";

const { TabPane } = Tabs;

const effectsList = [
  {
    name: "Grow",
    style: growBtnStyle,
    cssVariable: growCssVariable,
    htmlVariable: growHtmlVariable,
    properties: ["transform", "transition"],
    priority: 1,
    category: "hover"
  },
  {
    name: "Shrink",
    style: shrinkStyle,
    cssVariable: shrinkCssVariable,
    htmlVariable: shrinkHtmlVariable,
    properties: ["transform", "transition"],
    priority: 1,
    category: "hover"
  },
  {
    name: "Opacity",
    style: opacityStyle,
    cssVariable: opacityCssVariable,
    htmlVariable: opacityHtmlVariable,
    properties: ["opacity", "transition"],
    priority: 2,
    category: "hover"
  },
  {
    name: "Rotate",
    style: rotateStyle,
    cssVariable: rotateCssVariable,
    htmlVariable: rotateHtmlVariable,
    properties: ["transform", "transition"],
    priority: 1,
    category: "hover"
  },
  {
    name: "Shape",
    style: squarecircleStyle,
    cssVariable: squarecircleCssVariable,
    htmlVariable: squarecircleHtmlVariable,
    properties: ["border-radius", "transition"],
    priority: 3,
    category: "hover"
  },
  {
    name: "Shadow",
    style: tdshadowStyle,
    cssVariable: tdshadowCssVariable,
    htmlVariable: tdshadowHtmlVariable,
    properties: ["box-shadow", "transform", "transition"],
    priority: 2,
    category: "hover"
  },
  {
    name: "Swing",
    style: swingStyle,
    cssVariable: swingCssVariable,
    htmlVariable: swingHtmlVariable,
    properties: ["transform", "animation", "@keyframes"],
    priority: 2,
    category: "hover"
  },
  {
    name: "Ripple",
    style: rippleStyle,
    cssVariable: rippleCssVariable,
    htmlVariable: rippleHtmlVariable,
    properties: ["background", "box-shadow", "transition"],
    priority: 3,
    category: "hover"
  },
  {
    name: "Press Down",
    style: pressDownStyle,
    cssVariable: pressDownCssVariable,
    htmlVariable: pressDownHtmlVariable,
    properties: ["transform", "box-shadow", "transition"],
    priority: 2,
    category: "active"
  }
];

const conflictRules = {
  "transform": {
    "Grow+Shrink": "不能同时选择Grow和Shrink效果，它们都会修改transform属性",
    "Grow+Rotate": "不能同时选择Grow和Rotate效果，它们都会修改transform属性",
    "Shrink+Rotate": "不能同时选择Shrink和Rotate效果，它们都会修改transform属性",
    "Shadow+Grow": "Shadow效果包含transform属性，与Grow效果可能冲突，建议优先选择其中一个",
    "Shadow+Shrink": "Shadow效果包含transform属性，与Shrink效果可能冲突，建议优先选择其中一个",
    "Shadow+Rotate": "Shadow效果包含transform属性，与Rotate效果可能冲突，建议优先选择其中一个",
    "Swing+Grow": "Swing效果包含transform属性，与Grow效果可能冲突，建议优先选择其中一个",
    "Swing+Shrink": "Swing效果包含transform属性，与Shrink效果可能冲突，建议优先选择其中一个",
    "Swing+Rotate": "Swing效果包含transform属性，与Rotate效果可能冲突，建议优先选择其中一个"
  },
  "box-shadow": {
    "Shadow+Ripple": "Shadow和Ripple效果都包含box-shadow属性，可能会产生冲突",
    "Shadow+Press Down": "Shadow和Press Down效果都包含box-shadow属性，可能会产生冲突",
    "Ripple+Press Down": "Ripple和Press Down效果都包含box-shadow属性，可能会产生冲突"
  },
  "transition": {
    "Ripple+Grow": "Ripple效果的transition属性与Grow效果的transition可能冲突",
    "Ripple+Shrink": "Ripple效果的transition属性与Shrink效果的transition可能冲突",
    "Ripple+Opacity": "Ripple效果的transition属性与Opacity效果的transition可能冲突",
    "Ripple+Rotate": "Ripple效果的transition属性与Rotate效果的transition可能冲突"
  }
};

export default class EffectCombiner extends Component {
  state = {
    selectedEffects: [],
    conflicts: [],
    combinedCSS: "",
    combinedHTML: "",
    copiedCSS: false,
    copiedHTML: false,
    showConflicts: false
  };

  handleEffectChange = (checkedValues) => {
    this.setState({
      selectedEffects: checkedValues,
      conflicts: this.detectConflicts(checkedValues),
      copiedCSS: false,
      copiedHTML: false
    }, this.generateCombinedCSS);
  };

  detectConflicts = (selectedEffects) => {
    const conflicts = [];
    
    for (let i = 0; i < selectedEffects.length; i++) {
      for (let j = i + 1; j < selectedEffects.length; j++) {
        const effect1 = selectedEffects[i];
        const effect2 = selectedEffects[j];
        
        const effectData1 = effectsList.find(e => e.name === effect1);
        const effectData2 = effectsList.find(e => e.name === effect2);
        
        if (!effectData1 || !effectData2) continue;
        
        const commonProperties = effectData1.properties.filter(
          prop => effectData2.properties.includes(prop)
        );
        
        for (const prop of commonProperties) {
          const conflictKey = `${effect1}+${effect2}`;
          const reverseKey = `${effect2}+${effect1}`;
          
          if (conflictRules[prop]) {
            if (conflictRules[prop][conflictKey]) {
              conflicts.push({
                effects: [effect1, effect2],
                property: prop,
                message: conflictRules[prop][conflictKey],
                severity: "warning"
              });
            } else if (conflictRules[prop][reverseKey]) {
              conflicts.push({
                effects: [effect2, effect1],
                property: prop,
                message: conflictRules[prop][reverseKey],
                severity: "warning"
              });
            }
          }
        }
      }
    }
    
    return conflicts;
  };

  generateCombinedCSS = () => {
    const { selectedEffects } = this.state;
    
    if (selectedEffects.length === 0) {
      this.setState({
        combinedCSS: "",
        combinedHTML: ""
      });
      return;
    }
    
    let baseCSS = `
button {
  color: #1D9AF2;
  background-color: #292D3E;
  border: 1px solid #1D9AF2;
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
}`;
    
    let hoverCSS = "button:hover {";
    let activeCSS = "button:active {";
    let keyframesCSS = "";
    
    const hoverProperties = {};
    const activeProperties = {};
    
    selectedEffects.forEach(effectName => {
      const effect = effectsList.find(e => e.name === effectName);
      if (!effect) return;
      
      if (effect.properties.includes("@keyframes")) {
        if (effectName === "Swing") {
          keyframesCSS += `
@keyframes swing {
  15% {
    transform: translateX(5px) rotate(15deg);
  }
  30% {
    transform: translateX(-5px) rotate(-15deg);
  }
  50% {
    transform: translateX(3px) rotate(9deg);
  }
  65% {
    transform: translateX(-3px) rotate(-9deg);
  }
  80% {
    transform: translateX(2px) rotate(6deg);
  }
  100% {
    transform: translateX(0) rotate(0deg);
  }
}
`;
          hoverProperties["animation"] = "swing 1s ease 1";
        }
      }
      
      if (effect.category === "hover") {
        switch (effectName) {
          case "Grow":
            hoverProperties["transform"] = "scale(1.1)";
            hoverProperties["transition"] = "all 0.2s ease-in-out";
            break;
          case "Shrink":
            hoverProperties["transform"] = "scale(0.9)";
            hoverProperties["transition"] = "all 0.2s ease-in-out";
            break;
          case "Opacity":
            hoverProperties["opacity"] = "0.5";
            hoverProperties["transition"] = "all 0.2s ease-in-out";
            break;
          case "Rotate":
            hoverProperties["transform"] = "rotate(30deg)";
            hoverProperties["transition"] = "all 0.2s ease-in-out";
            break;
          case "Shape":
            hoverProperties["border-radius"] = "50%";
            hoverProperties["transition"] = "all 0.2s ease-in-out";
            break;
          case "Shadow":
            hoverProperties["box-shadow"] = "1px 1px #53a7ea, 2px 2px #53a7ea, 3px 3px #53a7ea";
            hoverProperties["transform"] = "translateX(-3px)";
            hoverProperties["transition"] = "all 0.2s ease-in-out";
            break;
          case "Ripple":
            hoverProperties["background"] = "#47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%";
            hoverProperties["color"] = "white";
            hoverProperties["box-shadow"] = "0 0 4px #999";
            hoverProperties["outline"] = "none";
            hoverProperties["background-position"] = "center";
            hoverProperties["transition"] = "background 0.8s";
            break;
        }
      }
      
      if (effect.category === "active") {
        switch (effectName) {
          case "Press Down":
            activeProperties["transform"] = "translateY(4px)";
            activeProperties["box-shadow"] = "0px 0px 0px 0px #1D9AF2";
            activeProperties["transition"] = "all 0.2s";
            baseCSS = baseCSS.replace("}", `
  box-shadow: 0px 4px 0px 0px #1D9AF2;
}`);
            break;
        }
      }
    });
    
    for (const [prop, value] of Object.entries(hoverProperties)) {
      hoverCSS += `\n  ${prop}: ${value};`;
    }
    hoverCSS += "\n}";
    
    for (const [prop, value] of Object.entries(activeProperties)) {
      activeCSS += `\n  ${prop}: ${value};`;
    }
    activeCSS += "\n}";
    
    let combinedCSS = keyframesCSS + baseCSS + "\n" + hoverCSS;
    if (Object.keys(activeProperties).length > 0) {
      combinedCSS += "\n" + activeCSS;
    }
    
    const combinedHTML = `<button>Combined Effect</button>`;
    
    this.setState({
      combinedCSS,
      combinedHTML
    });
  };

  getCombinedStyle = () => {
    const { selectedEffects } = this.state;
    
    let hoverTransform = "";
    let hoverStyles = [];
    let baseStyles = "";
    
    if (selectedEffects.includes("Grow")) {
      hoverTransform = "transform: scale(1.1);";
    } else if (selectedEffects.includes("Shrink")) {
      hoverTransform = "transform: scale(0.9);";
    } else if (selectedEffects.includes("Rotate")) {
      hoverTransform = "transform: rotate(30deg);";
    } else if (selectedEffects.includes("Shadow")) {
      hoverTransform = "transform: translateX(-3px);";
    }
    
    if (selectedEffects.includes("Opacity")) {
      hoverStyles.push("opacity: 0.5;");
    }
    
    if (selectedEffects.includes("Shape")) {
      hoverStyles.push("border-radius: 50%;");
    }
    
    if (selectedEffects.includes("Shadow")) {
      hoverStyles.push("box-shadow: 1px 1px #53a7ea, 2px 2px #53a7ea, 3px 3px #53a7ea;");
    }
    
    if (selectedEffects.includes("Swing")) {
      hoverStyles.push("animation: swing 1s ease 1;");
    }
    
    if (selectedEffects.includes("Ripple")) {
      hoverStyles.push("background: #47a7f5 radial-gradient(circle, transparent 1%, #47a7f5 1%) center/15000%;");
      hoverStyles.push("color: white;");
    }
    
    if (selectedEffects.includes("Press Down")) {
      baseStyles = `
        box-shadow: 0px 4px 0px 0px #1D9AF2;
      `;
    }
    
    return css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #1D9AF2;
      background-color: #292D3E;
      border: 1px solid #1D9AF2;
      border-radius: 4px;
      padding: 0 15px;
      cursor: pointer;
      height: 32px;
      font-size: 14px;
      font-weight: normal;
      transition: all 0.2s ease-in-out;
      ${baseStyles}
      
      &:hover {
        ${hoverTransform}
        ${hoverStyles.join('\n        ')}
      }
      
      ${selectedEffects.includes("Press Down") ? `
        &:active {
          transform: translateY(4px);
          box-shadow: 0px 0px 0px 0px #1D9AF2;
          transition: all 0.2s;
        }
      ` : ""}
    `;
  };

  formatCSSDisplay = (cssCode) => {
    if (!cssCode) return null;
    
    const lines = cssCode.split('\n');
    
    return (
      <div className="hl">
        <p style={{ color: "#fff", fontSize: "26px;" }}>CSS</p>
        <div
          style={{
            backgroundColor: "rgb(12, 17, 39)",
            padding: "10px",
            borderRadius: "10px"
          }}
        >
          {lines.map((line, index) => {
            if (line.includes('{')) {
              return (
                <div key={index}>
                  <span className="hl-attribute">{line}</span>
                </div>
              );
            }
            
            if (line.includes('}')) {
              return (
                <div key={index}>
                  <span className="hl-bracket">{line}</span>
                </div>
              );
            }
            
            if (line.includes('@keyframes')) {
              return (
                <div key={index}>
                  <span className="hl-keyword">{line}</span>
                </div>
              );
            }
            
            if (line.includes(':')) {
              const [property, value] = line.split(':');
              return (
                <div key={index} style={{ marginLeft: "20px" }}>
                  <span className="hl hl-property"> {property ? property.trim() : ''}:</span>
                  <span className="hl hl-value"> {value ? value.trim() : ''}</span>
                  <br />
                </div>
              );
            }
            
            return (
              <div key={index}>
                <span>{line}</span>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  render() {
    const { selectedEffects, conflicts, combinedCSS, combinedHTML, copiedCSS, copiedHTML } = this.state;

    return (
      <div className="effect-combiner">
        <div className="combiner-header">
          <h2 style={{ color: "#1d9af2", marginBottom: "20px" }}>
            <i className="fas fa-layer-group" style={{ marginRight: "10px" }}></i>
            效果组合器
          </h2>
          <p style={{ color: "#fff", marginBottom: "20px" }}>
            选择多个效果组合到同一个元素上，生成合并后的CSS代码
          </p>
        </div>
        
        <div className="combiner-content">
          <div className="effects-selection">
            <h3 style={{ color: "#fff", marginBottom: "15px" }}>选择效果</h3>
            
            <Card 
              className="selection-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-mouse-pointer" style={{ marginRight: "8px" }}></i>
                  Hover 效果 (鼠标悬停时触发)
                </span>
              }
            >
              <Checkbox.Group
                options={effectsList.filter(e => e.category === "hover").map(e => ({ label: e.name, value: e.name }))}
                value={selectedEffects}
                onChange={this.handleEffectChange}
                className="checkbox-group"
              />
            </Card>
            
            <Card 
              className="selection-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-hand-pointer" style={{ marginRight: "8px" }}></i>
                  Active 效果 (点击时触发)
                </span>
              }
            >
              <Checkbox.Group
                options={effectsList.filter(e => e.category === "active").map(e => ({ label: e.name, value: e.name }))}
                value={selectedEffects}
                onChange={this.handleEffectChange}
                className="checkbox-group"
              />
            </Card>
            
            {conflicts.length > 0 && (
              <div className="conflicts-section">
                <Alert
                  message="检测到潜在冲突"
                  description={
                    <ul>
                      {conflicts.map((conflict, index) => (
                        <li key={index}>
                          <strong>{conflict.effects.join(" + ")}</strong>: {conflict.message}
                        </li>
                      ))}
                    </ul>
                  }
                  type="warning"
                  showIcon
                />
              </div>
            )}
          </div>
          
          <div className="preview-section">
            <h3 style={{ color: "#fff", marginBottom: "15px" }}>实时预览</h3>
            
            <div className="preview-container">
              {selectedEffects.length > 0 ? (
                <div className={this.getCombinedStyle()}>
                  Combined Effect
                </div>
              ) : (
                <p style={{ color: "#999" }}>请选择至少一个效果进行预览</p>
              )}
            </div>
            
            {selectedEffects.length > 0 && (
              <div className="selected-effects-list">
                <p style={{ color: "#fff", marginBottom: "10px" }}>
                  已选择的效果 ({selectedEffects.length}):
                </p>
                <div className="effects-tags">
                  {selectedEffects.map((effect, index) => (
                    <span key={index} className="effect-tag">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {combinedCSS && (
          <div className="output-section">
            <Tabs defaultActiveKey="css">
              <TabPane tab="CSS 代码" key="css">
                <div className="code-output">
                  <CopyToClipboard
                    text={combinedCSS}
                    onCopy={() => this.setState({ copiedCSS: true })}
                  >
                    <Button
                      type="primary"
                      className="copy-button"
                      style={{ marginBottom: "15px" }}
                    >
                      {copiedCSS ? '已复制!' : '复制 CSS'}
                    </Button>
                  </CopyToClipboard>
                  
                  {this.formatCSSDisplay(combinedCSS)}
                </div>
              </TabPane>
              
              <TabPane tab="HTML 代码" key="html">
                <div className="code-output">
                  <CopyToClipboard
                    text={combinedHTML}
                    onCopy={() => this.setState({ copiedHTML: true })}
                  >
                    <Button
                      type="primary"
                      className="copy-button"
                      style={{ marginBottom: "15px" }}
                    >
                      {copiedHTML ? '已复制!' : '复制 HTML'}
                    </Button>
                  </CopyToClipboard>
                  
                  <div className="hl">
                    <p style={{ color: "#fff", fontSize: "26px;" }}>HTML</p>
                    <div
                      style={{
                        backgroundColor: "rgb(12, 17, 39)",
                        padding: "10px",
                        borderRadius: "10px"
                      }}
                    >
                      <span className="hl-bracket">{`<`}</span>
                      <span className="hl-attribute">{`button`}</span>
                      <span className="hl-bracket">{`>`}</span>
                      <span>{`Combined Effect`}</span>
                      <span className="hl-bracket">{`<`}</span>
                      <span className="hl-bracket">{`/`}</span>
                      <span className="hl-attribute">{`button `}</span>
                      <span className="hl-bracket">{`>`}</span>
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
    );
  }
}

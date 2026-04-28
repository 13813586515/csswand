import React from "react";
import { css } from "emotion";

const generateCodeDisplay = (effectName, params, cssCode) => {
  const htmlVariable = generateHtmlVariable(effectName);
  
  return (
    <div className="hl">
      <p style={{ color: "#fff", fontSize: "26px;" }}>HTML </p>
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
        <span>{`${effectName}`}</span>
        <span className="hl-bracket">{`<`}</span>
        <span className="hl-bracket">{`/`}</span>
        <span className="hl-attribute">{`button `}</span>
        <span className="hl-bracket">{`>`}</span>
      </div>
      <br />
      <br />
      <p style={{ color: "#fff", fontSize: "26px;" }}>CSS</p>
      <div
        style={{
          backgroundColor: "rgb(12, 17, 39)",
          padding: "10px",
          borderRadius: "10px"
        }}
      >
        {formatCSSCode(cssCode)}
      </div>
    </div>
  );
};

const formatCSSCode = (cssCode) => {
  const lines = cssCode.split('\n');
  
  return (
    <>
      {lines.map((line, index) => {
        // 处理注释
        if (line.trim().startsWith('/*')) {
          return (
            <div key={index}>
              <span className="hl-comment">{line}</span>
            </div>
          );
        }
        
        // 处理关键帧
        if (line.includes('@keyframes')) {
          return (
            <div key={index}>
              <span className="hl-keyword">{line}</span>
            </div>
          );
        }
        
        // 处理选择器
        if (line.includes('{')) {
          return (
            <div key={index}>
              <span className="hl-attribute">{line}</span>
            </div>
          );
        }
        
        // 处理结束括号
        if (line.includes('}')) {
          return (
            <div key={index}>
              <span className="hl-bracket">{line}</span>
            </div>
          );
        }
        
        // 处理属性值对
        if (line.includes(':')) {
          const [property, value] = line.split(':');
          return (
            <div key={index} style={{ marginLeft: "20px" }}>
              <span className="hl hl-property"> {property.trim()}:</span>
              <span className="hl hl-value"> {value ? value.trim() : ''}</span>
              <br />
            </div>
          );
        }
        
        // 处理其他行
        return (
          <div key={index}>
            <span>{line}</span>
            <br />
          </div>
        );
      })}
    </>
  );
};

const generateHtmlVariable = (effectName) => {
  if (effectName === 'Input') {
    return `<input type="text" placeholder="Input Underline" />
<span class="focus-border"></span>`;
  }
  
  return `<button>${effectName}</button>`;
};

export { generateCodeDisplay, generateHtmlVariable };

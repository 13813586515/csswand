import React, { Component } from "react";
import { Button, Slider, InputNumber, Row, Col, Card, Tabs } from "antd";
import { SketchPicker } from "react-color";
import { css } from "emotion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./ShadowGenerator.css";

const { TabPane } = Tabs;

const defaultShadowLayer = {
  offsetX: 10,
  offsetY: 10,
  blur: 5,
  spread: 0,
  color: "#000000",
  opacity: 0.3,
  inset: false
};

export default class ShadowGenerator extends Component {
  state = {
    shadowLayers: [
      { ...defaultShadowLayer, id: 1 },
      { ...defaultShadowLayer, id: 2, offsetX: 5, offsetY: 5, blur: 10, opacity: 0.2 }
    ],
    boxType: "box",
    copiedCSS: false,
    nextLayerId: 3,
    showColorPicker: {}
  };

  addShadowLayer = () => {
    const { shadowLayers, nextLayerId } = this.state;
    this.setState({
      shadowLayers: [
        ...shadowLayers,
        { ...defaultShadowLayer, id: nextLayerId }
      ],
      nextLayerId: nextLayerId + 1
    });
  };

  removeShadowLayer = (layerId) => {
    const { shadowLayers } = this.state;
    if (shadowLayers.length <= 1) return;
    
    this.setState({
      shadowLayers: shadowLayers.filter(layer => layer.id !== layerId)
    });
  };

  updateShadowLayer = (layerId, field, value) => {
    const { shadowLayers } = this.state;
    this.setState({
      shadowLayers: shadowLayers.map(layer => 
        layer.id === layerId ? { ...layer, [field]: value } : layer
      )
    });
  };

  toggleInset = (layerId) => {
    const { shadowLayers } = this.state;
    this.setState({
      shadowLayers: shadowLayers.map(layer => 
        layer.id === layerId ? { ...layer, inset: !layer.inset } : layer
      )
    });
  };

  toggleColorPicker = (layerId) => {
    const { showColorPicker } = this.state;
    this.setState({
      showColorPicker: {
        ...showColorPicker,
        [layerId]: !showColorPicker[layerId]
      }
    });
  };

  handleColorChange = (layerId, color) => {
    const { shadowLayers } = this.state;
    const updatedLayers = shadowLayers.map(layer => {
      if (layer.id === layerId) {
        const opacity = layer.opacity;
        const r = parseInt(color.hex.slice(1, 3), 16);
        const g = parseInt(color.hex.slice(3, 5), 16);
        const b = parseInt(color.hex.slice(5, 7), 16);
        return {
          ...layer,
          color: color.hex,
          rgbaColor: `rgba(${r}, ${g}, ${b}, ${opacity})`
        };
      }
      return layer;
    });
    
    this.setState({
      shadowLayers: updatedLayers
    });
  };

  handleOpacityChange = (layerId, opacity) => {
    const { shadowLayers } = this.state;
    const updatedLayers = shadowLayers.map(layer => {
      if (layer.id === layerId) {
        const color = layer.color;
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        return {
          ...layer,
          opacity,
          rgbaColor: `rgba(${r}, ${g}, ${b}, ${opacity})`
        };
      }
      return layer;
    });
    
    this.setState({
      shadowLayers: updatedLayers
    });
  };

  generateShadowCSS = () => {
    const { shadowLayers, boxType } = this.state;
    
    const shadowStrings = shadowLayers.map(layer => {
      const { offsetX, offsetY, blur, spread, inset, rgbaColor, color, opacity } = layer;
      
      let colorStr = rgbaColor;
      if (!colorStr) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        colorStr = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      
      let shadow = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${colorStr}`;
      if (inset) {
        shadow = `inset ${shadow}`;
      }
      return shadow;
    });
    
    const shadowProperty = boxType === "box" ? "box-shadow" : "text-shadow";
    const cssProperty = boxType === "box" 
      ? `${shadowProperty}: ${shadowStrings.join(', ')};`
      : `${shadowProperty}: ${shadowStrings.map(s => s.replace(/\s+\d+px$/, '')).join(', ')};`;
    
    return cssProperty;
  };

  generatePreviewStyle = () => {
    const { shadowLayers, boxType } = this.state;
    
    const shadowStrings = shadowLayers.map(layer => {
      const { offsetX, offsetY, blur, spread, inset, rgbaColor, color, opacity } = layer;
      
      let colorStr = rgbaColor;
      if (!colorStr) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        colorStr = `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      
      let shadow = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${colorStr}`;
      if (inset) {
        shadow = `inset ${shadow}`;
      }
      return shadow;
    });
    
    return css`
      ${boxType === "box" ? "box-shadow" : "text-shadow"}: ${shadowStrings.join(', ')};
      background-color: #292D3E;
      border: 1px solid #1D9AF2;
      color: #1D9AF2;
      padding: 20px 40px;
      border-radius: 8px;
      font-size: 18px;
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-2px);
      }
    `;
  };

  formatCSSDisplay = (cssCode) => {
    if (!cssCode) return null;
    
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
          <span className="hl-attribute">{`element `}</span>
          <span className="hl-bracket">{`{`}</span> <br />
          <div style={{ marginLeft: "20px" }}>
            <span className="hl hl-property"> box-shadow:</span>
            <span className="hl hl-value"> {cssCode.replace('box-shadow: ', '').replace(';', '')}</span>
            <br />
          </div>
          <span className="hl-bracket">{`}`}</span>
        </div>
      </div>
    );
  };

  render() {
    const { shadowLayers, boxType, copiedCSS, showColorPicker } = this.state;
    const shadowCSS = this.generateShadowCSS();

    return (
      <div className="shadow-generator">
        <div className="generator-header">
          <h2 style={{ color: "#1d9af2", marginBottom: "20px" }}>
            <i className="fas fa-cloud" style={{ marginRight: "10px" }}></i>
            多层级阴影生成器
          </h2>
          <p style={{ color: "#fff", marginBottom: "20px" }}>
            创建可叠加的多层级阴影效果，支持box-shadow和text-shadow
          </p>
        </div>
        
        <div className="generator-content">
          <div className="controls-section">
            <Card 
              className="control-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-cog" style={{ marginRight: "8px" }}></i>
                  全局设置
                </span>
              }
            >
              <div className="control-row">
                <label className="control-label">阴影类型</label>
                <select
                  value={boxType}
                  onChange={(e) => this.setState({ boxType: e.target.value })}
                  className="control-select"
                >
                  <option value="box">Box Shadow (盒子阴影)</option>
                  <option value="text">Text Shadow (文字阴影)</option>
                </select>
              </div>
            </Card>
            
            {shadowLayers.map((layer, index) => (
              <Card 
                key={layer.id}
                className="control-card"
                title={
                  <span style={{ color: "#fff" }}>
                    <i className="fas fa-layer-group" style={{ marginRight: "8px" }}></i>
                    阴影层 {index + 1}
                  </span>
                }
                extra={
                  shadowLayers.length > 1 ? (
                    <Button 
                      type="danger" 
                      size="small"
                      onClick={() => this.removeShadowLayer(layer.id)}
                    >
                      删除
                    </Button>
                  ) : null
                }
              >
                <div className="control-grid">
                  <div className="control-item">
                    <label className="control-label">X 偏移 (px)</label>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={-50}
                          max={50}
                          value={layer.offsetX}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'offsetX', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={-50}
                          max={50}
                          value={layer.offsetX}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'offsetX', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="control-item">
                    <label className="control-label">Y 偏移 (px)</label>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={-50}
                          max={50}
                          value={layer.offsetY}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'offsetY', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={-50}
                          max={50}
                          value={layer.offsetY}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'offsetY', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="control-item">
                    <label className="control-label">模糊半径 (px)</label>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={100}
                          value={layer.blur}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'blur', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={100}
                          value={layer.blur}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'blur', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="control-item">
                    <label className="control-label">扩展半径 (px)</label>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={-50}
                          max={50}
                          value={layer.spread}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'spread', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={-50}
                          max={50}
                          value={layer.spread}
                          onChange={(value) => this.updateShadowLayer(layer.id, 'spread', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="control-item">
                    <label className="control-label">颜色</label>
                    <div className="color-picker-container">
                      <div
                        className="color-preview"
                        style={{
                          backgroundColor: layer.color,
                          opacity: layer.opacity
                        }}
                        onClick={() => this.toggleColorPicker(layer.id)}
                      />
                      <span className="color-value">{layer.color}</span>
                      
                      {showColorPicker[layer.id] && (
                        <div className="color-picker-overlay">
                          <SketchPicker
                            disableAlpha={true}
                            color={layer.color}
                            onChangeComplete={(color) => this.handleColorChange(layer.id, color)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="control-item">
                    <label className="control-label">透明度</label>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={1}
                          step={0.01}
                          value={layer.opacity}
                          onChange={(value) => this.handleOpacityChange(layer.id, value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={1}
                          step={0.01}
                          value={layer.opacity}
                          onChange={(value) => this.handleOpacityChange(layer.id, value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  {boxType === "box" && (
                    <div className="control-item">
                      <label className="control-label">内阴影</label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={layer.inset}
                          onChange={() => this.toggleInset(layer.id)}
                        />
                        <span>启用内阴影</span>
                      </label>
                    </div>
                  )}
                </div>
              </Card>
            ))}
            
            <Button
              type="primary"
              icon="plus"
              onClick={this.addShadowLayer}
              className="add-layer-button"
              block
            >
              添加阴影层
            </Button>
          </div>
          
          <div className="preview-section">
            <Card 
              className="preview-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-eye" style={{ marginRight: "8px" }}></i>
                  实时预览
                </span>
              }
            >
              <div className="preview-container">
                <Button
                  className={this.generatePreviewStyle()}
                >
                  {boxType === "box" ? "预览效果" : "Text Shadow Preview"}
                </Button>
              </div>
            </Card>
            
            <Card 
              className="code-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-code" style={{ marginRight: "8px" }}></i>
                  生成的代码
                </span>
              }
            >
              <CopyToClipboard
                text={`.element {\n  ${shadowCSS}\n}`}
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
              
              {this.formatCSSDisplay(shadowCSS)}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

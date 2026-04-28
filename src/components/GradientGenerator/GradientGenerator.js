import React, { Component } from "react";
import { Button, Slider, InputNumber, Row, Col, Card, Tabs, Select, Input } from "antd";
import { SketchPicker } from "react-color";
import { css } from "emotion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./GradientGenerator.css";

const { TabPane } = Tabs;
const { Option } = Select;

const defaultColorStop = {
  color: "#1D9AF2",
  position: 0,
  id: 1
};

const defaultColorStops = [
  { color: "#1D9AF2", position: 0, id: 1 },
  { color: "#292D3E", position: 100, id: 2 }
];

export default class GradientGenerator extends Component {
  state = {
    gradientType: "linear",
    angle: 180,
    direction: "to bottom",
    shape: "ellipse",
    position: "center",
    colorStops: [...defaultColorStops],
    nextStopId: 3,
    showColorPicker: {},
    copiedCSS: false
  };

  addColorStop = () => {
    const { colorStops, nextStopId } = this.state;
    const newPosition = Math.floor(100 / (colorStops.length + 1));
    
    this.setState({
      colorStops: [
        ...colorStops,
        { 
          color: this.getRandomColor(), 
          position: newPosition, 
          id: nextStopId 
        }
      ],
      nextStopId: nextStopId + 1
    });
  };

  removeColorStop = (stopId) => {
    const { colorStops } = this.state;
    if (colorStops.length <= 2) return;
    
    this.setState({
      colorStops: colorStops.filter(stop => stop.id !== stopId)
    });
  };

  updateColorStop = (stopId, field, value) => {
    const { colorStops } = this.state;
    this.setState({
      colorStops: colorStops.map(stop => 
        stop.id === stopId ? { ...stop, [field]: value } : stop
      )
    });
  };

  toggleColorPicker = (stopId) => {
    const { showColorPicker } = this.state;
    this.setState({
      showColorPicker: {
        ...showColorPicker,
        [stopId]: !showColorPicker[stopId]
      }
    });
  };

  handleColorChange = (stopId, color) => {
    this.updateColorStop(stopId, 'color', color.hex);
  };

  getRandomColor = () => {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", 
      "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
      "#BB8FCE", "#85C1E9", "#F8B500", "#FF69B4"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  generateGradientCSS = () => {
    const { gradientType, angle, direction, shape, position, colorStops } = this.state;
    
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const colorStopsString = sortedStops.map(stop => 
      `${stop.color} ${stop.position}%`
    ).join(', ');
    
    if (gradientType === "linear") {
      return `background: linear-gradient(${angle}deg, ${colorStopsString});`;
    } else {
      return `background: radial-gradient(${shape} at ${position}, ${colorStopsString});`;
    }
  };

  generatePreviewStyle = () => {
    const { gradientType, angle, direction, shape, position, colorStops } = this.state;
    
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const colorStopsString = sortedStops.map(stop => 
      `${stop.color} ${stop.position}%`
    ).join(', ');
    
    let gradient;
    if (gradientType === "linear") {
      gradient = `linear-gradient(${angle}deg, ${colorStopsString})`;
    } else {
      gradient = `radial-gradient(${shape} at ${position}, ${colorStopsString})`;
    }
    
    return css`
      background: ${gradient};
      color: #fff;
      padding: 40px 60px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      border: none;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
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
            <span className="hl hl-property"> {cssCode.split(':')[0].trim()}:</span>
            <span className="hl hl-value"> {cssCode.split(':').slice(1).join(':').replace(';', '')}</span>
            <br />
          </div>
          <span className="hl-bracket">{`}`}</span>
        </div>
      </div>
    );
  };

  render() {
    const { 
      gradientType, 
      angle, 
      shape, 
      position, 
      colorStops, 
      showColorPicker, 
      copiedCSS 
    } = this.state;
    const gradientCSS = this.generateGradientCSS();

    return (
      <div className="gradient-generator">
        <div className="generator-header">
          <h2 style={{ color: "#1d9af2", marginBottom: "20px" }}>
            <i className="fas fa-palette" style={{ marginRight: "10px" }}></i>
            渐变生成器
          </h2>
          <p style={{ color: "#fff", marginBottom: "20px" }}>
            创建线性渐变或径向渐变，支持多色标
          </p>
        </div>
        
        <div className="generator-content">
          <div className="controls-section">
            <Card 
              className="control-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-cog" style={{ marginRight: "8px" }}></i>
                  渐变设置
                </span>
              }
            >
              <div className="control-grid">
                <div className="control-item">
                  <label className="control-label">渐变类型</label>
                  <Select
                    value={gradientType}
                    onChange={(value) => this.setState({ gradientType: value })}
                    style={{ width: '100%' }}
                  >
                    <Option value="linear">线性渐变 (Linear)</Option>
                    <Option value="radial">径向渐变 (Radial)</Option>
                  </Select>
                </div>
                
                {gradientType === "linear" && (
                  <div className="control-item">
                    <label className="control-label">角度 (deg)</label>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={360}
                          value={angle}
                          onChange={(value) => this.setState({ angle: value })}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={360}
                          value={angle}
                          onChange={(value) => this.setState({ angle: value })}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
                
                {gradientType === "radial" && (
                  <>
                    <div className="control-item">
                      <label className="control-label">形状</label>
                      <Select
                        value={shape}
                        onChange={(value) => this.setState({ shape: value })}
                        style={{ width: '100%' }}
                      >
                        <Option value="ellipse">椭圆 (Ellipse)</Option>
                        <Option value="circle">圆形 (Circle)</Option>
                      </Select>
                    </div>
                    
                    <div className="control-item">
                      <label className="control-label">位置</label>
                      <Select
                        value={position}
                        onChange={(value) => this.setState({ position: value })}
                        style={{ width: '100%' }}
                      >
                        <Option value="center">中心 (Center)</Option>
                        <Option value="top">顶部 (Top)</Option>
                        <Option value="bottom">底部 (Bottom)</Option>
                        <Option value="left">左侧 (Left)</Option>
                        <Option value="right">右侧 (Right)</Option>
                        <Option value="top left">左上 (Top Left)</Option>
                        <Option value="top right">右上 (Top Right)</Option>
                        <Option value="bottom left">左下 (Bottom Left)</Option>
                        <Option value="bottom right">右下 (Bottom Right)</Option>
                      </Select>
                    </div>
                  </>
                )}
              </div>
            </Card>
            
            <Card 
              className="control-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-palette" style={{ marginRight: "8px" }}></i>
                  色标设置
                </span>
              }
            >
              {colorStops.map((stop, index) => (
                <div key={stop.id} className="color-stop-row">
                  <div className="stop-index">
                    <span>{index + 1}</span>
                  </div>
                  
                  <div className="color-picker-container">
                    <div
                      className="color-preview"
                      style={{
                        backgroundColor: stop.color
                      }}
                      onClick={() => this.toggleColorPicker(stop.id)}
                    />
                    
                    {showColorPicker[stop.id] && (
                      <div className="color-picker-overlay">
                        <SketchPicker
                          disableAlpha={true}
                          color={stop.color}
                          onChangeComplete={(color) => this.handleColorChange(stop.id, color)}
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="position-control">
                    <label className="control-label">位置 (%)</label>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={100}
                          value={stop.position}
                          onChange={(value) => this.updateColorStop(stop.id, 'position', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={100}
                          value={stop.position}
                          onChange={(value) => this.updateColorStop(stop.id, 'position', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  {colorStops.length > 2 && (
                    <Button 
                      type="danger" 
                      size="small"
                      icon="delete"
                      onClick={() => this.removeColorStop(stop.id)}
                      className="remove-stop-button"
                    />
                  )}
                </div>
              ))}
              
              <Button
                type="primary"
                icon="plus"
                onClick={this.addColorStop}
                className="add-stop-button"
                block
              >
                添加色标
              </Button>
            </Card>
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
                  渐变预览
                </Button>
              </div>
              
              <div className="gradient-bar">
                <div 
                  className="gradient-preview-bar"
                  style={{
                    background: gradientCSS.replace('background: ', '').replace(';', '')
                  }}
                />
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
                text={`.element {\n  ${gradientCSS}\n}`}
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
              
              {this.formatCSSDisplay(gradientCSS)}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

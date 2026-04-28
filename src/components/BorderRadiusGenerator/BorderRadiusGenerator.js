import React, { Component } from "react";
import { Button, Slider, InputNumber, Row, Col, Card, Checkbox, Input } from "antd";
import { css } from "emotion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./BorderRadiusGenerator.css";

const { CheckboxGroup } = Checkbox;

export default class BorderRadiusGenerator extends Component {
  state = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
    allCorners: 0,
    lockAllCorners: false,
    copiedCSS: false,
    backgroundColor: "#292D3E",
    borderColor: "#1D9AF2"
  };

  handleCornerChange = (corner, value) => {
    const { lockAllCorners } = this.state;
    
    if (lockAllCorners) {
      this.setState({
        allCorners: value,
        topLeft: value,
        topRight: value,
        bottomLeft: value,
        bottomRight: value
      });
    } else {
      this.setState({
        [corner]: value
      });
    }
  };

  toggleLockAllCorners = (e) => {
    const checked = e.target.checked;
    
    if (checked) {
      const { topLeft, topRight, bottomLeft, bottomRight } = this.state;
      const average = Math.floor((topLeft + topRight + bottomLeft + bottomRight) / 4);
      
      this.setState({
        lockAllCorners: true,
        allCorners: average,
        topLeft: average,
        topRight: average,
        bottomLeft: average,
        bottomRight: average
      });
    } else {
      this.setState({
        lockAllCorners: false
      });
    }
  };

  generateBorderRadiusCSS = () => {
    const { topLeft, topRight, bottomLeft, bottomRight } = this.state;
    
    if (topLeft === topRight && topRight === bottomLeft && bottomLeft === bottomRight) {
      return `border-radius: ${topLeft}px;`;
    }
    
    return `border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`;
  };

  generatePreviewStyle = () => {
    const { topLeft, topRight, bottomLeft, bottomRight, backgroundColor, borderColor } = this.state;
    
    return css`
      border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;
      background-color: ${backgroundColor};
      border: 2px solid ${borderColor};
      color: ${borderColor};
      padding: 40px 60px;
      font-size: 18px;
      font-weight: bold;
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
            <span className="hl hl-property"> border-radius:</span>
            <span className="hl hl-value"> {cssCode.replace('border-radius: ', '').replace(';', '')}</span>
            <br />
          </div>
          <span className="hl-bracket">{`}`}</span>
        </div>
      </div>
    );
  };

  render() {
    const { 
      topLeft, 
      topRight, 
      bottomLeft, 
      bottomRight, 
      allCorners,
      lockAllCorners, 
      copiedCSS,
      backgroundColor,
      borderColor
    } = this.state;
    const borderRadiusCSS = this.generateBorderRadiusCSS();

    return (
      <div className="border-radius-generator">
        <div className="generator-header">
          <h2 style={{ color: "#1d9af2", marginBottom: "20px" }}>
            <i className="fas fa-square" style={{ marginRight: "10px" }}></i>
            圆角生成器
          </h2>
          <p style={{ color: "#fff", marginBottom: "20px" }}>
            独立控制四个角的圆角大小，支持锁定所有角同步调整
          </p>
        </div>
        
        <div className="generator-content">
          <div className="controls-section">
            <Card 
              className="control-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-cog" style={{ marginRight: "8px" }}></i>
                  圆角设置
                </span>
              }
            >
              <div className="lock-control">
                <Checkbox
                  checked={lockAllCorners}
                  onChange={this.toggleLockAllCorners}
                >
                  <span style={{ color: "#fff" }}>锁定所有角同步调整</span>
                </Checkbox>
              </div>
              
              {lockAllCorners ? (
                <div className="control-item">
                  <label className="control-label">所有角 (px)</label>
                  <Row gutter={8}>
                    <Col span={16}>
                      <Slider
                        min={0}
                        max={200}
                        value={allCorners}
                        onChange={(value) => this.handleCornerChange('allCorners', value)}
                      />
                    </Col>
                    <Col span={8}>
                      <InputNumber
                        min={0}
                        max={200}
                        value={allCorners}
                        onChange={(value) => this.handleCornerChange('allCorners', value)}
                        style={{ width: '100%' }}
                      />
                    </Col>
                  </Row>
                </div>
              ) : (
                <div className="corners-grid">
                  <div className="corner-card">
                    <div className="corner-label">
                      <i className="fas fa-square" style={{ 
                        borderRadius: `${topLeft}px 0 0 0`,
                        backgroundColor: '#1d9af2',
                        width: '30px',
                        height: '30px',
                        display: 'inline-block',
                        marginRight: '8px'
                      }}></i>
                      左上角 (Top Left)
                    </div>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={200}
                          value={topLeft}
                          onChange={(value) => this.handleCornerChange('topLeft', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={200}
                          value={topLeft}
                          onChange={(value) => this.handleCornerChange('topLeft', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="corner-card">
                    <div className="corner-label">
                      <i className="fas fa-square" style={{ 
                        borderRadius: `0 ${topRight}px 0 0`,
                        backgroundColor: '#1d9af2',
                        width: '30px',
                        height: '30px',
                        display: 'inline-block',
                        marginRight: '8px'
                      }}></i>
                      右上角 (Top Right)
                    </div>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={200}
                          value={topRight}
                          onChange={(value) => this.handleCornerChange('topRight', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={200}
                          value={topRight}
                          onChange={(value) => this.handleCornerChange('topRight', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="corner-card">
                    <div className="corner-label">
                      <i className="fas fa-square" style={{ 
                        borderRadius: `0 0 0 ${bottomLeft}px`,
                        backgroundColor: '#1d9af2',
                        width: '30px',
                        height: '30px',
                        display: 'inline-block',
                        marginRight: '8px'
                      }}></i>
                      左下角 (Bottom Left)
                    </div>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={200}
                          value={bottomLeft}
                          onChange={(value) => this.handleCornerChange('bottomLeft', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={200}
                          value={bottomLeft}
                          onChange={(value) => this.handleCornerChange('bottomLeft', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                  
                  <div className="corner-card">
                    <div className="corner-label">
                      <i className="fas fa-square" style={{ 
                        borderRadius: `0 0 ${bottomRight}px 0`,
                        backgroundColor: '#1d9af2',
                        width: '30px',
                        height: '30px',
                        display: 'inline-block',
                        marginRight: '8px'
                      }}></i>
                      右下角 (Bottom Right)
                    </div>
                    <Row gutter={8}>
                      <Col span={16}>
                        <Slider
                          min={0}
                          max={200}
                          value={bottomRight}
                          onChange={(value) => this.handleCornerChange('bottomRight', value)}
                        />
                      </Col>
                      <Col span={8}>
                        <InputNumber
                          min={0}
                          max={200}
                          value={bottomRight}
                          onChange={(value) => this.handleCornerChange('bottomRight', value)}
                          style={{ width: '100%' }}
                        />
                      </Col>
                    </Row>
                  </div>
                </div>
              )}
            </Card>
            
            <Card 
              className="control-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-palette" style={{ marginRight: "8px" }}></i>
                  外观设置
                </span>
              }
            >
              <div className="appearance-grid">
                <div className="control-item">
                  <label className="control-label">背景颜色</label>
                  <Input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => this.setState({ backgroundColor: e.target.value })}
                    className="color-input"
                  />
                </div>
                
                <div className="control-item">
                  <label className="control-label">边框/文字颜色</label>
                  <Input
                    type="color"
                    value={borderColor}
                    onChange={(e) => this.setState({ borderColor: e.target.value })}
                    className="color-input"
                  />
                </div>
              </div>
            </Card>
            
            <Card 
              className="presets-card"
              title={
                <span style={{ color: "#fff" }}>
                  <i className="fas fa-star" style={{ marginRight: "8px" }}></i>
                  预设形状
                </span>
              }
            >
              <div className="presets-grid">
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 0,
                    topRight: 0,
                    bottomLeft: 0,
                    bottomRight: 0,
                    allCorners: 0,
                    lockAllCorners: false
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: 0 }}></div>
                  <span>直角</span>
                </Button>
                
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 8,
                    topRight: 8,
                    bottomLeft: 8,
                    bottomRight: 8,
                    allCorners: 8,
                    lockAllCorners: true
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: '8px' }}></div>
                  <span>小圆角</span>
                </Button>
                
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 20,
                    topRight: 20,
                    bottomLeft: 20,
                    bottomRight: 20,
                    allCorners: 20,
                    lockAllCorners: true
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: '20px' }}></div>
                  <span>大圆角</span>
                </Button>
                
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 50,
                    topRight: 50,
                    bottomLeft: 50,
                    bottomRight: 50,
                    allCorners: 50,
                    lockAllCorners: true
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: '50%' }}></div>
                  <span>圆形</span>
                </Button>
                
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 50,
                    topRight: 50,
                    bottomLeft: 0,
                    bottomRight: 0,
                    allCorners: 0,
                    lockAllCorners: false
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: '50px 50px 0 0' }}></div>
                  <span>上圆角</span>
                </Button>
                
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 0,
                    topRight: 0,
                    bottomLeft: 50,
                    bottomRight: 50,
                    allCorners: 0,
                    lockAllCorners: false
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: '0 0 50px 50px' }}></div>
                  <span>下圆角</span>
                </Button>
                
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 50,
                    topRight: 0,
                    bottomLeft: 50,
                    bottomRight: 0,
                    allCorners: 0,
                    lockAllCorners: false
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: '50px 0 50px 0' }}></div>
                  <span>左圆角</span>
                </Button>
                
                <Button
                  className="preset-button"
                  onClick={() => this.setState({
                    topLeft: 0,
                    topRight: 50,
                    bottomLeft: 0,
                    bottomRight: 50,
                    allCorners: 0,
                    lockAllCorners: false
                  })}
                >
                  <div className="preset-preview" style={{ borderRadius: '0 50px 0 50px' }}></div>
                  <span>右圆角</span>
                </Button>
              </div>
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
                  圆角预览
                </Button>
              </div>
              
              <div className="code-display">
                <div className="code-info">
                  <span className="code-label">CSS 值:</span>
                  <span className="code-value">{borderRadiusCSS}</span>
                </div>
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
                text={`.element {\n  ${borderRadiusCSS}\n}`}
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
              
              {this.formatCSSDisplay(borderRadiusCSS)}
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

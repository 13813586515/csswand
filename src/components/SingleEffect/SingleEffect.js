import React, { Component } from "react";

import { Modal, Button, Icon, Tabs } from "antd";
import "./SingleEffect.css";
import { css } from "emotion";

import { CopyToClipboard } from "react-copy-to-clipboard";
import ParameterEditor from "../ParameterEditor/ParameterEditor";
import { parameterConfig, getDefaultParams } from "../../utils/parameterConfig";
import { generateCSS } from "../../utils/cssGenerator";
import { generateCodeDisplay, generateHtmlVariable } from "../../utils/codeDisplay";

const { TabPane } = Tabs;

export default class SingleEffect extends Component {
  state = { 
    visible: false,
    params: {},
    currentCSS: '',
    currentHtml: ''
  };

  showModal = () => {
    const effectName = this.props.Title;
    const defaultParams = getDefaultParams(effectName);
    const generatedCSS = generateCSS(effectName, defaultParams);
    const generatedHtml = generateHtmlVariable(effectName);
    
    this.setState({
      visible: true,
      copiedHTML: false,
      copiedCSS: false,
      params: defaultParams,
      currentCSS: generatedCSS,
      currentHtml: generatedHtml
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  handleParamChange = (paramName, value) => {
    const newParams = {
      ...this.state.params,
      [paramName]: value
    };
    
    const effectName = this.props.Title;
    const generatedCSS = generateCSS(effectName, newParams);
    
    this.setState({
      params: newParams,
      currentCSS: generatedCSS,
      copiedHTML: false,
      copiedCSS: false
    });
  };

  getPreviewStyle = (effectName) => {
    const { params } = this.state;
    const primaryColor = params.primaryColor || '#1D9AF2';
    const backgroundColor = params.backgroundColor || '#292D3E';
    const borderRadius = params.borderRadius !== undefined ? `${params.borderRadius}px` : '4px';
    const duration = params.duration || 0.2;

    let hoverStyle = '';
    let activeStyle = '';

    switch (effectName) {
      case 'Grow':
        hoverStyle = `transform: scale(${params.scale || 1.1});`;
        break;
      case 'Shrink':
        hoverStyle = `transform: scale(${params.scale || 0.9});`;
        break;
      case 'Opacity':
        hoverStyle = `opacity: ${params.opacity || 0.5};`;
        break;
      case 'Rotate':
        hoverStyle = `transform: rotate(${params.angle || 30}deg);`;
        break;
      case 'Shape':
        hoverStyle = `border-radius: ${params.borderRadius || 50}%;`;
        break;
      case 'Shadow':
        const shadowX = params.shadowOffsetX || 1;
        const shadowY = params.shadowOffsetY || 1;
        const shadowBlur = params.shadowBlur || 0;
        const shadowColor = params.shadowColor || '#53a7ea';
        hoverStyle = `box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}, ${shadowX * 2}px ${shadowY * 2}px ${shadowBlur}px ${shadowColor}, ${shadowX * 3}px ${shadowY * 3}px ${shadowBlur}px ${shadowColor}; transform: translateX(${-shadowX * 3}px);`;
        break;
      case 'Swing':
        hoverStyle = `animation: swing ${params.duration || 1.0}s ease 1;`;
        break;
      case 'Ripple':
        const rippleColor = params.rippleColor || '#47a7f5';
        hoverStyle = `background: ${rippleColor} radial-gradient(circle, transparent 1%, ${rippleColor} 1%) center/15000%; color: white;`;
        activeStyle = `background-color: ${backgroundColor}; background-size: 100%; transition: background 0s;`;
        break;
      case 'Press Down':
        const pressOffset = params.pressOffset || 4;
        activeStyle = `transform: translateY(${pressOffset}px); box-shadow: 0px 0px 0px 0px ${primaryColor};`;
        break;
      default:
        break;
    }

    return css`
      color: ${primaryColor};
      background-color: ${backgroundColor};
      border: 1px solid ${primaryColor};
      border-radius: ${borderRadius};
      padding: 0 15px;
      cursor: pointer;
      height: 32px;
      font-size: 14px;
      transition: all ${duration}s ease-in-out;
      ${effectName === 'Press Down' ? `box-shadow: 0px ${params.pressOffset || 4}px 0px 0px ${primaryColor};` : ''}
      ${effectName === 'Ripple' ? `box-shadow: 0 0 4px #999; outline: none; background-position: center; transition: background ${duration}s;` : ''}
      
      &:hover {
        ${hoverStyle}
      }
      
      &:active {
        ${activeStyle}
      }
    `;
  };

  render() {
    const effectName = this.props.Title;
    const hasParameters = parameterConfig[effectName] && parameterConfig[effectName].parameters;
    const codeDisplay = generateCodeDisplay(effectName, this.state.params, this.state.currentCSS);
    return (
      <div>
        <div
          onClick={this.showModal}
          className={this.props.Title === "Input" ? "input-top" : null}
        >
          {this.props.Title === "Input" ? (
            <div className="col-3" onClick={event => event.stopPropagation()}>
              <input
                className="effect-1"
                type="text"
                placeholder="Input Underline"
              />
              <span className="focus-border" />
            </div>
          ) : (
            <Button
              type="ghost"
              className={this.props.Style}
              onClick={this.showModal}
            >
              {this.props.Title === "Spinner" ? null : this.props.Title}
            </Button>
          )}
        </div>

        <Modal
          title={this.props.Title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={hasParameters ? 900 : 520}
          footer={[
            <Button key="copyHtml" type="primary" onClick={() => {
              navigator.clipboard.writeText(this.state.currentHtml || this.props.htmlVariable);
              this.setState({ copiedHTML: true });
              setTimeout(() => this.setState({ copiedHTML: false }), 2000);
            }}>
              {this.state.copiedHTML ? 'HTML已复制!' : '复制HTML'}
            </Button>,
            <Button key="copyCss" type="primary" onClick={() => {
              navigator.clipboard.writeText(this.state.currentCSS || this.props.cssVariable);
              this.setState({ copiedCSS: true });
              setTimeout(() => this.setState({ copiedCSS: false }), 2000);
            }}>
              {this.state.copiedCSS ? 'CSS已复制!' : '复制CSS'}
            </Button>
          ]}
        >
          {hasParameters ? (
            <Tabs defaultActiveKey="code">
              <TabPane tab="代码" key="code">
                <div className="modal-content">
                  {codeDisplay || this.props.Code}
                </div>
              </TabPane>
              <TabPane tab="参数设置" key="params">
                <div className="parameter-panel">
                  <ParameterEditor
                    parameters={parameterConfig[effectName].parameters}
                    params={this.state.params}
                    onParamChange={this.handleParamChange}
                  />
                  
                  <div className="preview-section">
                    <h3 style={{ color: '#fff', marginBottom: '15px' }}>实时预览</h3>
                    <div className="preview-container">
                      {effectName === "Input" ? (
                        <div className="col-3" style={{ float: 'none', margin: '0 auto' }}>
                          <input
                            className="effect-1"
                            type="text"
                            placeholder="Input Underline"
                            style={{
                              color: this.state.params.textColor || '#1D9AF2',
                              borderBottomWidth: `${this.state.params.borderWidth || 1}px`
                            }}
                          />
                          <span 
                            className="focus-border"
                            style={{
                              height: `${this.state.params.borderWidth || 1}px`,
                              backgroundColor: this.state.params.focusColor || '#3399FF'
                            }}
                          />
                        </div>
                      ) : (
                        <Button
                          type="ghost"
                          className={this.getPreviewStyle(effectName)}
                        >
                          {effectName === "Spinner" ? null : effectName}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          ) : (
            <div className="modal-content">
              {this.props.Code}
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

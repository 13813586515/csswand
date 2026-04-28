import React, { Component } from "react";

<<<<<<< HEAD
import { Modal, Button, Icon, Checkbox, message } from "antd";
=======
import { Modal, Button, Icon, Tabs } from "antd";
>>>>>>> 3ab4ba592f11d8e2e4cda5102668c4fe308e8b11
import "./SingleEffect.css";
import { css } from "emotion";

import { CopyToClipboard } from "react-copy-to-clipboard";
<<<<<<< HEAD
import ComponentExporter from "../ComponentExporter/ComponentExporter";
import { convertToCSSVariables, generateThemeCSS, downloadFile } from "../../utils/themeVariables";
=======
import ParameterEditor from "../ParameterEditor/ParameterEditor";
import { parameterConfig, getDefaultParams } from "../../utils/parameterConfig";
import { generateCSS } from "../../utils/cssGenerator";
import { generateCodeDisplay, generateHtmlVariable } from "../../utils/codeDisplay";

const { TabPane } = Tabs;
>>>>>>> 3ab4ba592f11d8e2e4cda5102668c4fe308e8b11

export default class SingleEffect extends Component {
  state = { 
    visible: false,
<<<<<<< HEAD
    useCSSVariables: false,
    showVariableCSS: false
=======
    params: {},
    currentCSS: '',
    currentHtml: ''
>>>>>>> 3ab4ba592f11d8e2e4cda5102668c4fe308e8b11
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
<<<<<<< HEAD
      copiedVariableCSS: false
=======
      params: defaultParams,
      currentCSS: generatedCSS,
      currentHtml: generatedHtml
>>>>>>> 3ab4ba592f11d8e2e4cda5102668c4fe308e8b11
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

<<<<<<< HEAD
  handleCSSVariablesChange = (e) => {
    this.setState({ useCSSVariables: e.target.checked });
  };

  handleToggleVariableCSS = () => {
    this.setState(prev => ({ showVariableCSS: !prev.showVariableCSS }));
  };

  handleDownloadTheme = () => {
    const themeCSS = generateThemeCSS();
    downloadFile(themeCSS, 'theme-variables.css', 'text/css');
    message.success('主题变量文件已下载');
  };

  render() {
    const { useCSSVariables, showVariableCSS } = this.state;
    const variableCSS = convertToCSSVariables(this.props.cssVariable);

    const currentCSS = useCSSVariables ? variableCSS : this.props.cssVariable;
    const cssTopPosition = this.props.Title === "Input" ? 330 : 210;

=======
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

  render() {
    const effectName = this.props.Title;
    const hasParameters = parameterConfig[effectName] && parameterConfig[effectName].parameters;
    const codeDisplay = generateCodeDisplay(effectName, this.state.params, this.state.currentCSS);
>>>>>>> 3ab4ba592f11d8e2e4cda5102668c4fe308e8b11
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
<<<<<<< HEAD
          width={700}
          footer={[
            <Button key="cancel" onClick={this.handleCancel}>
              关闭
            </Button>,
            <ComponentExporter
              key="exporter"
              effectTitle={this.props.Title}
              htmlVariable={this.props.htmlVariable}
              cssVariable={this.props.cssVariable}
            />
          ]}
        >
          {/* Options Bar */}
          <div
            className={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #292d3e;
            `}
          >
            <div
              className={css`
                display: flex;
                align-items: center;
                gap: 15px;
              `}
            >
              <Checkbox
                checked={useCSSVariables}
                onChange={this.handleCSSVariablesChange}
              >
                使用 CSS 变量
              </Checkbox>
              
              {useCSSVariables && (
                <Button
                  type="link"
                  size="small"
                  onClick={this.handleDownloadTheme}
                  className={css`
                    color: #1d9af2;
                    padding: 0;
                    height: auto;
                  `}
                >
                  <Icon type="download" /> 下载主题变量
                </Button>
              )}
            </div>

            {useCSSVariables && (
              <Button
                type="link"
                size="small"
                onClick={this.handleToggleVariableCSS}
                className={css`
                  color: #ff9800;
                  padding: 0;
                  height: auto;
                `}
              >
                {showVariableCSS ? '隐藏变量版本' : '显示变量版本'}
              </Button>
            )}
          </div>

          {/* HTML Copy */}
          <CopyToClipboard
            text={this.props.htmlVariable}
            onCopy={() => this.setState({ copiedHTML: true })}
          >
            {this.state.copiedHTML ? (
              <span
                className={css`
                  @keyframes fade-in-right {
                    from {
                      opacity: 0;
                      transform: translateX(-15px);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0);
                    }
                  }

                  @keyframes grow-left {
                    from {
                      transform: scaleX(0);
                    }
                    to {
                      transform: scaleX(1);
                    }
                  }
                  opacity: 0;
                  animation: fade-in-right ease 0.4s forwards;
                  float: right;
                  color: #1d9af2;
                `}
              >
                Copied
              </span>
            ) : (
              <Icon
                type="copy"
                className={css`
                  float: right;
                  font-size: 26px;
                `}
              />
            )}
          </CopyToClipboard>

          <>{this.props.Code}</>

          {/* CSS Copy - with variable support */}
          <CopyToClipboard
            text={currentCSS}
            onCopy={() => this.setState({ 
              copiedCSS: true,
              copiedVariableCSS: useCSSVariables 
            })}
          >
            {this.state.copiedCSS && this.state.copiedVariableCSS === useCSSVariables ? (
              <span
                className={css`
                  @keyframes fade-in-right {
                    from {
                      opacity: 0;
                      transform: translateX(-15px);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0);
                    }
                  }

                  @keyframes grow-left {
                    from {
                      transform: scaleX(0);
                    }
                    to {
                      transform: scaleX(1);
                    }
                  }
                  opacity: 0;
                  animation: fade-in-right ease 0.4s forwards;
                  float: right;
                  color: #1d9af2;
                  position: absolute;
                  top: ${cssTopPosition + 40}px;
                  right: 25px;
                `}
              >
                Copied
              </span>
            ) : (
              <Icon
                type="copy"
                className={css`
                  float: right;
                  font-size: 26px;
                  position: absolute;
                  top: ${cssTopPosition + 40}px;
                  right: 25px;
                `}
              />
            )}
          </CopyToClipboard>

          {/* Show variable CSS version if enabled */}
          {useCSSVariables && showVariableCSS && (
            <div
              className={css`
                margin-top: 30px;
                padding: 15px;
                background-color: #0c1127;
                border-radius: 8px;
                border: 1px solid #1d9af2;
              `}
            >
              <h4
                className={css`
                  color: #1d9af2;
                  margin: 0 0 10px 0;
                  font-size: 14px;
                `}
              >
                CSS 变量版本:
              </h4>
              <pre
                className={css`
                  margin: 0;
                  color: #fff;
                  font-size: 12px;
                  white-space: pre-wrap;
                  word-break: break-all;
                  background-color: #151825;
                  padding: 10px;
                  border-radius: 4px;
                  max-height: 300px;
                  overflow-y: auto;
                `}
              >
                {variableCSS}
              </pre>
=======
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
                          style={{
                            color: this.state.params.primaryColor || '#1D9AF2',
                            backgroundColor: this.state.params.backgroundColor || '#292D3E',
                            borderColor: this.state.params.primaryColor || '#1D9AF2',
                            borderRadius: this.state.params.borderRadius ? `${this.state.params.borderRadius}px` : '4px',
                            transition: `all ${this.state.params.duration || 0.2}s ease-in-out`
                          }}
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
>>>>>>> 3ab4ba592f11d8e2e4cda5102668c4fe308e8b11
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

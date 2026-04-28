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
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

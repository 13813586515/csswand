import React, { Component } from "react";
import { Modal, Button, Icon, Select } from "antd";
import { css } from "emotion";
import "./CompareMode.css";

const { Option } = Select;

export default class CompareMode extends Component {
  state = {
    visible: false,
    firstEffect: null,
    secondEffect: null
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleFirstEffectChange = (value) => {
    const effect = this.props.effects.find(e => e.title === value);
    this.setState({ firstEffect: effect });
  };

  handleSecondEffectChange = (value) => {
    const effect = this.props.effects.find(e => e.title === value);
    this.setState({ secondEffect: effect });
  };

  render() {
    const { effects } = this.props;
    const { firstEffect, secondEffect } = this.state;

    return (
      <div>
        <Button
          type="ghost"
          onClick={this.showModal}
          className={css`
            color: #24ff9f;
            border-color: #24ff9f;
            margin-right: 10px;
            &:hover {
              color: #24ff9f;
              border-color: #24ff9f;
            }
          `}
        >
          <Icon type="swap" /> 对比模式
        </Button>

        <Modal
          title="效果对比模式"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={900}
        >
          <div className="compare-container">
            <div className="compare-controls">
              <div className="compare-control">
                <label>第一个效果：</label>
                <Select
                  placeholder="选择第一个效果"
                  style={{ width: 200 }}
                  onChange={this.handleFirstEffectChange}
                >
                  {effects.map(effect => (
                    <Option key={effect.title} value={effect.title}>
                      {effect.title}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="compare-control">
                <label>第二个效果：</label>
                <Select
                  placeholder="选择第二个效果"
                  style={{ width: 200 }}
                  onChange={this.handleSecondEffectChange}
                >
                  {effects.map(effect => (
                    <Option key={effect.title} value={effect.title}>
                      {effect.title}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="compare-preview">
              <div className="compare-panel">
                <h3>{firstEffect ? firstEffect.title : "请选择第一个效果"}</h3>
                {firstEffect && (
                  <div className="effect-preview">
                    {firstEffect.title === "Input" ? (
                      <div className="col-3">
                        <input
                          className="effect-1"
                          type="text"
                          placeholder="Input Underline"
                        />
                        <span className="focus-border" />
                      </div>
                    ) : firstEffect.title === "Spinner" ? (
                      <Button
                        type="ghost"
                        className={firstEffect.style}
                      />
                    ) : (
                      <Button
                        type="ghost"
                        className={firstEffect.style}
                      >
                        {firstEffect.title}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <div className="compare-divider" />

              <div className="compare-panel">
                <h3>{secondEffect ? secondEffect.title : "请选择第二个效果"}</h3>
                {secondEffect && (
                  <div className="effect-preview">
                    {secondEffect.title === "Input" ? (
                      <div className="col-3">
                        <input
                          className="effect-1"
                          type="text"
                          placeholder="Input Underline"
                        />
                        <span className="focus-border" />
                      </div>
                    ) : secondEffect.title === "Spinner" ? (
                      <Button
                        type="ghost"
                        className={secondEffect.style}
                      />
                    ) : (
                      <Button
                        type="ghost"
                        className={secondEffect.style}
                      >
                        {secondEffect.title}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {firstEffect && secondEffect && (
              <div className="compare-code">
                <div className="code-panel">
                  <h4>第一个效果代码</h4>
                  <div className="code-content">
                    <pre>{firstEffect.htmlVariable}</pre>
                    <pre>{firstEffect.cssVariable}</pre>
                  </div>
                </div>
                <div className="code-panel">
                  <h4>第二个效果代码</h4>
                  <div className="code-content">
                    <pre>{secondEffect.htmlVariable}</pre>
                    <pre>{secondEffect.cssVariable}</pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

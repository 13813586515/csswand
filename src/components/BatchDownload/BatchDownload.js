import React, { Component } from "react";
import { Modal, Button, Icon, Checkbox, message } from "antd";
import { css } from "emotion";
import "./BatchDownload.css";

const CheckboxGroup = Checkbox.Group;

export default class BatchDownload extends Component {
  state = {
    visible: false,
    selectedEffects: [],
    checkAll: false,
    indeterminate: false
  };

  showModal = () => {
    this.setState({
      visible: true,
      selectedEffects: [],
      checkAll: false,
      indeterminate: false
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

  handleEffectChange = (checkedValues) => {
    const { effects } = this.props;
    const allEffectTitles = effects.map(e => e.title);
    
    this.setState({
      selectedEffects: checkedValues,
      checkAll: checkedValues.length === allEffectTitles.length,
      indeterminate: checkedValues.length > 0 && checkedValues.length < allEffectTitles.length
    });
  };

  handleCheckAllChange = (e) => {
    const { effects } = this.props;
    const allEffectTitles = effects.map(e => e.title);
    
    this.setState({
      selectedEffects: e.target.checked ? allEffectTitles : [],
      checkAll: e.target.checked,
      indeterminate: false
    });
  };

  generateCombinedCSS = () => {
    const { effects } = this.props;
    const { selectedEffects } = this.state;
    
    if (selectedEffects.length === 0) {
      message.warning("请至少选择一个效果");
      return null;
    }

    let combinedCSS = `/* 
 * CSS Wand - 批量导出样式文件
 * 导出时间: ${new Date().toISOString()}
 * 包含效果: ${selectedEffects.length} 个
 */

`;

    selectedEffects.forEach((effectTitle, index) => {
      const effect = effects.find(e => e.title === effectTitle);
      if (effect) {
        combinedCSS += `
/* ============================================
   ${effectTitle} 效果 - 第 ${index + 1} 个
   ============================================ */

`;
        combinedCSS += effect.cssVariable.trim();
        combinedCSS += "\n\n";
      }
    });

    return combinedCSS;
  };

  handleDownload = () => {
    const combinedCSS = this.generateCombinedCSS();
    if (!combinedCSS) return;

    const blob = new Blob([combinedCSS], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `css-wand-bundle-${Date.now()}.css`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    message.success(`成功导出 ${this.state.selectedEffects.length} 个效果`);
    this.setState({ visible: false });
  };

  render() {
    const { effects } = this.props;
    const { selectedEffects, checkAll, indeterminate } = this.state;

    const effectOptions = effects.map(effect => ({
      label: effect.title,
      value: effect.title
    }));

    return (
      <div>
        <Button
          type="ghost"
          onClick={this.showModal}
          className={css`
            color: #1d9af2;
            border-color: #1d9af2;
            margin-right: 10px;
            &:hover {
              color: #1d9af2;
              border-color: #1d9af2;
            }
          `}
        >
          <Icon type="download" /> 批量下载
        </Button>

        <Modal
          title="批量下载样式"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button 
              key="submit" 
              type="primary" 
              onClick={this.handleDownload}
              disabled={selectedEffects.length === 0}
            >
              下载 ({selectedEffects.length} 个)
            </Button>
          ]}
          width={600}
        >
          <div className="batch-download-container">
            <div className="batch-header">
              <Checkbox
                indeterminate={indeterminate}
                onChange={this.handleCheckAllChange}
                checked={checkAll}
              >
                全选
              </Checkbox>
              <span className="selected-count">
                已选择: {selectedEffects.length} 个效果
              </span>
            </div>

            <div className="effects-list">
              <CheckboxGroup 
                options={effectOptions} 
                value={selectedEffects}
                onChange={this.handleEffectChange}
              />
            </div>

            {selectedEffects.length > 0 && (
              <div className="preview-section">
                <h4>预览 (前 3 个效果)</h4>
                <div className="preview-content">
                  {selectedEffects.slice(0, 3).map((title, index) => {
                    const effect = effects.find(e => e.title === title);
                    return (
                      <div key={index} className="preview-item">
                        <strong>{title}</strong>
                        <pre>{effect?.cssVariable.substring(0, 200)}...</pre>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

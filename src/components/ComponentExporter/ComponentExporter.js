import React, { Component } from "react";
import { Modal, Button, Icon, Radio, message } from "antd";
import { css } from "emotion";
import { exportComponent, downloadFile, downloadMultipleFiles } from "../../utils/componentExporter";
import { generateThemeCSS, convertToCSSVariables } from "../../utils/themeVariables";
import "./ComponentExporter.css";

const RadioGroup = Radio.Group;

export default class ComponentExporter extends Component {
  state = {
    visible: false,
    exportFormat: 'react',
    styleType: 'inline',
    useCSSVariables: false
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

  handleFormatChange = (e) => {
    this.setState({ exportFormat: e.target.value });
  };

  handleStyleTypeChange = (e) => {
    this.setState({ styleType: e.target.value });
  };

  handleCSSVariablesChange = (e) => {
    this.setState({ useCSSVariables: e.target.checked });
  };

  handleExport = () => {
    const { effectTitle, htmlVariable, cssVariable } = this.props;
    const { exportFormat, styleType, useCSSVariables } = this.state;

    let processedCSS = cssVariable;
    let processedHTML = htmlVariable;
    
    if (useCSSVariables) {
      processedCSS = convertToCSSVariables(cssVariable);
    }

    try {
      const files = exportComponent(effectTitle, processedHTML, processedCSS, exportFormat, {
        styleType: styleType
      });

      if (files.length === 1) {
        downloadFile(files[0].content, files[0].name);
        message.success(`成功导出 ${files[0].name}`);
      } else {
        downloadMultipleFiles(files);
        message.success(`成功导出 ${files.length} 个文件`);
      }

      if (useCSSVariables) {
        setTimeout(() => {
          const themeCSS = generateThemeCSS();
          downloadFile(themeCSS, 'theme-variables.css', 'text/css');
          message.info('已同时导出主题变量文件 theme-variables.css');
        }, files.length * 500 + 200);
      }

      this.setState({ visible: false });
    } catch (error) {
      message.error('导出失败: ' + error.message);
    }
  };

  render() {
    const { effectTitle } = this.props;
    const { exportFormat, styleType, useCSSVariables } = this.state;

    return (
      <div>
        <Button
          type="ghost"
          onClick={this.showModal}
          className={css`
            color: #ff9800;
            border-color: #ff9800;
            &:hover {
              color: #ff9800;
              border-color: #ff9800;
            }
          `}
        >
          <Icon type="code" /> 导出组件
        </Button>

        <Modal
          title={`导出 ${effectTitle} 为组件`}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleExport}>
              导出组件
            </Button>
          ]}
          width={500}
        >
          <div className="exporter-container">
            <div className="exporter-section">
              <h4>选择导出格式</h4>
              <RadioGroup onChange={this.handleFormatChange} value={exportFormat}>
                <Radio value="react">React (.jsx)</Radio>
                <Radio value="vue">Vue (.vue)</Radio>
                <Radio value="svelte">Svelte (.svelte)</Radio>
              </RadioGroup>
            </div>

            {exportFormat === 'react' && (
              <div className="exporter-section">
                <h4>样式处理方式</h4>
                <RadioGroup onChange={this.handleStyleTypeChange} value={styleType}>
                  <Radio value="inline">内联样式 (Inline)</Radio>
                  <Radio value="cssModules">CSS Modules</Radio>
                  <Radio value="separate">独立 CSS 文件</Radio>
                </RadioGroup>
              </div>
            )}

            {exportFormat === 'vue' && (
              <div className="exporter-section">
                <h4>样式作用域</h4>
                <RadioGroup onChange={this.handleStyleTypeChange} value={styleType}>
                  <Radio value="scoped">Scoped (组件私有)</Radio>
                  <Radio value="global">Global (全局样式)</Radio>
                </RadioGroup>
              </div>
            )}

            <div className="exporter-section">
              <h4>高级选项</h4>
              <div className="checkbox-option">
                <label>
                  <input
                    type="checkbox"
                    checked={useCSSVariables}
                    onChange={this.handleCSSVariablesChange}
                  />
                  <span>使用 CSS 自定义属性 (CSS Variables)</span>
                </label>
                <p className="option-description">
                  将硬编码的颜色、尺寸等替换为 CSS 变量，方便主题定制
                </p>
              </div>
            </div>

            <div className="exporter-preview">
              <h4>导出预览</h4>
              <div className="preview-info">
                <p><strong>格式:</strong> {exportFormat.toUpperCase()}</p>
                <p><strong>文件:</strong> {effectTitle.toLowerCase()}.{exportFormat === 'react' ? 'jsx' : exportFormat}</p>
                {exportFormat === 'react' && styleType !== 'inline' && (
                  <p><strong>样式文件:</strong> {effectTitle.toLowerCase()}{styleType === 'cssModules' ? '.module.css' : '.css'}</p>
                )}
                {useCSSVariables && (
                  <p><strong>主题文件:</strong> theme-variables.css</p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

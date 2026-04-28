import React, { Component } from "react";
import { Modal, Input, Button, Icon } from "antd";
import { css } from "emotion";
import { SketchPicker } from "react-color";
import { usePreview } from "../../contexts/PreviewContext";

class PreviewSettingsClass extends Component {
  state = {
    visible: false,
    showColorPicker: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
      showColorPicker: false,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
      showColorPicker: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
      showColorPicker: false,
    });
  };

  handleInputChange = (key, value) => {
    const { updateSetting } = this.props;
    updateSetting(key, value);
  };

  handleBackgroundColorChange = (color) => {
    const { updateSetting } = this.props;
    updateSetting("backgroundColor", color.hex);
  };

  toggleColorPicker = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState((prev) => ({
      showColorPicker: !prev.showColorPicker,
    }));
  };

  resetToDefault = () => {
    const { resetPreview } = this.props;
    resetPreview();
    this.setState({
      showColorPicker: false,
    });
  };

  render() {
    const { previewSettings, defaultPreviewSettings } = this.props;
    const { showColorPicker } = this.state;

    const settingLabels = {
      backgroundColor: "预览背景色",
      textContent: "按钮文字",
      fontSize: "字体大小",
      width: "按钮宽度",
      height: "按钮高度",
      padding: "内边距",
    };

    return (
      <div>
        <div
          onClick={this.showModal}
          className={css`
            display: inline-flex;
            align-items: center;
            cursor: pointer;
            margin-top: 20px;
            margin-left: 16px;
            padding: 10px 20px;
            border-radius: 8px;
            background-color: rgba(255, 255, 255, 0.05);
            transition: all 0.2s ease;
            
            &:hover {
              background-color: rgba(255, 255, 255, 0.1);
            }
          `}
        >
          <Icon
            type="layout"
            className={css`
              margin-right: 8px;
              color: #24ff9f;
            `}
          />
          <span
            className={css`
              color: #24ff9f;
              font-size: 14px;
            `}
          >
            预览设置
          </span>
        </div>

        <Modal
          title="自定义预览环境"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={600}
          footer={[
            <Button key="reset" onClick={this.resetToDefault}>
              重置默认
            </Button>,
            <Button key="ok" type="primary" onClick={this.handleOk}>
              完成
            </Button>,
          ]}
        >
          {showColorPicker && (
            <div
              className={css`
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.5);
              `}
              onClick={this.toggleColorPicker}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={css`
                  background-color: #fff;
                  border-radius: 8px;
                  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                  overflow: hidden;
                `}
              >
                <SketchPicker
                  color={previewSettings.backgroundColor}
                  onChangeComplete={this.handleBackgroundColorChange}
                  disableAlpha={true}
                />
                <div
                  className={css`
                    padding: 12px;
                    background-color: #fff;
                    text-align: center;
                    border-top: 1px solid #eee;
                  `}
                >
                  <Button type="primary" onClick={this.toggleColorPicker}>
                    确定
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div
            className={css`
              display: flex;
              flex-direction: column;
              gap: 20px;
            `}
          >
            <div
              className={css`
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 12px;
                background-color: #f5f5f5;
                border-radius: 8px;
              `}
            >
              <span
                className={css`
                  font-weight: 500;
                `}
              >
                {settingLabels.backgroundColor}
              </span>
              <div
                className={css`
                  display: flex;
                  align-items: center;
                  gap: 12px;
                `}
              >
                <div
                  onClick={this.toggleColorPicker}
                  className={css`
                    width: 40px;
                    height: 40px;
                    border-radius: 8px;
                    background-color: ${previewSettings.backgroundColor};
                    border: 2px solid #e8e8e8;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    
                    &:hover {
                      transform: scale(1.05);
                      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    }
                  `}
                />
                <span
                  className={css`
                    font-family: monospace;
                    color: #666;
                  `}
                >
                  {previewSettings.backgroundColor}
                </span>
              </div>
            </div>

            {[
              { key: "textContent", placeholder: "输入按钮文字" },
              { key: "fontSize", placeholder: "例如: 14px" },
              { key: "width", placeholder: "例如: auto 或 100px" },
              { key: "height", placeholder: "例如: 32px" },
              { key: "padding", placeholder: "例如: 0 15px" },
            ].map((item) => (
              <div
                key={item.key}
                className={css`
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 12px;
                  background-color: #fafafa;
                  border-radius: 8px;
                `}
              >
                <span
                  className={css`
                    font-weight: 500;
                    min-width: 100px;
                  `}
                >
                  {settingLabels[item.key]}
                </span>
                <div
                  className={css`
                    display: flex;
                    align-items: center;
                    gap: 8px;
                  `}
                >
                  <Input
                    value={previewSettings[item.key]}
                    onChange={(e) => this.handleInputChange(item.key, e.target.value)}
                    placeholder={item.placeholder}
                    style={{ width: 200 }}
                  />
                  <Icon
                    type="undo"
                    className={css`
                      cursor: pointer;
                      color: #999;
                      &:hover {
                        color: #333;
                      }
                    `}
                    onClick={() =>
                      this.handleInputChange(item.key, defaultPreviewSettings[item.key])
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className={css`
              margin-top: 24px;
              padding: 20px;
              background-color: ${previewSettings.backgroundColor};
              border-radius: 8px;
              text-align: center;
              transition: all 0.3s ease;
            `}
          >
            <p
              className={css`
                margin: 0 0 16px 0;
                color: #666;
                font-size: 12px;
              `}
            >
              预览效果 (当前设置)
            </p>
            <button
              className={css`
                color: #1d9af2;
                background-color: #292d3e;
                border: 1px solid #1d9af2;
                border-radius: 4px;
                padding: ${previewSettings.padding};
                cursor: pointer;
                height: ${previewSettings.height};
                font-size: ${previewSettings.fontSize};
                width: ${previewSettings.width};
                transition: all 0.2s ease;
                
                &:hover {
                  transform: scale(1.05);
                }
              `}
            >
              {previewSettings.textContent}
            </button>
          </div>

          <div
            className={css`
              margin-top: 16px;
              padding: 12px;
              background-color: #fff3cd;
              border-radius: 8px;
              border: 1px solid #ffeaa7;
            `}
          >
            <Icon
              type="info-circle"
              style={{ marginRight: "8px", color: "#856404" }}
            />
            <span
              style={{
                color: "#856404",
                fontSize: "12px",
              }}
            >
              提示：这些设置仅影响预览区域的显示效果，不影响导出的 CSS 代码。这可以帮助您模拟效果在自己项目中的实际呈现方式。
            </span>
          </div>
        </Modal>
      </div>
    );
  }
}

const PreviewSettings = (props) => {
  const previewContext = usePreview();
  return <PreviewSettingsClass {...props} {...previewContext} />;
};

export default PreviewSettings;

import React, { Component } from "react";
import { Modal, Radio, Button, Icon } from "antd";
import { css } from "emotion";
import { SketchPicker } from "react-color";
import { useTheme } from "../../contexts/ThemeContext";

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class ThemeSelectorClass extends Component {
  state = {
    visible: false,
    customColors: {
      primary: "#1d9af2",
      secondary: "#292D3E",
      accent: "#24ff9f",
      background: "#13172c",
      text: "#ffffff",
      border: "#1d9af2",
    },
  };

  showModal = () => {
    const { theme, themePresets, customTheme } = this.props;
    
    if (customTheme) {
      this.setState({
        visible: true,
        customColors: {
          primary: customTheme.primary,
          secondary: customTheme.secondary,
          accent: customTheme.accent,
          background: customTheme.background,
          text: customTheme.text,
          border: customTheme.border,
        },
      });
    } else {
      this.setState({
        visible: true,
        customColors: {
          primary: theme.primary,
          secondary: theme.secondary,
          accent: theme.accent,
          background: theme.background,
          text: theme.text,
          border: theme.border,
        },
      });
    }
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleThemeChange = (e) => {
    const { applyTheme, resetToDefault } = this.props;
    const themeName = e.target.value;
    
    if (themeName === "reset") {
      resetToDefault();
    } else {
      applyTheme(themeName);
    }
  };

  handleColorChange = (colorKey, color) => {
    this.setState((prev) => ({
      customColors: {
        ...prev.customColors,
        [colorKey]: color.hex,
      },
    }));
  };

  applyCustomTheme = () => {
    const { updateCustomTheme } = this.props;
    updateCustomTheme(this.state.customColors);
  };

  render() {
    const { theme, currentTheme, themePresets } = this.props;

    const colorLabels = {
      primary: "主色调",
      secondary: "背景色",
      accent: "强调色",
      background: "页面背景",
      text: "文字颜色",
      border: "边框颜色",
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
            padding: 10px 20px;
            border-radius: 8px;
            background-color: rgba(255, 255, 255, 0.05);
            transition: all 0.2s ease;
            
            &:hover {
              background-color: rgba(255, 255, 255, 0.1);
            }
          `}
        >
          <div
            className={css`
              display: flex;
              margin-right: 12px;
            `}
          >
            {[theme.primary, theme.secondary, theme.accent].map((color, i) => (
              <div
                key={i}
                className={css`
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  background-color: ${color};
                  margin-right: ${i < 2 ? "-8px" : "0"};
                  border: 2px solid rgba(255, 255, 255, 0.2);
                  z-index: ${3 - i};
                `}
              />
            ))}
          </div>
          <span
            className={css`
              color: ${theme.text};
              font-size: 14px;
            `}
          >
            主题: {theme.name}
          </span>
          <Icon
            type="setting"
            className={css`
              margin-left: 8px;
              color: ${theme.text};
              opacity: 0.6;
            `}
          />
        </div>

        <Modal
          title="主题设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
          footer={[
            <Button key="reset" onClick={this.props.resetToDefault}>
              重置默认
            </Button>,
            <Button key="cancel" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button
              key="apply"
              type="primary"
              onClick={this.applyCustomTheme}
              style={{ backgroundColor: theme.primary, borderColor: theme.primary }}
            >
              应用自定义主题
            </Button>,
          ]}
        >
          <div
            className={css`
              margin-bottom: 24px;
            `}
          >
            <h4
              className={css`
                margin-bottom: 12px;
                color: #333;
              `}
            >
              预设主题
            </h4>
            <RadioGroup
              onChange={this.handleThemeChange}
              value={currentTheme}
              className={css`
                display: flex;
                gap: 8px;
              `}
            >
              {Object.entries(themePresets).map(([key, preset]) => (
                <RadioButton
                  key={key}
                  value={key}
                  className={css`
                    border-color: ${currentTheme === key ? preset.primary : "#d9d9d9"};
                    &.ant-radio-button-wrapper-checked {
                      background-color: ${preset.primary};
                      border-color: ${preset.primary};
                      color: #fff;
                    }
                  `}
                >
                  <div
                    className={css`
                      display: flex;
                      align-items: center;
                      gap: 6px;
                    `}
                  >
                    <div
                      className={css`
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background-color: ${preset.primary};
                      `}
                    />
                    {preset.name}
                  </div>
                </RadioButton>
              ))}
            </RadioGroup>
          </div>

          <div
            className={css`
              margin-top: 24px;
              padding-top: 24px;
              border-top: 1px solid #e8e8e8;
            `}
          >
            <h4
              className={css`
                margin-bottom: 16px;
                color: #333;
              `}
            >
              自定义颜色
            </h4>
            <div
              className={css`
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 16px;
              `}
            >
              {Object.entries(this.state.customColors).map(([key, color]) => (
                <div
                  key={key}
                  className={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                  `}
                >
                  <span
                    className={css`
                      font-size: 12px;
                      color: #666;
                      margin-bottom: 8px;
                    `}
                  >
                    {colorLabels[key]}
                  </span>
                  <div
                    className={css`
                      position: relative;
                      cursor: pointer;
                    `}
                  >
                    <div
                      className={css`
                        width: 60px;
                        height: 60px;
                        border-radius: 8px;
                        background-color: ${color};
                        border: 2px solid #e8e8e8;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                      `}
                    />
                    <div
                      className={css`
                        position: absolute;
                        bottom: -80px;
                        left: 50%;
                        transform: translateX(-50%);
                        z-index: 100;
                      `}
                    >
                      <SketchPicker
                        color={color}
                        onChangeComplete={(c) => this.handleColorChange(key, c)}
                        disableAlpha={true}
                      />
                    </div>
                  </div>
                  <span
                    className={css`
                      margin-top: 8px;
                      font-size: 11px;
                      color: #999;
                      font-family: monospace;
                    `}
                  >
                    {color.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={css`
              margin-top: 120px;
              padding: 20px;
              background-color: ${this.state.customColors.background};
              border-radius: 8px;
            `}
          >
            <p
              className={css`
                color: ${this.state.customColors.text};
                margin: 0 0 12px 0;
              `}
            >
              预览效果
            </p>
            <button
              className={css`
                background-color: ${this.state.customColors.secondary};
                color: ${this.state.customColors.primary};
                border: 1px solid ${this.state.customColors.border};
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                transition: all 0.2s ease;
                
                &:hover {
                  transform: scale(1.05);
                  box-shadow: 0 0 10px ${this.state.customColors.accent};
                }
              `}
            >
              示例按钮
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const ThemeSelector = (props) => {
  const themeContext = useTheme();
  return <ThemeSelectorClass {...props} {...themeContext} />;
};

export default ThemeSelector;

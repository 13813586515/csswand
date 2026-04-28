import React, { Component } from "react";
import { Modal, Button, Icon, Radio } from "antd";
import "./SingleEffect.css";
import { css } from "emotion";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { codeFormats, generateCode } from "../../utils/codeGenerator";
import { useTheme } from "../../contexts/ThemeContext";
import { usePreview } from "../../contexts/PreviewContext";

const RadioGroup = Radio.Group;

class SingleEffectClass extends Component {
  state = {
    visible: false,
    copiedHTML: false,
    copiedCSS: false,
    codeFormat: codeFormats.CSS,
  };

  showModal = () => {
    this.setState({
      visible: true,
      copiedHTML: false,
      copiedCSS: false,
    });
  };

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleFormatChange = (e) => {
    this.setState({
      codeFormat: e.target.value,
      copiedHTML: false,
      copiedCSS: false,
    });
  };

  getStyledButton = () => {
    const { Style, Title } = this.props;
    const { theme } = this.props;
    const { previewSettings } = this.props;

    if (!theme) {
      return Style;
    }

    const baseStyle = css`
      color: ${theme.primary} !important;
      background-color: ${theme.secondary} !important;
      border: 1px solid ${theme.border} !important;
      font-size: ${previewSettings?.fontSize || "14px"} !important;
      height: ${previewSettings?.height || "32px"} !important;
      padding: ${previewSettings?.padding || "0 15px"} !important;
      ${Style}
    `;

    return baseStyle;
  };

  render() {
    const { Code, Title, cssVariable, htmlVariable } = this.props;
    const { theme } = this.props;
    const { codeFormat } = this.state;

    const generatedCode = generateCode(codeFormat, cssVariable, htmlVariable, theme, Title);

    const formatOptions = [
      { label: "CSS", value: codeFormats.CSS },
      { label: "Tailwind", value: codeFormats.TAILWIND },
      { label: "Styled", value: codeFormats.STYLED_COMPONENTS },
      { label: "CSS Modules", value: codeFormats.CSS_MODULES },
      { label: "Inline", value: codeFormats.INLINE },
    ];

    return (
      <div>
        <div
          onClick={this.showModal}
          className={this.props.Title === "Input" ? "input-top" : null}
        >
          {this.props.Title === "Input" ? (
            <div
              className="col-3"
              onClick={(event) => event.stopPropagation()}
              style={{
                backgroundColor: theme?.background || "transparent",
              }}
            >
              <input
                className="effect-1"
                type="text"
                placeholder="Input Underline"
                style={{
                  color: theme?.primary || "#1d9af2",
                  backgroundColor: theme?.secondary || "rgb(19, 23, 44)",
                }}
              />
              <span
                className="focus-border"
                style={{
                  backgroundColor: theme?.accent || "#3399FF",
                }}
              />
            </div>
          ) : (
            <Button
              type="ghost"
              className={this.getStyledButton()}
              onClick={this.showModal}
            >
              {this.props.Title === "Spinner"
                ? null
                : this.props.previewSettings?.textContent || this.props.Title}
            </Button>
          )}
        </div>

        <Modal
          title={
            <div
              className={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <span>{Title}</span>
              <span
                className={css`
                  font-size: 12px;
                  color: #999;
                `}
              >
                {generatedCode.description}
              </span>
            </div>
          }
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={700}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              关闭
            </Button>,
          ]}
        >
          <div
            className={css`
              margin-bottom: 20px;
              padding: 12px;
              background-color: #f5f5f5;
              border-radius: 8px;
            `}
          >
            <span
              className={css`
                margin-right: 12px;
                font-weight: 500;
              `}
            >
              导出格式:
            </span>
            <RadioGroup
              onChange={this.handleFormatChange}
              value={codeFormat}
              size="small"
            >
              {formatOptions.map((opt) => (
                <Radio.Button
                  key={opt.value}
                  value={opt.value}
                  className={css`
                    &.ant-radio-button-wrapper-checked {
                      background-color: ${theme?.primary || "#1d9af2"};
                      border-color: ${theme?.primary || "#1d9af2"};
                    }
                  `}
                >
                  {opt.label}
                </Radio.Button>
              ))}
            </RadioGroup>
          </div>

          {codeFormat === codeFormats.CSS && (
            <>
              <div>
                <p
                  style={{
                    color: theme?.text || "#fff",
                    fontSize: "26px",
                    marginBottom: "12px",
                  }}
                >
                  HTML
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "8px",
                  }}
                >
                  <CopyToClipboard
                    text={generatedCode.html}
                    onCopy={() => this.setState({ copiedHTML: true })}
                  >
                    <Button
                      size="small"
                      icon="copy"
                      className={css`
                        background-color: ${theme?.primary || "#1d9af2"};
                        border-color: ${theme?.primary || "#1d9af2"};
                        color: white;
                        &:hover {
                          background-color: ${theme?.primary || "#1d9af2"};
                          border-color: ${theme?.primary || "#1d9af2"};
                          opacity: 0.9;
                        }
                      `}
                    >
                      {this.state.copiedHTML ? "已复制" : "复制"}
                    </Button>
                  </CopyToClipboard>
                </div>
                <pre
                  className={css`
                    background-color: ${theme?.secondary || "#292D3E"};
                    color: ${theme?.text || "#fff"};
                    padding: 16px;
                    border-radius: 8px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-family: "Fira Code", monospace;
                    font-size: 13px;
                    border: 1px solid ${theme?.border || "#1d9af2"};
                  `}
                >
                  {generatedCode.html}
                </pre>
              </div>

              <div
                className={css`
                  margin-top: 24px;
                `}
              >
                <p
                  style={{
                    color: theme?.text || "#fff",
                    fontSize: "26px",
                    marginBottom: "12px",
                  }}
                >
                  CSS
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginBottom: "8px",
                  }}
                >
                  <CopyToClipboard
                    text={generatedCode.code}
                    onCopy={() => this.setState({ copiedCSS: true })}
                  >
                    <Button
                      size="small"
                      icon="copy"
                      className={css`
                        background-color: ${theme?.primary || "#1d9af2"};
                        border-color: ${theme?.primary || "#1d9af2"};
                        color: white;
                        &:hover {
                          background-color: ${theme?.primary || "#1d9af2"};
                          border-color: ${theme?.primary || "#1d9af2"};
                          opacity: 0.9;
                        }
                      `}
                    >
                      {this.state.copiedCSS ? "已复制" : "复制"}
                    </Button>
                  </CopyToClipboard>
                </div>
                <pre
                  className={css`
                    background-color: ${theme?.secondary || "#292D3E"};
                    color: ${theme?.text || "#fff"};
                    padding: 16px;
                    border-radius: 8px;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    font-family: "Fira Code", monospace;
                    font-size: 13px;
                    border: 1px solid ${theme?.border || "#1d9af2"};
                    max-height: 400px;
                    overflow-y: auto;
                  `}
                >
                  {generatedCode.code}
                </pre>
              </div>
            </>
          )}

          {codeFormat !== codeFormats.CSS && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "8px",
                }}
              >
                <CopyToClipboard
                  text={generatedCode.code}
                  onCopy={() => this.setState({ copiedCSS: true })}
                >
                  <Button
                    size="small"
                    icon="copy"
                    className={css`
                      background-color: ${theme?.primary || "#1d9af2"};
                      border-color: ${theme?.primary || "#1d9af2"};
                      color: white;
                      &:hover {
                        background-color: ${theme?.primary || "#1d9af2"};
                        border-color: ${theme?.primary || "#1d9af2"};
                        opacity: 0.9;
                      }
                    `}
                  >
                    {this.state.copiedCSS ? "已复制" : "复制代码"}
                  </Button>
                </CopyToClipboard>
              </div>
              <pre
                className={css`
                  background-color: ${theme?.secondary || "#292D3E"};
                  color: ${theme?.text || "#fff"};
                  padding: 16px;
                  border-radius: 8px;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                  font-family: "Fira Code", monospace;
                  font-size: 13px;
                  border: 1px solid ${theme?.border || "#1d9af2"};
                  max-height: 500px;
                  overflow-y: auto;
                `}
              >
                {generatedCode.code}
              </pre>
            </div>
          )}

          {theme && (
            <div
              className={css`
                margin-top: 20px;
                padding: 12px;
                background-color: #e6f7ff;
                border-radius: 8px;
                border: 1px solid #91d5ff;
              `}
            >
              <Icon
                type="info-circle"
                style={{ marginRight: "8px", color: "#1890ff" }}
              />
              <span
                style={{
                  color: "#1890ff",
                  fontSize: "12px",
                }}
              >
                当前使用 "{theme.name}" 主题 - 代码中的颜色已根据主题配置自动更新。
              </span>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

const SingleEffect = (props) => {
  const themeContext = useTheme();
  const previewContext = usePreview();
  
  return (
    <SingleEffectClass
      {...props}
      theme={themeContext.theme}
      previewSettings={previewContext.previewSettings}
    />
  );
};

export default SingleEffect;

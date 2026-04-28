import React from "react";
import { Slider, InputNumber, Row, Col } from "antd";
import { SketchPicker } from "react-color";
import { css } from "emotion";
import "./ParameterEditor.css";

class ParameterEditor extends React.Component {
  state = {
    showColorPicker: {}
  };

  toggleColorPicker = (paramName) => {
    this.setState(prevState => ({
      showColorPicker: {
        ...prevState.showColorPicker,
        [paramName]: !prevState.showColorPicker[paramName]
      }
    }));
  };

  handleColorChange = (paramName, color) => {
    this.props.onParamChange(paramName, color.hex);
  };

  handleSliderChange = (paramName, value) => {
    this.props.onParamChange(paramName, value);
  };

  handleInputChange = (paramName, value) => {
    if (value === null || value === undefined) return;
    this.props.onParamChange(paramName, value);
  };

  render() {
    const { parameters, params } = this.props;
    const { showColorPicker } = this.state;

    return (
      <div className="parameter-editor">
        {parameters.map((param, index) => (
          <div key={index} className="parameter-item">
            <label className="parameter-label">{param.label}</label>
            
            {param.type === 'slider' && (
              <Row className="parameter-row" gutter={8}>
                <Col span={18}>
                  <Slider
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={params[param.name]}
                    onChange={(value) => this.handleSliderChange(param.name, value)}
                  />
                </Col>
                <Col span={6}>
                  <InputNumber
                    min={param.min}
                    max={param.max}
                    step={param.step}
                    value={params[param.name]}
                    onChange={(value) => this.handleInputChange(param.name, value)}
                    className="parameter-input-number"
                  />
                </Col>
              </Row>
            )}
            
            {param.type === 'color' && (
              <div className="color-picker-container">
                <div
                  className={css`
                    display: inline-block;
                    height: 30px;
                    width: 100px;
                    border-radius: 5px;
                    margin-right: 10px;
                    background-color: ${params[param.name]};
                    border: 2px solid #fff;
                    cursor: pointer;
                  `}
                  onClick={() => this.toggleColorPicker(param.name)}
                />
                <span className="color-value">{params[param.name]}</span>
                
                {showColorPicker[param.name] && (
                  <div className="color-picker-overlay">
                    <SketchPicker
                      disableAlpha={true}
                      color={params[param.name]}
                      onChangeComplete={(color) => this.handleColorChange(param.name, color)}
                    />
                  </div>
                )}
              </div>
            )}
            
            {param.type === 'input' && (
              <InputNumber
                min={param.min}
                max={param.max}
                step={param.step}
                value={params[param.name]}
                onChange={(value) => this.handleInputChange(param.name, value)}
                className="parameter-input"
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default ParameterEditor;

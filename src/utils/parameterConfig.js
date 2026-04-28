const parameterConfig = {
  Grow: {
    parameters: [
      {
        name: "scale",
        label: "缩放比例",
        type: "slider",
        min: 1.0,
        max: 2.0,
        step: 0.1,
        default: 1.1
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.2
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      },
      {
        name: "borderRadius",
        label: "圆角大小",
        type: "slider",
        min: 0,
        max: 20,
        step: 1,
        default: 4
      }
    ]
  },
  Shrink: {
    parameters: [
      {
        name: "scale",
        label: "缩放比例",
        type: "slider",
        min: 0.5,
        max: 1.0,
        step: 0.1,
        default: 0.9
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.2
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Opacity: {
    parameters: [
      {
        name: "opacity",
        label: "不透明度",
        type: "slider",
        min: 0.1,
        max: 1.0,
        step: 0.1,
        default: 0.5
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.2
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Rotate: {
    parameters: [
      {
        name: "angle",
        label: "旋转角度",
        type: "slider",
        min: 0,
        max: 360,
        step: 1,
        default: 30
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.2
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Shape: {
    parameters: [
      {
        name: "borderRadius",
        label: "圆角大小",
        type: "slider",
        min: 0,
        max: 50,
        step: 1,
        default: 50
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.2
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Shadow: {
    parameters: [
      {
        name: "shadowOffsetX",
        label: "阴影X偏移",
        type: "slider",
        min: -10,
        max: 10,
        step: 1,
        default: 1
      },
      {
        name: "shadowOffsetY",
        label: "阴影Y偏移",
        type: "slider",
        min: -10,
        max: 10,
        step: 1,
        default: 1
      },
      {
        name: "shadowBlur",
        label: "阴影模糊",
        type: "slider",
        min: 0,
        max: 20,
        step: 1,
        default: 0
      },
      {
        name: "shadowColor",
        label: "阴影颜色",
        type: "color",
        default: "#53a7ea"
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.2
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Swing: {
    parameters: [
      {
        name: "angle",
        label: "摆动角度",
        type: "slider",
        min: 5,
        max: 30,
        step: 1,
        default: 15
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.5,
        max: 3.0,
        step: 0.1,
        default: 1.0
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Ripple: {
    parameters: [
      {
        name: "rippleColor",
        label: "涟漪颜色",
        type: "color",
        default: "#47a7f5"
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.5,
        max: 3.0,
        step: 0.1,
        default: 0.8
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  "Press Down": {
    parameters: [
      {
        name: "pressOffset",
        label: "按下偏移",
        type: "slider",
        min: 1,
        max: 10,
        step: 1,
        default: 4
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.2
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Spinner: {
    parameters: [
      {
        name: "size",
        label: "大小",
        type: "slider",
        min: 20,
        max: 100,
        step: 5,
        default: 40
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.5,
        max: 3.0,
        step: 0.1,
        default: 1.0
      },
      {
        name: "primaryColor",
        label: "主颜色",
        type: "color",
        default: "#1D9AF2"
      },
      {
        name: "backgroundColor",
        label: "背景颜色",
        type: "color",
        default: "#292D3E"
      }
    ]
  },
  Input: {
    parameters: [
      {
        name: "focusColor",
        label: "焦点颜色",
        type: "color",
        default: "#3399FF"
      },
      {
        name: "borderWidth",
        label: "边框宽度",
        type: "slider",
        min: 1,
        max: 5,
        step: 1,
        default: 1
      },
      {
        name: "duration",
        label: "动画时长(秒)",
        type: "slider",
        min: 0.1,
        max: 2.0,
        step: 0.1,
        default: 0.4
      },
      {
        name: "textColor",
        label: "文字颜色",
        type: "color",
        default: "#1D9AF2"
      }
    ]
  }
};

const getDefaultParams = (effectName) => {
  if (!parameterConfig[effectName]) {
    return {};
  }
  
  const params = {};
  parameterConfig[effectName].parameters.forEach(param => {
    params[param.name] = param.default;
  });
  
  return params;
};

export { parameterConfig, getDefaultParams };

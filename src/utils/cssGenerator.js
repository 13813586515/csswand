import { parameterConfig } from './parameterConfig';

const cssGenerator = {
  Grow: (params) => {
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: ${params.borderRadius}px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all ${params.duration}s ease-in-out;
}
button:hover {
  transform: scale(${params.scale});
}
`;
  },

  Shrink: (params) => {
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all ${params.duration}s ease-in-out;
}
button:hover {
  transform: scale(${params.scale});
}
`;
  },

  Opacity: (params) => {
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all ${params.duration}s ease-in-out;
}
button:hover {
  opacity: ${params.opacity};
}
`;
  },

  Rotate: (params) => {
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all ${params.duration}s ease-in-out;
}
button:hover {
  transform: rotate(${params.angle}deg);
}
`;
  },

  Shape: (params) => {
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all ${params.duration}s ease-in-out;
}
button:hover {
  border-radius: ${params.borderRadius}%;
}
`;
  },

  Shadow: (params) => {
    const shadowLayers = [];
    for (let i = 1; i <= 3; i++) {
      shadowLayers.push(`${params.shadowOffsetX * i}px ${params.shadowOffsetY * i}px ${params.shadowBlur}px ${params.shadowColor}`);
    }
    
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all ${params.duration}s ease-in-out;
}
button:hover {
  box-shadow: ${shadowLayers.join(', ')};
  transform: translateX(${-params.shadowOffsetX * 3}px);
}
`;
  },

  Swing: (params) => {
    return `
@keyframes swing {
  15% {
    transform: translateX(5px);
    transform: rotate(${params.angle}deg);
  }
  30% {
    transform: translateX(-5px);
    transform: rotate(-${params.angle}deg);
  }
  50% {
    transform: translateX(3px);
    transform: rotate(${params.angle * 0.6}deg);
  }
  65% {
    transform: translateX(-3px);
    transform: rotate(-${params.angle * 0.6}deg);
  }
  80% {
    transform: translateX(2px);
    transform: rotate(${params.angle * 0.4}deg);
  }
  100% {
    transform: translateX(0);
    transform: rotate(0deg);
  }
}

button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
}
button:hover {
  animation: swing ${params.duration}s ease;
  animation-iteration-count: 1;
}
`;
  },

  Ripple: (params) => {
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 15px 18px 30px 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  box-shadow: 0 0 4px #999;
  outline: none;
  background-position: center;
  transition: background ${params.duration}s;
}
button:hover {
  background: ${params.rippleColor} radial-gradient(circle, transparent 1%, ${params.rippleColor} 1%) center/15000%;
  color: white;
}

button:active {
  background-color: ${params.backgroundColor};
  background-size: 100%;
  transition: background 0s;
}
`;
  },

  "Press Down": (params) => {
    return `
button {
  color: ${params.primaryColor};
  background-color: ${params.backgroundColor};
  border: 1px solid ${params.primaryColor};
  border-radius: 4px;
  padding: 0 15px;
  cursor: pointer;
  height: 32px;
  font-size: 14px;
  transition: all ${params.duration}s;
  box-shadow: 0px ${params.pressOffset}px 0px 0px ${params.primaryColor};
}
button:active {
  transform: translateY(${params.pressOffset}px);
  box-shadow: 0px 0px 0px 0px ${params.primaryColor};
}
`;
  },

  Spinner: (params) => {
    return `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

button {
  border: ${params.size / 20}px solid ${params.backgroundColor};
  border-radius: 50%;
  border-top: ${params.size / 20}px solid ${params.primaryColor};
  width: ${params.size}px;
  height: ${params.size}px;
  animation: spin ${params.duration}s linear infinite;
}
`;
  },

  Input: (params) => {
    return `
input[type="text"] {
  font: 15px/24px "Lato", Arial, sans-serif;
  color: ${params.textColor};
  width: 70%;
  box-sizing: border-box;
  letter-spacing: 1px;
  background-color: rgb(19, 23, 44);
  border: 0;
  padding: 7px 0;
  border-bottom: ${params.borderWidth}px solid #ccc;
}

:focus {
  outline: none;
}

.effect-1~.focus-border {
  position: absolute;
  bottom: 0;
  left: 25px;
  width: 0;
  height: ${params.borderWidth}px;
  background-color: ${params.focusColor};
  transition: ${params.duration}s;
}

.effect-1:focus~.focus-border {
  width: 70%;
  transition: ${params.duration}s;
}
`;
  }
};

const generateCSS = (effectName, params) => {
  if (!cssGenerator[effectName]) {
    return '';
  }
  
  return cssGenerator[effectName](params);
};

const generateEmotionStyle = (effectName, params) => {
  const css = generateCSS(effectName, params);
  return css;
};

export { cssGenerator, generateCSS, generateEmotionStyle };

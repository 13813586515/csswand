export const baseTheme = {
  colors: {
    primary: '#1D9AF2',
    primaryLight: '#47a7f5',
    primaryDark: '#53a7ea',
    secondary: '#292D3E',
    secondaryDark: '#151825',
    background: 'rgb(12, 17, 39)',
    backgroundDark: 'rgb(19, 23, 44)',
    text: '#ffffff',
    border: '#1D9AF2',
    shadow: '#999'
  },
  dimensions: {
    borderRadius: '4px',
    borderRadiusLarge: '10px',
    borderRadiusCircle: '50%',
    padding: '0 15px',
    paddingLarge: '15px 18px 30px 15px',
    height: '32px',
    heightLarge: '40px',
    width: '40px',
    fontSize: '14px',
    fontSizeLarge: '15px',
    borderWidth: '1px',
    borderWidthLarge: '2px'
  },
  animation: {
    duration: '0.2s',
    durationMedium: '0.4s',
    durationLong: '0.8s',
    durationSpinner: '600ms',
    timing: 'ease-in-out',
    timingLinear: 'linear'
  }
};

export const cssVariables = {
  colors: {
    '--primary-color': '#1D9AF2',
    '--primary-light': '#47a7f5',
    '--primary-dark': '#53a7ea',
    '--secondary-color': '#292D3E',
    '--secondary-dark': '#151825',
    '--background-color': 'rgb(12, 17, 39)',
    '--background-dark': 'rgb(19, 23, 44)',
    '--text-color': '#ffffff',
    '--border-color': '#1D9AF2',
    '--shadow-color': '#999'
  },
  dimensions: {
    '--border-radius': '4px',
    '--border-radius-large': '10px',
    '--border-radius-circle': '50%',
    '--padding': '0 15px',
    '--padding-large': '15px 18px 30px 15px',
    '--height': '32px',
    '--height-large': '40px',
    '--width': '40px',
    '--font-size': '14px',
    '--font-size-large': '15px',
    '--border-width': '1px',
    '--border-width-large': '2px'
  },
  animation: {
    '--animation-duration': '0.2s',
    '--animation-duration-medium': '0.4s',
    '--animation-duration-long': '0.8s',
    '--animation-duration-spinner': '600ms',
    '--animation-timing': 'ease-in-out',
    '--animation-timing-linear': 'linear'
  }
};

export const generateThemeCSS = (theme = cssVariables) => {
  let css = ':root {\n';
  
  // Colors
  css += '  /* Colors */\n';
  for (const [key, value] of Object.entries(theme.colors)) {
    css += `  ${key}: ${value};\n`;
  }
  
  // Dimensions
  css += '\n  /* Dimensions */\n';
  for (const [key, value] of Object.entries(theme.dimensions)) {
    css += `  ${key}: ${value};\n`;
  }
  
  // Animation
  css += '\n  /* Animation */\n';
  for (const [key, value] of Object.entries(theme.animation)) {
    css += `  ${key}: ${value};\n`;
  }
  
  css += '}\n';
  return css;
};

export const hardcodedValuesMap = {
  '#1D9AF2': 'var(--primary-color)',
  '#47a7f5': 'var(--primary-light)',
  '#53a7ea': 'var(--primary-dark)',
  '#292D3E': 'var(--secondary-color)',
  '#151825': 'var(--secondary-dark)',
  'rgb(12, 17, 39)': 'var(--background-color)',
  'rgb(19, 23, 44)': 'var(--background-dark)',
  '#ffffff': 'var(--text-color)',
  '#fff': 'var(--text-color)',
  '#999': 'var(--shadow-color)',
  '4px': 'var(--border-radius)',
  '10px': 'var(--border-radius-large)',
  '50%': 'var(--border-radius-circle)',
  '0 15px': 'var(--padding)',
  '15px 18px 30px 15px': 'var(--padding-large)',
  '32px': 'var(--height)',
  '40px': 'var(--height-large)',
  '14px': 'var(--font-size)',
  '15px': 'var(--font-size-large)',
  '1px': 'var(--border-width)',
  '2px': 'var(--border-width-large)',
  '0.2s': 'var(--animation-duration)',
  '0.4s': 'var(--animation-duration-medium)',
  '0.8s': 'var(--animation-duration-long)',
  '600ms': 'var(--animation-duration-spinner)',
  'ease-in-out': 'var(--animation-timing)',
  'linear': 'var(--animation-timing-linear)'
};

export const convertToCSSVariables = (cssString) => {
  let converted = cssString;
  
  for (const [hardcoded, variable] of Object.entries(hardcodedValuesMap)) {
    const regex = new RegExp(hardcoded.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    converted = converted.replace(regex, variable);
  }
  
  return converted;
};

export const generateComponentStyles = (effectName, cssString, useVariables = false) => {
  const css = useVariables ? convertToCSSVariables(cssString) : cssString;
  
  return {
    name: effectName,
    css: css,
    variables: useVariables ? Object.keys(hardcodedValuesMap).filter(key => css.includes(hardcodedValuesMap[key])) : []
  };
};

export const exportThemeFile = () => {
  return {
    themeCSS: generateThemeCSS(),
    variables: cssVariables,
    baseTheme: baseTheme
  };
};

export const downloadFile = (content, fileName, mimeType = 'text/plain') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

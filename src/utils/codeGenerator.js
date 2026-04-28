const codeFormats = {
  CSS: "css",
  TAILWIND: "tailwind",
  STYLED_COMPONENTS: "styled",
  CSS_MODULES: "modules",
  INLINE: "inline",
};

const parseCSSVariables = (cssCode, theme) => {
  if (!theme) return cssCode;
  
  let result = cssCode;
  
  if (theme.primary) {
    result = result.replace(/#1D9AF2/gi, theme.primary);
    result = result.replace(/#1d9af2/gi, theme.primary);
  }
  if (theme.secondary) {
    result = result.replace(/#292D3E/gi, theme.secondary);
    result = result.replace(/#292d3e/gi, theme.secondary);
  }
  if (theme.accent) {
    result = result.replace(/#24ff9f/gi, theme.accent);
  }
  if (theme.text) {
    result = result.replace(/#fff\b/gi, theme.text);
    result = result.replace(/#ffffff\b/gi, theme.text);
  }
  
  return result;
};

const generateTailwindCSS = (cssCode, htmlVariable) => {
  const tailwindMap = {
    "color: #1D9AF2": "text-blue-500",
    "color: #1d9af2": "text-blue-500",
    "background-color: #292D3E": "bg-gray-800",
    "background-color: #292d3e": "bg-gray-800",
    "border: 1px solid #1D9AF2": "border border-blue-500",
    "border: 1px solid #1d9af2": "border border-blue-500",
    "border-radius: 4px": "rounded",
    "padding: 0 15px": "px-4",
    "cursor: pointer": "cursor-pointer",
    "height: 32px": "h-8",
    "font-size: 14px": "text-sm",
    "transition: all 0.2s ease-in-out": "transition-all duration-200",
  };

  let tailwindClasses = [];
  let code = cssCode;

  for (const [css, tailwind] of Object.entries(tailwindMap)) {
    if (code.includes(css) || code.includes(css.toLowerCase())) {
      tailwindClasses.push(tailwind);
    }
  }

  if (code.includes("transform: scale")) {
    tailwindClasses.push("hover:scale-110 transform duration-200");
  }
  if (code.includes("opacity")) {
    tailwindClasses.push("hover:opacity-50 duration-200");
  }
  if (code.includes("rotate")) {
    tailwindClasses.push("hover:rotate-12 transform duration-200");
  }

  const className = tailwindClasses.length > 0 ? tailwindClasses.join(" ") : "text-blue-500 bg-gray-800 border border-blue-500 rounded px-4 cursor-pointer h-8 text-sm transition-all duration-200";
  
  return {
    html: htmlVariable.replace(/class="[^"]*"/g, `className="${className}"`),
    code: `{/* Tailwind CSS Classes */}\n// ${className}`,
    description: "Tailwind CSS 类名 - 直接添加到组件 className 属性",
  };
};

const generateStyledComponents = (cssCode, htmlVariable, title) => {
  const componentName = title.replace(/\s+/g, "") || "StyledButton";
  
  const styledTemplate = `
import styled from 'styled-components';

const Styled${componentName} = styled.button\`
${cssCode.trim()}
\`;

// 使用方式
// <Styled${componentName}>Button</Styled${componentName}>
`.trim();

  return {
    html: `<Styled${componentName}>${title || "Button"}</Styled${componentName}>`,
    code: styledTemplate,
    description: "Styled Components - 适用于 React 项目",
  };
};

const generateCSSModules = (cssCode, htmlVariable, title) => {
  const moduleName = title.toLowerCase().replace(/\s+/g, "-") || "button";
  const className = `${moduleName}-btn`;
  
  const moduleCSS = `/* styles.module.css */
.${className} {
${cssCode.replace(/button\s*\{/g, "").replace(/button:hover\s*\{/g, "&:hover {").trim()}
}`.trim();

  const reactCode = `
import styles from './styles.module.css';

// 使用方式
<button className={styles.${className.replace(/-/g, "")}}>
  ${title || "Button"}
</button>
`.trim();

  return {
    html: `<button className={styles.${className.replace(/-/g, "")}}>${title || "Button"}</button>`,
    code: moduleCSS + "\n\n/* React 组件 */\n" + reactCode,
    description: "CSS Modules - 适用于 React + CSS Modules 项目",
  };
};

const generateInlineStyle = (cssCode, htmlVariable, title) => {
  const styleMap = {};
  
  const cssMatches = cssCode.match(/([a-z-]+):\s*([^;]+);/gi) || [];
  cssMatches.forEach((match) => {
    const [property, value] = match.split(":").map((s) => s.trim().replace(";", ""));
    if (property && value && !property.includes("@keyframes") && !property.includes("transition")) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      styleMap[camelCaseProperty] = value;
    }
  });

  const styleObject = JSON.stringify(styleMap, null, 2).replace(/"/g, "'");
  
  const inlineCode = `
// 内联样式
const buttonStyle = ${styleObject};

// 使用方式
<button style={buttonStyle}>
  ${title || "Button"}
</button>
`.trim();

  return {
    html: `<button style={${styleObject}}>${title || "Button"}</button>`,
    code: inlineCode,
    description: "内联样式 - 直接用于 style 属性",
  };
};

const generateCode = (format, cssCode, htmlVariable, theme, title = "Button") => {
  const themedCSS = parseCSSVariables(cssCode, theme);
  
  switch (format) {
    case codeFormats.TAILWIND:
      return generateTailwindCSS(themedCSS, htmlVariable);
    case codeFormats.STYLED_COMPONENTS:
      return generateStyledComponents(themedCSS, htmlVariable, title);
    case codeFormats.CSS_MODULES:
      return generateCSSModules(themedCSS, htmlVariable, title);
    case codeFormats.INLINE:
      return generateInlineStyle(themedCSS, htmlVariable, title);
    case codeFormats.CSS:
    default:
      return {
        html: htmlVariable,
        code: themedCSS,
        description: "原生 CSS - 直接复制使用",
      };
  }
};

export { codeFormats, generateCode, parseCSSVariables };

export const generateReactComponent = (effectName, htmlVariable, cssVariable, options = {}) => {
  const { styleType = 'inline', componentName = effectName } = options;
  
  const safeComponentName = componentName
    .replace(/[^a-zA-Z0-9]/g, '')
    .charAt(0).toUpperCase() + componentName.slice(1).replace(/[^a-zA-Z0-9]/g, '');
  
  let component = '';
  
  if (styleType === 'inline') {
    component = `import React from 'react';

const ${safeComponentName} = () => {
  const styles = {
    container: {
      // Base styles
    }
  };

  return (
    <div style={styles.container}>
${htmlVariable.trim().split('\n').map(line => `      ${line}`).join('\n')}
    </div>
  );
};

export default ${safeComponentName};

/* 
 * 内联样式说明:
 * 由于 React 内联样式不支持伪类(:hover, :active等)和动画，
 * 建议将以下 CSS 添加到项目的样式文件中:
 */

/*
${cssVariable.trim()}
*/
`;
  } else if (styleType === 'cssModules') {
    component = `import React from 'react';
import styles from './${safeComponentName}.module.css';

const ${safeComponentName} = () => {
  return (
    <div className={styles.container}>
${htmlVariable.trim().split('\n').map(line => `      ${line.replace(/class=/g, 'className=')}`).join('\n')}
    </div>
  );
};

export default ${safeComponentName};
`;
  } else {
    component = `import React from 'react';
import './${safeComponentName}.css';

const ${safeComponentName} = () => {
  return (
    <div>
${htmlVariable.trim().split('\n').map(line => `      ${line.replace(/class=/g, 'className=')}`).join('\n')}
    </div>
  );
};

export default ${safeComponentName};
`;
  }
  
  return component;
};

export const generateVueComponent = (effectName, htmlVariable, cssVariable, options = {}) => {
  const { styleType = 'scoped', componentName = effectName } = options;
  
  const safeComponentName = componentName
    .replace(/[^a-zA-Z0-9]/g, '')
    .charAt(0).toUpperCase() + componentName.slice(1).replace(/[^a-zA-Z0-9]/g, '');
  
  const scopedAttr = styleType === 'scoped' ? ' scoped' : '';
  
  const component = `<template>
  <div class="${safeComponentName.toLowerCase()}-container">
${htmlVariable.trim().split('\n').map(line => `    ${line}`).join('\n')}
  </div>
</template>

<script>
export default {
  name: '${safeComponentName}',
  props: {
    // 添加你的 props 定义
  },
  data() {
    return {
      // 添加你的数据
    };
  },
  methods: {
    // 添加你的方法
  }
};
</script>

<style${scopedAttr}>
/* ${effectName} 效果样式 */

${cssVariable.trim()}

/* 容器样式 */
.${safeComponentName.toLowerCase()}-container {
  display: inline-block;
}
</style>
`;
  
  return component;
};

export const generateSvelteComponent = (effectName, htmlVariable, cssVariable, options = {}) => {
  const { componentName = effectName } = options;
  
  const safeComponentName = componentName
    .replace(/[^a-zA-Z0-9]/g, '')
    .charAt(0).toUpperCase() + componentName.slice(1).replace(/[^a-zA-Z0-9]/g, '');
  
  const component = `<script>
  export let title = '${effectName}';
</script>

<div class="${safeComponentName.toLowerCase()}-container">
${htmlVariable.trim().split('\n').map(line => `  ${line}`).join('\n')}
</div>

<style>
/* ${effectName} 效果样式 */

${cssVariable.trim()}

/* 容器样式 */
.${safeComponentName.toLowerCase()}-container {
  display: inline-block;
}
</style>
`;
  
  return component;
};

export const generateCSSModuleFile = (cssVariable, componentName) => {
  const safeName = componentName
    .replace(/[^a-zA-Z0-9]/g, '')
    .charAt(0).toLowerCase() + componentName.slice(1).replace(/[^a-zA-Z0-9]/g, '');
  
  return `/* ${componentName} CSS Module */
/* 可通过 import styles from './${safeName}.module.css' 使用 */

${cssVariable.trim()}
`;
};

export const generateSeparateCSSFile = (cssVariable, componentName) => {
  return `/* 
 * ${componentName} 组件样式文件
 * 可通过 import './${componentName.toLowerCase()}.css' 使用
 */

${cssVariable.trim()}
`;
};

export const exportComponent = (effectName, htmlVariable, cssVariable, format, options = {}) => {
  let content = '';
  let fileName = '';
  let files = [];
  
  switch (format) {
    case 'react':
      content = generateReactComponent(effectName, htmlVariable, cssVariable, options);
      fileName = `${effectName.toLowerCase()}.jsx`;
      files.push({
        name: fileName,
        content: content
      });
      
      if (options.styleType === 'cssModules') {
        const cssModule = generateCSSModuleFile(cssVariable, effectName);
        files.push({
          name: `${effectName.toLowerCase()}.module.css`,
          content: cssModule
        });
      } else if (options.styleType === 'separate') {
        const cssFile = generateSeparateCSSFile(cssVariable, effectName);
        files.push({
          name: `${effectName.toLowerCase()}.css`,
          content: cssFile
        });
      }
      break;
      
    case 'vue':
      content = generateVueComponent(effectName, htmlVariable, cssVariable, options);
      fileName = `${effectName.toLowerCase()}.vue`;
      files.push({
        name: fileName,
        content: content
      });
      break;
      
    case 'svelte':
      content = generateSvelteComponent(effectName, htmlVariable, cssVariable, options);
      fileName = `${effectName.toLowerCase()}.svelte`;
      files.push({
        name: fileName,
        content: content
      });
      break;
      
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
  
  return files;
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

export const downloadMultipleFiles = (files) => {
  files.forEach((file, index) => {
    setTimeout(() => {
      downloadFile(file.content, file.name, 'text/plain');
    }, index * 500);
  });
};

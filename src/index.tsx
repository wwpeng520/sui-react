import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import './styles/index.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(React.createElement(App));
reportWebVitals();

// 组件库的根文件
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fas } from '@fortawesome/free-solid-svg-icons';
// library.add(fas as any);

// export { default as Button } from './components/Button';
// export { default as Menu } from './components/Menu';
// export { default as AutoComplete } from './components/AutoComplete';
// export { default as Icon } from './components/Icon';
// export { default as Input } from './components/Input';
// export { default as Progress } from './components/Progress';
// // export { default as Transition } from './components/Transition';
// export { default as Upload } from './components/Upload';

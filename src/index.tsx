import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.scss';

async function enableMocking() {
  // 只在開發環境啟用 MSW
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // 啟動 service worker
  return worker.start({
    onUnhandledRequest: 'bypass', // 未處理的請求直接放行
  });
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

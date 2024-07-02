import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import WebApp from '@twa-dev/sdk';
import { NextUIProvider } from '@nextui-org/react';

WebApp.ready();
WebApp.expand();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </React.StrictMode>,
)

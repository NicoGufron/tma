import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'doodle.css/doodle.css';

import WebApp from '@twa-dev/sdk';
import { BrowserRouter } from 'react-router-dom';

WebApp.ready();
WebApp.expand();
WebApp.MainButton.hide();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

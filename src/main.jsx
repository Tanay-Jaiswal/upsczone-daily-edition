import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { motionEnabled } from './motion.js';

// Switch on scroll-reveal starting states before first paint.
if (motionEnabled) document.documentElement.setAttribute('data-motion', '');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

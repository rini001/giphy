import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GifProvider } from './contexts/GifContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <GifProvider>
    <App />
    </GifProvider>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize theme
const savedTheme = localStorage.getItem('theme-storage');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultDark = savedTheme ? JSON.parse(savedTheme).state.darkMode : prefersDark;

if (defaultDark) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/archivo-black/400.css';
import '@fontsource-variable/space-grotesk';
import '@fontsource/space-mono/400.css';
import '@fontsource/space-mono/700.css';
import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<App />);

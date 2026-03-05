import React from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootEl = document.getElementById('root')
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, <React.StrictMode><App /></React.StrictMode>)
} else {
  createRoot(rootEl).render(<React.StrictMode><App /></React.StrictMode>)
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import './stylesheets/all.scss'
import App from './App.jsx'
import axios from 'axios'
import { HashRouter } from 'react-router-dom'

axios.defaults.baseURL = import.meta.env.VITE_API_URL


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
    
  </React.StrictMode>,
)

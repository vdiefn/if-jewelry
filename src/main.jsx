import React from 'react'
import ReactDOM from 'react-dom/client'
import './stylesheets/all.scss'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

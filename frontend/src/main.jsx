import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Importamos el enrutador
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css' 
import './styles/global.css' 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Envolvemos App con BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
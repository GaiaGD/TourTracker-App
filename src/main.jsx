import React from 'react'
import ReactDOM from 'react-dom/client'
import { TourContextProvider } from "./context/tour-context.jsx"
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <TourContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </TourContextProvider>,
)
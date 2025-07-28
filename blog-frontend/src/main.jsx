import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from "./context/TheneContext";
import "./Styles/index.css"

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <ThemeProvider>
    <App />
    </ThemeProvider>,
  </StrictMode>
  
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import '../src/tailwind.css' // Ensure Tailwind CSS is imported
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

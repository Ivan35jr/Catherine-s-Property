import { createRoot } from 'react-dom/client'
import { DataProvider } from './api'
import App from './App'
import './styles.css'
createRoot(document.getElementById('root')!).render(<DataProvider><App /></DataProvider>)

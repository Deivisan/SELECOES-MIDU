import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminView from './AdminView.tsx'
import '../../shared/styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdminView />
  </React.StrictMode>,
)

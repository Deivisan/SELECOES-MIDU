import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminView from './AdminView.tsx'
import '../../shared/styles/global.css'

console.log('🚀 [ADMIN MAIN] Iniciando bootstrap do Admin Dashboard')

try {
  const rootElement = document.getElementById('root')
  console.log('🚀 [ADMIN MAIN] Root element encontrado:', rootElement)
  
  if (!rootElement) {
    throw new Error('Elemento #root não encontrado no DOM!')
  }
  
  const root = ReactDOM.createRoot(rootElement)
  console.log('🚀 [ADMIN MAIN] ReactDOM.createRoot criado com sucesso')
  
  root.render(
    <React.StrictMode>
      <AdminView />
    </React.StrictMode>
  )
  
  console.log('🚀 [ADMIN MAIN] AdminView renderizado com sucesso')
} catch (error) {
  console.error('❌ [ADMIN MAIN] ERRO CRÍTICO:', error)
  document.body.innerHTML = `
    <div style="padding: 2rem; background: #fee; border: 2px solid #f00; margin: 2rem; border-radius: 8px;">
      <h1 style="color: #c00;">❌ Erro Crítico no Admin Dashboard</h1>
      <pre style="background: #fff; padding: 1rem; border-radius: 4px; overflow: auto;">${error}</pre>
      <p><strong>Abra o DevTools (F12) e veja o console para mais detalhes.</strong></p>
    </div>
  `
}


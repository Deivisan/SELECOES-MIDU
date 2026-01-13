import React from 'react'
import ReactDOM from 'react-dom/client'
import AdminView from './AdminView.tsx'
import '../../shared/styles/global.css'

// Dev helpers: console capture + global error overlay
;(function installDevHelpers() {
  try {
    if ((window as any).__DEV_CONSOLE_INSTALLED__) return
    ;(window as any).__DEV_CONSOLE_INSTALLED__ = true

    const style = document.createElement('style')
    style.innerHTML = `
      #dev-debug-console { position: fixed; right: 12px; bottom: 12px; width: 360px; max-height: 45vh; background: rgba(255,255,255,0.95); border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 10px 30px rgba(0,0,0,0.12); font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; z-index: 999999; display: flex; flex-direction: column; }
      #dev-debug-console .header { padding: 8px 10px; display:flex; align-items:center; justify-content:space-between; gap:8px; border-bottom: 1px solid rgba(0,0,0,0.04); }
      #dev-debug-console .messages { padding: 8px; overflow: auto; font-size: 12px; color: #111827; }
      #dev-debug-console .messages pre { margin: 0 0 6px 0; white-space: pre-wrap; }
      #dev-debug-console .toggle { cursor: pointer; border: none; background: transparent; font-weight: 700; }
      .dev-error-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); color: #fff; display:flex; align-items:center; justify-content:center; padding: 2rem; z-index: 999998; }
      .dev-error-box { background: #111; padding: 1.5rem; border-radius: 8px; max-width: 90%; max-height: 80%; overflow:auto; }
    `
    document.head.appendChild(style)

    const box = document.createElement('div')
    box.id = 'dev-debug-console'
    box.innerHTML = `
      <div class="header"><strong>Dev Console</strong><div><button class="toggle">▲</button></div></div>
      <div class="messages" aria-live="polite"></div>
    `
    document.body.appendChild(box)

    const msgs = box.querySelector('.messages')!
    const btn = box.querySelector('.toggle') as HTMLButtonElement
    let collapsed = false
    btn.onclick = () => {
      collapsed = !collapsed
      msgs.style.display = collapsed ? 'none' : 'block'
      btn.textContent = collapsed ? '▼' : '▲'
    }

    function append(type: string, args: any[]) {
      try {
        const pre = document.createElement('pre')
        const text = args.map(a => (typeof a === 'string' ? a : JSON.stringify(a, null, 2))).join(' ')
        pre.textContent = `[${type}] ${text}`
        msgs.appendChild(pre)
        msgs.scrollTop = msgs.scrollHeight
      } catch (e) {
        // ignore
      }
    }

    const _log = console.log.bind(console)
    const _err = console.error.bind(console)
    const _warn = console.warn.bind(console)

    console.log = (...args: any[]) => { _log(...args); append('log', args); }
    console.error = (...args: any[]) => { _err(...args); append('err', args); }
    console.warn = (...args: any[]) => { _warn(...args); append('warn', args); }

    window.addEventListener('error', (ev) => {
      append('uncaught', [ev.message, ev.filename + ':' + ev.lineno + ':' + ev.colno])
      showErrorOverlay(ev.message + '\n' + (ev.error && ev.error.stack ? ev.error.stack : ''))
    })

    window.addEventListener('unhandledrejection', (ev) => {
      append('unhandledrejection', [ev.reason])
      showErrorOverlay('Unhandled Rejection: ' + (ev.reason && ev.reason.stack ? ev.reason.stack : String(ev.reason)))
    })

    function showErrorOverlay(text: string) {
      try {
        let overlay = document.getElementById('dev-error-overlay')
        if (!overlay) {
          overlay = document.createElement('div')
          overlay.id = 'dev-error-overlay'
          overlay.className = 'dev-error-overlay'
          overlay.innerHTML = `<div class="dev-error-box"><h2 style="margin-top:0;color:#fff">❌ Erro no Admin Dashboard</h2><pre style="color:#fff;white-space:pre-wrap;">${text}</pre><div style="margin-top:1rem;text-align:right"><button id="close-error" style="padding:0.5rem 0.75rem;border-radius:6px;border:none;cursor:pointer">Fechar</button></div></div>`
          document.body.appendChild(overlay)
          document.getElementById('close-error')!.onclick = () => overlay!.remove()
        }
      } catch (e) {
        // ignore
      }
    }
  } catch (error) {
    // fail silently
    console.error('Failed to install dev helpers', error)
  }
})()

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


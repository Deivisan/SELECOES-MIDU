import React from 'react'

type Props = { children: React.ReactNode }
type State = { hasError: boolean; error: any }

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary caught error:', error, info)
    this.setState({ hasError: true, error })
    // Additionally store a local log entry for analysis
    try {
      const prev = localStorage.getItem('admin_error_log')
      const next = JSON.stringify({ error: String(error), info, time: new Date().toISOString() })
      localStorage.setItem('admin_error_log', prev ? `${prev}\n${next}` : next)
    } catch (e) {
      // ignore
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', maxWidth: 900, margin: '3rem auto', background: '#fff', borderRadius: 8, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}>
          <h1 style={{ color: '#b91c1c' }}>❌ Erro no Admin Dashboard</h1>
          <p>Ocorreu um erro inesperado. Você pode tentar modo de segurança (desativa gráficos e recursos avançados) ou recarregar a página.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                try { localStorage.setItem('admin_safe_mode', 'true') } catch (e) {}
                location.reload()
              }}
            >Abrir em Modo Seguro</button>

            <button
              className="btn"
              onClick={() => {
                try { localStorage.removeItem('admin_safe_mode') } catch (e) {}
                location.reload()
              }}
            >Tentar Recarregar</button>
          </div>

          <details style={{ marginTop: '1rem' }}>
            <summary style={{ cursor: 'pointer' }}>Detalhes do erro (copiar e enviar)</summary>
            <pre style={{ whiteSpace: 'pre-wrap', marginTop: '0.5rem' }}>{String(this.state.error)}</pre>
          </details>
        </div>
      )
    }

    return this.props.children
  }
}

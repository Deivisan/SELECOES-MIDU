import React, { useState, useEffect } from 'react'
import ViewSelector from '../../shared/components/ViewSelector'
import '../../shared/styles/themes.css'

type ThemeType = 'default' | 'teal' | 'purple' | 'orange' | 'pink' | 'cyan'

export default function EmpresasView() {
  const [theme, setTheme] = useState<ThemeType>('default')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['default', 'teal', 'purple', 'orange', 'pink', 'cyan'].includes(themeParam)) {
      setTheme(themeParam)
    }
    setMounted(true)
  }, [])

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
    window.history.replaceState({}, '', `?theme=${newTheme}`)
  }

  if (!mounted) return null

  const empresas = [
    { name: 'Cacau do Sul', sector: 'Agronegócio', location: 'Ilhéus, BA', desc: 'Líder em exportação de cacau fino e derivados sustentáveis.' },
    { name: 'Sertão Tech', sector: 'Tecnologia', location: 'Feira de Santana, BA', desc: 'Desenvolvimento de software para gestão de grandes fazendas.' },
    { name: 'Vento Forte', sector: 'Energia', location: 'Caetité, BA', desc: 'Pioneira em manutenção de turbinas eólicas no interior baiano.' },
    { name: 'Bahia Log', sector: 'Logística', location: 'Simões Filho, BA', desc: 'Distribuição inteligente para todo o Nordeste brasileiro.' },
    { name: 'Mineral Minério', sector: 'Mineração', location: 'Jacobina, BA', desc: 'Extração responsável com certificação ambiental internacional.' },
    { name: 'Costa Mar Hotel', sector: 'Turismo', location: 'Porto Seguro, BA', desc: 'Resort 5 estrelas focado em ecoturismo e hospitalidade premium.' },
    { name: 'Recôncavo Agro', sector: 'Alimentos', location: 'Santo Antônio de Jesus, BA', desc: 'Processamento de frutas tropicais para o mercado europeu.' },
    { name: 'Porto Digital Salvador', sector: 'Inovação', location: 'Salvador, BA', desc: 'Hub de startups focado em economia criativa e web3.' },
    { name: 'Chapada Orgânicos', sector: 'Agrícola', location: 'Lençóis, BA', desc: 'Produção familiar de café e hortaliças 100% orgânicas.' },
    { name: 'Indústria Veloz', sector: 'Manufatura', location: 'Camaçari, BA', desc: 'Peças de alta precisão para o setor automobilístico.' }
  ]

  return (
    <div className={`theme-${theme}`}>
      <ViewSelector 
        theme={theme} 
        onThemeChange={changeTheme}
        onViewChange={() => {}}
      />

      <nav className="navbar">
        <a href="/SELECOES-MIDU/public.html" className="navbar-brand">
          <div className="navbar-logo">M</div>
          <div>
            <div className="navbar-title">Midu Group</div>
            <div className="navbar-subtitle">Empresas Parceiras</div>
          </div>
        </a>
        <div className="navbar-nav">
          <a href="/SELECOES-MIDU/public.html" className="navbar-link">Início</a>
          <a href="/SELECOES-MIDU/sobre.html" className="navbar-link">Sobre</a>
          <a href="/SELECOES-MIDU/portal.html" className="btn btn-primary">Portal do Candidato</a>
        </div>
      </nav>

      <main style={{ minHeight: 'calc(100vh - 73px)' }}>
        <section style={{ padding: 'var(--space-16) var(--space-6)', background: 'var(--gradient-section)' }}>
          <div className="container">
            <div className="text-center mb-12 animate-fadeInUp">
              <h1 className="text-display" style={{ marginBottom: 'var(--space-4)' }}>
                Nossas Parcerias Estratégicas
              </h1>
              <p className="text-body" style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
                Conectamos profissionais qualificados a empresas que são referência em seus setores 
                em todo o estado da Bahia. Conheça algumas das organizações que confiam na Midu Group.
              </p>
            </div>

            <div className="grid grid-3 gap-8">
              {empresas.map((emp, i) => (
                <div key={emp.name} className={`card p-8 animate-fadeInUp`} style={{ animationDelay: `${i * 100}ms` }}>
                  <div className="badge badge-primary" style={{ marginBottom: 'var(--space-4)' }}>{emp.sector}</div>
                  <h3 className="text-h3 mb-2">{emp.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginBottom: 'var(--space-4)' }}>
                    📍 {emp.location}
                  </p>
                  <p className="text-body" style={{ fontSize: '1rem' }}>
                    {emp.desc}
                  </p>
                </div>
              ))}
            </div>

            <section style={{ marginTop: 'var(--space-16)', background: 'var(--color-primary)', borderRadius: 'var(--radius-2xl)', padding: 'var(--space-12) var(--space-8)', textAlign: 'center', color: 'white' }}>
              <h2 className="text-h1" style={{ color: 'white', marginBottom: 'var(--space-4)' }}>Sua empresa também pode ser parceira</h2>
              <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: 'var(--space-8)', maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
                Descubra como a Midu Group pode transformar seu processo de recrutamento com tecnologia e inteligência.
              </p>
              <button className="btn btn-lg" style={{ background: 'white', color: 'var(--color-primary)' }}>
                Falar com Especialista
              </button>
            </section>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-brand">Midu Group</div>
          <p className="footer-text">© 2026 Midu Group — Construindo o futuro do trabalho na Bahia.</p>
        </div>
      </footer>
    </div>
  )
}

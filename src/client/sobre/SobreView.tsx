import React, { useState, useEffect } from 'react'
import ViewSelector from '../../shared/components/ViewSelector'
import '../../shared/styles/themes.css'

type ThemeType = 'default' | 'teal' | 'purple' | 'orange' | 'pink' | 'cyan'

export default function SobreView() {
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
            <div className="navbar-subtitle">Sobre Nós</div>
          </div>
        </a>
        <div className="navbar-nav">
          <a href="/SELECOES-MIDU/public.html" className="navbar-link">Início</a>
          <a href="/SELECOES-MIDU/public.html#vagas" className="navbar-link">Vagas</a>
          <a href="/SELECOES-MIDU/portal.html" className="btn btn-primary">Portal do Candidato</a>
        </div>
      </nav>

      <main style={{ minHeight: 'calc(100vh - 73px)' }}>
        <section style={{ 
          padding: 'var(--space-16) var(--space-6)', 
          background: 'var(--gradient-section)'
        }}>
          <div className="container container-sm">
            <div className="text-center mb-8 animate-fadeInUp">
              <h1 className="text-display" style={{ marginBottom: 'var(--space-4)' }}>
                Sobre a Midu Group
              </h1>
              <p className="text-body" style={{ fontSize: '1.25rem', lineHeight: 1.8, color: 'var(--color-gray-700)' }}>
                A <strong>Midu Group</strong> é uma empresa baiana especializada em <strong>recrutamento e seleção</strong> de profissionais 
                para o mercado corporativo da Bahia. Fundada por <strong>Daniel Duarte</strong>, profissional com sólida experiência em 
                Recursos Humanos e certificações internacionais.
              </p>
            </div>

            <div className="grid grid-2 gap-8 mt-8">
              <div className="card p-8 animate-slideInRight delay-200">
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🎯</div>
                <h3 className="text-h3 mb-4">Nossa Missão</h3>
                <p className="text-body">
                  Facilitar processos seletivos de alta qualidade, reduzindo tempo de contratação e aumentando 
                  a taxa de acerto no match entre empresas e profissionais. Atuamos com foco em diversidade, 
                  equidade e inclusão (DEI), garantindo processos justos e transparentes.
                </p>
              </div>

              <div className="card p-8 animate-slideInLeft delay-300">
                <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>💼</div>
                <h3 className="text-h3 mb-4">Nosso Diferencial</h3>
                <p className="text-body">
                  Combinamos <strong>tecnologia moderna</strong> com <strong>olhar humano especializado</strong>. 
                  Utilizamos plataformas digitais para agilidade, mas mantemos entrevistas estruturadas e 
                  avaliações comportamentais conduzidas por psicólogos e especialistas em RH.
                </p>
              </div>
            </div>

            <div className="card p-8 mt-8 animate-fadeInUp delay-400">
              <h2 className="text-h2 mb-6">Daniel Duarte</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-8)', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    aspectRatio: '1/1', 
                    background: 'var(--color-primary-light)', 
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    marginBottom: 'var(--space-4)'
                  }}>
                    👨‍💼
                  </div>
                  <a 
                    href="https://www.linkedin.com/in/daniel-duarte-145781198" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <span>LinkedIn</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                </div>
                <div>
                  <p className="text-body mb-6">
                    Consultor de RH e Especialista em Recrutamento com foco em Diversidade e Inclusão. 
                    Daniel traz uma abordagem estratégica e humana para o mercado da Bahia, utilizando 
                    metodologias validadas internacionalmente para encontrar o melhor match entre 
                    candidatos e empresas.
                  </p>
                  <div className="grid grid-2 gap-4">
                    {[
                      'Administrative Human Resources (LinkedIn)',
                      'Equity First: Inclusion and Belonging',
                      'Strategic Human Resources',
                      'HR Recruiting Communication Strategies'
                    ].map((cert, i) => (
                      <div key={i} className="badge badge-neutral" style={{ padding: 'var(--space-3)', height: 'auto', textAlign: 'left', background: 'var(--color-gray-100)', color: 'var(--color-gray-700)', border: 'none' }}>
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <section style={{ marginTop: 'var(--space-16)', textAlign: 'center' }}>
              <h2 className="text-h1 mb-8">Por que escolher a Midu?</h2>
              <div className="grid grid-3 gap-8">
                {[
                  { icon: '🚀', title: 'Agilidade', desc: 'Processos seletivos otimizados com tecnologia de ponta.' },
                  { icon: '🤝', title: 'Humanização', desc: 'Foco no potencial humano e cultura organizacional.' },
                  { icon: '💎', title: 'Qualidade', desc: 'Candidatos rigorosamente selecionados e avaliados.' }
                ].map((item, i) => (
                  <div key={i} className="card p-6 animate-fadeInUp" style={{ animationDelay: `${(i+5)*100}ms` }}>
                    <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>{item.icon}</div>
                    <h3 className="text-h3 mb-2">{item.title}</h3>
                    <p className="text-body">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-brand">Midu Group</div>
          <p className="footer-text">© 2026 Midu Group — Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

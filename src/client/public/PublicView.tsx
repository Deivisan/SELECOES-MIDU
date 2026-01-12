import React, { useState, useEffect } from 'react'
import { mockJobs, categories } from '../../shared/data/mockData'
import type { Job } from '../../shared/types'
import '../../shared/styles/themes.css'

type ThemeType = 'default' | 'teal' | 'purple'

const themeLabels: Record<ThemeType, string> = {
  default: 'Azul',
  teal: 'Verde',
  purple: 'Roxo'
}

const themeColors: Record<ThemeType, string> = {
  default: '#2563eb',
  teal: '#0d9488',
  purple: '#7c3aed'
}

export default function PublicView() {
  const [theme, setTheme] = useState<ThemeType>('default')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['default', 'teal', 'purple'].includes(themeParam)) {
      setTheme(themeParam)
    }
    setMounted(true)
  }, [])

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'Todas' || job.category === selectedCategory
    return matchesSearch && matchesCategory && job.isActive
  })

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
    window.history.replaceState({}, '', `?theme=${newTheme}`)
  }

  if (!mounted) return null

  const activeJobs = mockJobs.filter(j => j.isActive).length
  const totalCompanies = [...new Set(mockJobs.map(j => j.company))].length

  return (
    <div className={`theme-${theme}`}>
      {/* Theme Switcher - Subtle */}
      <div style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 1000,
        display: 'flex',
        gap: '0.5rem',
        padding: '0.5rem',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        {(['default', 'teal', 'purple'] as ThemeType[]).map((t) => (
          <button
            key={t}
            onClick={() => changeTheme(t)}
            title={themeLabels[t]}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: theme === t ? '3px solid #1f2937' : '2px solid transparent',
              background: themeColors[t],
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              transform: theme === t ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <div className="navbar-logo">M</div>
          <div>
            <div className="navbar-title">Midu Group</div>
            <div className="navbar-subtitle">Miranda + Duarte</div>
          </div>
        </a>
        <div className="navbar-nav">
          <a href="#vagas" className="navbar-link navbar-link-active">Vagas</a>
          <a href="#empresas" className="navbar-link">Empresas</a>
          <a href="#sobre" className="navbar-link">Sobre</a>
          <a href="/portal.html" className="btn btn-primary">
            Portal do Candidato
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title animate-fadeInUp">
            Encontre seu próximo<br />
            <span className="hero-title-highlight">emprego na Bahia</span>
          </h1>
          <p className="hero-subtitle animate-fadeInUp delay-100">
            Conectamos os melhores talentos às melhores empresas da região. 
            Sua carreira começa aqui.
          </p>

          {/* Search Bar */}
          <div className="hero-search animate-fadeInUp delay-200">
            <input
              type="text"
              className="input input-lg"
              placeholder="Buscar por cargo, empresa ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary btn-lg">
              Buscar Vagas
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats animate-fadeInUp delay-300">
            <div className="hero-stat">
              <div className="hero-stat-value">{activeJobs}</div>
              <div className="hero-stat-label">Vagas Abertas</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">{totalCompanies}</div>
              <div className="hero-stat-label">Empresas Parceiras</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-value">2.5k+</div>
              <div className="hero-stat-label">Candidatos Conectados</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: 'var(--space-8) var(--space-6)', background: 'var(--color-white)' }}>
        <div className="container">
          <div className="category-pills">
            {categories.slice(0, 8).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill ${selectedCategory === cat ? 'category-pill-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS GRID */}
      <section id="vagas" style={{ padding: 'var(--space-12) var(--space-6)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--space-8)'
          }}>
            <div>
              <h2 className="text-h2">Vagas em Destaque</h2>
              <p className="text-body" style={{ marginTop: 'var(--space-2)' }}>
                {filteredJobs.length} oportunidades encontradas
              </p>
            </div>
          </div>

          <div className="grid grid-jobs">
            {filteredJobs.map((job, i) => (
              <a 
                key={job.id}
                href={`/portal.html?theme=${theme}&job=${job.id}`}
                style={{ textDecoration: 'none' }}
                className={`animate-fadeInUp delay-${Math.min((i % 5) + 1, 5) * 100}`}
              >
                <div className="job-card">
                  <div className="job-card-header">
                    <div className="job-card-badges">
                      <span className="badge badge-primary">{job.type}</span>
                      <span className="badge badge-neutral">{job.modality}</span>
                    </div>
                  </div>
                  <h3 className="job-card-title">{job.title}</h3>
                  <p className="job-card-company">{job.company}</p>
                  <p className="job-card-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {job.location}
                  </p>
                  {job.salary && (
                    <p className="job-card-salary">{job.salary}</p>
                  )}
                </div>
              </a>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3 className="empty-state-title">Nenhuma vaga encontrada</h3>
              <p className="empty-state-text">
                Tente ajustar seus filtros ou termo de busca
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ 
        padding: 'var(--space-16) var(--space-6)',
        background: 'var(--gradient-primary)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: 'white',
            marginBottom: 'var(--space-4)'
          }}>
            Pronto para dar o próximo passo?
          </h2>
          <p style={{ 
            fontSize: '1.125rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '500px',
            margin: '0 auto var(--space-8)'
          }}>
            Crie seu perfil gratuitamente e candidate-se às melhores vagas da Bahia.
          </p>
          <a 
            href="/portal.html" 
            className="btn btn-lg"
            style={{ 
              background: 'white', 
              color: 'var(--color-primary)',
              fontWeight: 600
            }}
          >
            Criar Meu Perfil
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">Midu Group</div>
          <p className="footer-text">
            © 2026 Midu Group — Miranda + Duarte. Todos os direitos reservados.
          </p>
          <p className="footer-text" style={{ marginTop: 'var(--space-2)' }}>
            Desenvolvido na Bahia com 💙
          </p>
        </div>
      </footer>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { mockJobs, categories } from '../../shared/data/mockData'
import type { Job } from '../../shared/types'
import ViewSelector from '../../shared/components/ViewSelector'
import '../../shared/styles/themes.css'

type ThemeType = 'default' | 'teal' | 'purple' | 'orange' | 'pink' | 'cyan'

const themeLabels: Record<ThemeType, string> = {
  default: 'Azul',
  teal: 'Verde',
  purple: 'Roxo',
  orange: 'Laranja',
  pink: 'Rosa',
  cyan: 'Ciano'
}

const themeColors: Record<ThemeType, string> = {
  default: '#2563eb',
  teal: '#0d9488',
  purple: '#7c3aed',
  orange: '#f97316',
  pink: '#ec4899',
  cyan: '#06b6d4'
}

export default function PublicView() {
  const [theme, setTheme] = useState<ThemeType>('default')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['default', 'teal', 'purple', 'orange', 'pink', 'cyan'].includes(themeParam)) {
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
      {/* View Selector with Theme Switcher */}
      <ViewSelector 
        theme={theme} 
        onThemeChange={changeTheme}
        onViewChange={() => {}}
      />

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <div className="navbar-logo">M</div>
          <div>
            <div className="navbar-title">Midu Group</div>
            <div className="navbar-subtitle">Recrutamento e Seleção</div>
          </div>
        </a>
        <div className="navbar-nav">
          <a href="#vagas" className="navbar-link">Vagas</a>
          <a href="#sobre" className="navbar-link">Sobre</a>
          <a href="#empresas" className="navbar-link">Empresas</a>
          <a href="/portal.html" className="btn btn-primary">
            Portal do Candidato
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title animate-fadeInUp" style={{ color: 'white' }}>
            Conectando talentos<br />
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>às melhores oportunidades da Bahia</span>
          </h1>
          <p className="hero-subtitle animate-fadeInUp delay-100" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '650px' }}>
            Plataforma especializada em recrutamento e seleção para empresas e profissionais baianos. 
            Sua próxima grande carreira começa aqui.
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
            <div className="hero-stat animate-scaleIn delay-400">
              <div className="hero-stat-value" style={{ color: 'white' }}>{activeJobs}</div>
              <div className="hero-stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Vagas Abertas</div>
            </div>
            <div className="hero-stat animate-scaleIn delay-500">
              <div className="hero-stat-value" style={{ color: 'white' }}>{totalCompanies}</div>
              <div className="hero-stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Empresas Parceiras</div>
            </div>
            <div className="hero-stat animate-scaleIn delay-600">
              <div className="hero-stat-value" style={{ color: 'white' }}>2.5k+</div>
              <div className="hero-stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>Candidatos Conectados</div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE SECTION */}
      <section id="sobre" style={{ 
        padding: 'var(--space-16) var(--space-6)', 
        background: 'var(--gradient-section)'
      }}>
        <div className="container container-sm">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>
              Sobre a Midu Group
            </h2>
            <p className="text-body" style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-gray-700)' }}>
              A <strong>Midu Group</strong> é uma empresa baiana especializada em <strong>recrutamento e seleção</strong> de profissionais 
              para o mercado corporativo da Bahia. Fundada por <strong>Daniel Duarte</strong>, profissional com sólida experiência em 
              Recursos Humanos e certificações internacionais (LinkedIn HR, Equity & Inclusion, Strategic HR), nossa missão é 
              <strong> conectar talentos qualificados às empresas que buscam crescimento e inovação</strong>.
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

          <div className="mt-8 animate-fadeInUp delay-400" style={{ 
            padding: 'var(--space-8)', 
            background: 'var(--color-white)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)'
          }}>
            <h3 className="text-h3 mb-4 text-center">🏆 Áreas de Atuação</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)'
            }}>
              {['Tecnologia', 'Comercial', 'Administrativo', 'Financeiro', 'Engenharia', 'Logística', 'Marketing', 'Educação'].map((area, i) => (
                <div key={area} className={`animate-scaleIn delay-${(i + 5) * 100}`} style={{
                  padding: 'var(--space-3)',
                  background: 'var(--color-primary-light)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  fontWeight: 600,
                  color: 'var(--color-primary)'
                }}>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EMPRESAS PARCEIRAS */}
      <section id="empresas" style={{ 
        padding: 'var(--space-16) var(--space-6)',
        background: 'var(--color-white)'
      }}>
        <div className="container">
          <div className="text-center mb-8 animate-fadeInUp">
            <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>
              Empresas Parceiras
            </h2>
            <p className="text-body" style={{ fontSize: '1.125rem' }}>
              Trabalhamos com as principais empresas da Bahia e do Brasil
            </p>
          </div>

          <div className="grid grid-4 gap-6">
            {[
              { name: 'Ford', sector: 'Automotivo' },
              { name: 'Braskem', sector: 'Químico' },
              { name: 'Petrobras', sector: 'Energia' },
              { name: 'Suzano', sector: 'Papel e Celulose' },
              { name: 'BRF', sector: 'Alimentos' },
              { name: 'Localiza', sector: 'Mobilidade' },
              { name: 'C&A', sector: 'Varejo' },
              { name: 'Ambev', sector: 'Bebidas' }
            ].map((company, i) => (
              <div key={company.name} className={`card p-6 text-center animate-scaleIn delay-${(i + 2) * 100}`}>
                <div style={{ 
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  color: 'var(--color-primary)',
                  marginBottom: 'var(--space-2)'
                }}>
                  {company.name}
                </div>
                <div className="badge badge-neutral">{company.sector}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{ padding: 'var(--space-8) var(--space-6)', background: 'var(--gradient-section)' }}>
        <div className="container">
          <h3 className="text-h3 text-center mb-6 animate-fadeInUp">Explore por Categoria</h3>
          <div className="category-pills animate-fadeInUp delay-200">
            {categories.slice(0, 8).map((cat, i) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`category-pill animate-scaleIn delay-${(i + 3) * 100} ${selectedCategory === cat ? 'category-pill-active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* JOBS GRID */}
      <section id="vagas" style={{ padding: 'var(--space-12) var(--space-6)', background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 'var(--space-8)'
          }}>
            <div className="animate-fadeInUp">
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
                className={`animate-fadeInUp delay-${Math.min((i % 6) + 1, 6) * 100}`}
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
            <div className="empty-state animate-fadeInUp">
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
          <div className="footer-brand animate-pulse">Midu Group</div>
          <p className="footer-text">
            © 2026 Midu Group — Recrutamento e Seleção. Todos os direitos reservados.
          </p>
          <p className="footer-text" style={{ marginTop: 'var(--space-2)' }}>
            Desenvolvido na Bahia com 💙 por Daniel Duarte
          </p>
        </div>
      </footer>
    </div>
  )
}

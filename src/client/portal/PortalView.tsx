import React, { useState, useEffect } from 'react'
import { mockJobs } from '../../shared/data/mockData'
import type { Job } from '../../shared/types'
import ViewSelector from '../../shared/components/ViewSelector'
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

export default function PortalView() {
  const [theme, setTheme] = useState<ThemeType>('default')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [activeTab, setActiveTab] = useState<'vagas' | 'candidaturas' | 'perfil'>('vagas')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    const jobId = params.get('job')
    
    if (themeParam && ['default', 'teal', 'purple'].includes(themeParam)) {
      setTheme(themeParam)
    }
    
    if (jobId) {
      const job = mockJobs.find(j => j.id === jobId)
      if (job) setSelectedJob(job)
    }
    
    setMounted(true)
  }, [])

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
    const params = new URLSearchParams(window.location.search)
    params.set('theme', newTheme)
    window.history.replaceState({}, '', `?${params.toString()}`)
  }

  if (!mounted) return null

  // Mock user data
  const user = {
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    applications: 5,
    savedJobs: 3
  }

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
        <a href="/public.html" className="navbar-brand">
          <div className="navbar-logo">M</div>
          <div>
            <div className="navbar-title">Midu Group</div>
            <div className="navbar-subtitle">Portal do Candidato</div>
          </div>
        </a>
        <div className="navbar-nav">
          <button 
            className={`navbar-link ${activeTab === 'vagas' ? 'navbar-link-active' : ''}`}
            onClick={() => { setActiveTab('vagas'); setSelectedJob(null); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Explorar Vagas
          </button>
          <button 
            className={`navbar-link ${activeTab === 'candidaturas' ? 'navbar-link-active' : ''}`}
            onClick={() => { setActiveTab('candidaturas'); setSelectedJob(null); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Minhas Candidaturas
          </button>
          <button 
            className={`navbar-link ${activeTab === 'perfil' ? 'navbar-link-active' : ''}`}
            onClick={() => { setActiveTab('perfil'); setSelectedJob(null); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Meu Perfil
          </button>
          <div className="avatar">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </nav>

      <main style={{ minHeight: 'calc(100vh - 73px)' }}>
        {/* JOB DETAIL VIEW */}
        {selectedJob && (
          <div style={{ padding: 'var(--space-8) var(--space-6)' }}>
            <div className="container container-sm">
              <button 
                onClick={() => setSelectedJob(null)}
                className="btn btn-ghost"
                style={{ marginBottom: 'var(--space-6)' }}
              >
                ← Voltar às vagas
              </button>

              <div className="card animate-fadeInUp" style={{ padding: 'var(--space-8)' }}>
                {/* Header */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    <span className="badge badge-primary">{selectedJob.type}</span>
                    <span className="badge badge-neutral">{selectedJob.modality}</span>
                    <span className="badge badge-neutral">{selectedJob.category}</span>
                  </div>
                  
                  <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>
                    {selectedJob.title}
                  </h1>
                  
                  <p style={{ 
                    fontSize: '1.125rem', 
                    fontWeight: 500, 
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {selectedJob.company}
                  </p>
                  
                  <p className="text-body" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {selectedJob.location}
                  </p>
                </div>

                {/* Salary */}
                {selectedJob.salary && (
                  <div style={{ 
                    padding: 'var(--space-4)', 
                    background: 'var(--color-success-light)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-6)'
                  }}>
                    <p className="text-small" style={{ marginBottom: 'var(--space-1)' }}>Faixa Salarial</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-success)' }}>
                      {selectedJob.salary}
                    </p>
                  </div>
                )}

                {/* Description */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 className="text-h3" style={{ marginBottom: 'var(--space-3)' }}>Descrição da Vaga</h3>
                  <p className="text-body" style={{ lineHeight: 1.8 }}>{selectedJob.description}</p>
                </div>

                {/* Requirements */}
                <div style={{ marginBottom: 'var(--space-6)' }}>
                  <h3 className="text-h3" style={{ marginBottom: 'var(--space-3)' }}>Requisitos</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} style={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        gap: 'var(--space-3)',
                        padding: 'var(--space-3)',
                        background: 'var(--color-gray-50)',
                        borderRadius: 'var(--radius-md)'
                      }}>
                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>✓</span>
                        <span className="text-body">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <h3 className="text-h3" style={{ marginBottom: 'var(--space-3)' }}>Benefícios</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                    {selectedJob.benefits.map((benefit, i) => (
                      <span key={i} className="tag">{benefit}</span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div style={{ 
                  display: 'flex', 
                  gap: 'var(--space-4)',
                  paddingTop: 'var(--space-6)',
                  borderTop: '1px solid var(--color-gray-200)'
                }}>
                  <button className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                    Candidatar-se Agora
                  </button>
                  <button className="btn btn-secondary btn-lg">
                    Salvar Vaga
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* JOBS LIST VIEW */}
        {!selectedJob && activeTab === 'vagas' && (
          <div style={{ padding: 'var(--space-8) var(--space-6)' }}>
            <div className="container">
              {/* Welcome Banner */}
              <div className="card animate-fadeInUp" style={{ 
                padding: 'var(--space-8)',
                background: 'var(--gradient-hero)',
                marginBottom: 'var(--space-8)'
              }}>
                <h2 className="text-h1">Olá, {user.name.split(' ')[0]}! 👋</h2>
                <p className="text-body" style={{ marginTop: 'var(--space-2)', maxWidth: '500px' }}>
                  Você tem {user.applications} candidaturas ativas e {user.savedJobs} vagas salvas.
                  Continue explorando novas oportunidades!
                </p>
              </div>

              {/* Jobs Section */}
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <h2 className="text-h2">Vagas Recomendadas</h2>
                <p className="text-body" style={{ marginTop: 'var(--space-1)' }}>
                  Baseadas no seu perfil e interesses
                </p>
              </div>

              <div className="grid grid-jobs">
                {mockJobs.slice(0, 6).map((job, i) => (
                  <div 
                    key={job.id}
                    className={`job-card animate-fadeInUp delay-${Math.min((i % 5) + 1, 5) * 100}`}
                    onClick={() => setSelectedJob(job)}
                  >
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
                ))}
              </div>
            </div>
          </div>
        )}

        {/* APPLICATIONS VIEW */}
        {!selectedJob && activeTab === 'candidaturas' && (
          <div style={{ padding: 'var(--space-8) var(--space-6)' }}>
            <div className="container">
              <h2 className="text-h1" style={{ marginBottom: 'var(--space-2)' }}>
                Minhas Candidaturas
              </h2>
              <p className="text-body" style={{ marginBottom: 'var(--space-8)' }}>
                Acompanhe o status das suas candidaturas
              </p>

              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Vaga</th>
                      <th>Empresa</th>
                      <th>Data</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockJobs.slice(0, 5).map((job, i) => {
                      const statuses = ['Em análise', 'Entrevista', 'Aprovado', 'Em análise', 'Reprovado']
                      const statusColors = {
                        'Em análise': 'badge-warning',
                        'Entrevista': 'badge-primary',
                        'Aprovado': 'badge-success',
                        'Reprovado': 'badge-error'
                      }
                      const status = statuses[i]
                      return (
                        <tr key={job.id}>
                          <td style={{ fontWeight: 500 }}>{job.title}</td>
                          <td>{job.company}</td>
                          <td className="text-muted">
                            {new Date(Date.now() - i * 86400000 * 3).toLocaleDateString('pt-BR')}
                          </td>
                          <td>
                            <span className={`badge ${statusColors[status as keyof typeof statusColors]}`}>
                              {status}
                            </span>
                          </td>
                          <td>
                            <button 
                              className="btn btn-ghost btn-sm"
                              onClick={() => setSelectedJob(job)}
                            >
                              Ver detalhes
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE VIEW */}
        {!selectedJob && activeTab === 'perfil' && (
          <div style={{ padding: 'var(--space-8) var(--space-6)' }}>
            <div className="container container-sm">
              <h2 className="text-h1" style={{ marginBottom: 'var(--space-8)' }}>
                Meu Perfil
              </h2>

              <div className="card animate-fadeInUp" style={{ padding: 'var(--space-8)', marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginBottom: 'var(--space-6)' }}>
                  <div className="avatar avatar-lg">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-h2">{user.name}</h3>
                    <p className="text-body">{user.email}</p>
                  </div>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: 'var(--space-4)',
                  paddingTop: 'var(--space-6)',
                  borderTop: '1px solid var(--color-gray-200)'
                }}>
                  <div className="stat-card">
                    <div className="stat-value stat-value-primary">{user.applications}</div>
                    <div className="stat-label">Candidaturas</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value stat-value-primary">{user.savedJobs}</div>
                    <div className="stat-label">Vagas Salvas</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value stat-value-primary">85%</div>
                    <div className="stat-label">Perfil Completo</div>
                  </div>
                </div>
              </div>

              <div className="card animate-fadeInUp delay-100" style={{ padding: 'var(--space-6)' }}>
                <h3 className="text-h3" style={{ marginBottom: 'var(--space-4)' }}>Completude do Perfil</h3>
                <div className="progress" style={{ marginBottom: 'var(--space-3)' }}>
                  <div className="progress-bar" style={{ width: '85%' }}></div>
                </div>
                <p className="text-small">
                  Complete seu perfil para aumentar suas chances de ser encontrado por recrutadores.
                </p>
                <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>
                  Completar Perfil
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-brand">Midu Group</div>
          <p className="footer-text">
            © 2026 Midu Group — Portal do Candidato
          </p>
        </div>
      </footer>
    </div>
  )
}

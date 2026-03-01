import React, { useState, useEffect } from 'react'
import { mockJobs } from '../../shared/data/mockData'
import type { Job } from '../../shared/types'
import ViewSelector from '../../shared/components/ViewSelector'
import '../../shared/styles/themes.css'

type ThemeType = 'default' | 'teal' | 'purple' | 'orange' | 'pink' | 'cyan' | 'portal'

const themeLabels: Record<ThemeType, string> = {
  default: 'Azul',
  teal: 'Verde',
  purple: 'Roxo',
  orange: 'Laranja',
  pink: 'Rosa',
  cyan: 'Ciano',
  portal: 'Claro'
}

const themeColors: Record<ThemeType, string> = {
  default: '#2563eb',
  teal: '#0d9488',
  purple: '#7c3aed',
  orange: '#f97316',
  pink: '#ec4899',
  cyan: '#06b6d4',
  portal: '#2563eb'
}

export default function PortalView() {
  const [theme, setTheme] = useState<ThemeType>('portal')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [activeTab, setActiveTab] = useState<'vagas' | 'candidaturas' | 'perfil'>('vagas')
  const [mounted, setMounted] = useState(false)
  const [myApplications, setMyApplications] = useState<string[]>([])
  const [userProfile, setUserProfile] = useState({
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(75) 99999-9999',
    linkedin: 'linkedin.com/in/mariasilva',
    bio: 'Profissional de RH com 5 anos de experiência.'
  })
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    // Carregar candidaturas
    const savedApps = localStorage.getItem('midu_candidaturas')
    if (savedApps) setMyApplications(JSON.parse(savedApps))

    // Carregar perfil
    const savedProfile = localStorage.getItem('midu_profile')
    if (savedProfile) setUserProfile(JSON.parse(savedProfile))

    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    const jobId = params.get('job')
    
    if (themeParam && ['default', 'teal', 'purple', 'orange', 'pink', 'cyan', 'portal'].includes(themeParam)) {
      setTheme(themeParam)
    } else {
      // Default to portal theme for cleaner look
      setTheme('portal')
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

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleApply = (jobId: string) => {
    if (!myApplications.includes(jobId)) {
      const updated = [...myApplications, jobId]
      setMyApplications(updated)
      localStorage.setItem('midu_candidaturas', JSON.stringify(updated))
      showToast('Candidatura enviada com sucesso! 🚀')
    } else {
      showToast('Você já se candidatou a esta vaga.', 'error')
    }
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('midu_profile', JSON.stringify(userProfile))
    showToast('Perfil atualizado com sucesso! ✨')
  }

  if (!mounted) return null

  const user = {
    ...userProfile,
    applications: myApplications.length,
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
        <a href="/SELECOES-MIDU/public.html" className="navbar-brand">
          <div className="navbar-logo">M</div>
          <div>
            <div className="navbar-title">Midu Group</div>
            <div className="navbar-subtitle">Portal do Candidato</div>
          </div>
        </a>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            className={`navbar-link ${activeTab === 'vagas' ? 'navbar-link-active' : ''}`}
            onClick={() => { setActiveTab('vagas'); setSelectedJob(null); setMobileMenuOpen(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ marginRight: '8px' }}>🔍</span> Explorar Vagas
          </button>
          <button 
            className={`navbar-link ${activeTab === 'candidaturas' ? 'navbar-link-active' : ''}`}
            onClick={() => { setActiveTab('candidaturas'); setSelectedJob(null); setMobileMenuOpen(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ marginRight: '8px' }}>📂</span> Minhas Candidaturas
          </button>
          <button 
            className={`navbar-link ${activeTab === 'perfil' ? 'navbar-link-active' : ''}`}
            onClick={() => { setActiveTab('perfil'); setSelectedJob(null); setMobileMenuOpen(false); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{ marginRight: '8px' }}>👤</span> Meu Perfil
          </button>
          <div className="avatar" style={{ marginLeft: '8px' }}>
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
                  <button 
                    className="btn btn-primary btn-lg" 
                    style={{ flex: 1 }}
                    onClick={() => handleApply(selectedJob.id)}
                    disabled={myApplications.includes(selectedJob.id)}
                  >
                    {myApplications.includes(selectedJob.id) ? 'Já Candidatado' : 'Candidatar-se Agora'}
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
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #4338ca 100%)',
                marginBottom: 'var(--space-8)',
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(79, 70, 229, 0.35)'
              }}>
                {/* Decorative elements */}
                <div style={{
                  position: 'absolute',
                  top: '-50%',
                  right: '-10%',
                  width: '200px',
                  height: '200px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '50%'
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '-30%',
                  left: '-5%',
                  width: '150px',
                  height: '150px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%'
                }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h2 className="text-h1" style={{ color: 'white', marginBottom: 'var(--space-2)' }}>
                    Olá, {user.name.split(' ')[0]}! 👋
                  </h2>
                  <p style={{ 
                    fontSize: '1rem', 
                    maxWidth: '500px', 
                    color: 'rgba(255,255,255,0.95)',
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    Você tem <strong style={{ color: '#fef08a' }}>{user.applications}</strong> candidaturas ativas e <strong style={{ color: '#fef08a' }}>{user.savedJobs}</strong> vagas salvas.
                    Continue explorando novas oportunidades!
                  </p>
                  
                  {/* Quick stats */}
                  <div style={{ 
                    display: 'flex', 
                    gap: 'var(--space-6)', 
                    marginTop: 'var(--space-6)',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user.applications}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Candidaturas</div>
                    </div>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user.savedJobs}</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Salvas</div>
                    </div>
                    <div style={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-md)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>85%</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Perfil</div>
                    </div>
                  </div>
                </div>
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
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '2px solid #e5e7eb',
                      background: '#ffffff'
                    }}
                  >
                    <div className="job-card-header">
                      <div className="job-card-badges">
                        <span className="badge badge-primary" style={{ 
                          background: '#e0e7ff', 
                          color: '#4f46e5',
                          fontWeight: 600,
                          padding: '4px 10px'
                        }}>{job.type}</span>
                        <span className="badge badge-neutral" style={{ 
                          background: '#f3f4f6', 
                          color: '#4b5563',
                          fontWeight: 500,
                          padding: '4px 10px'
                        }}>{job.modality}</span>
                      </div>
                      {/* Bookmark icon */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '1.25rem',
                          padding: '4px',
                          opacity: 0.6
                        }}
                      >
                        🔖
                      </button>
                    </div>
                    <h3 className="job-card-title" style={{ 
                      color: '#111827', 
                      fontWeight: 700,
                      fontSize: '1.125rem'
                    }}>{job.title}</h3>
                    <p className="job-card-company" style={{ 
                      color: '#4f46e5', 
                      fontWeight: 600,
                      fontSize: '0.95rem'
                    }}>{job.company}</p>
                    <p className="job-card-location" style={{ 
                      color: '#6b7280', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      fontSize: '0.875rem'
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {job.location}
                    </p>
                    {job.salary && (
                      <p className="job-card-salary" style={{ 
                        color: '#059669', 
                        fontWeight: 700,
                        fontSize: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        💰 {job.salary}
                      </p>
                    )}
                    
                    {/* Quick apply hint */}
                    <div style={{
                      marginTop: 'var(--space-4)',
                      paddingTop: 'var(--space-3)',
                      borderTop: '1px solid #f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <span style={{ fontSize: '0.8125rem', color: '#9ca3af' }}>
                        Clique para ver detalhes
                      </span>
                      <span style={{ fontSize: '1rem', color: '#4f46e5', fontWeight: 600 }}>→</span>
                    </div>
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
                    {mockJobs.filter(j => myApplications.includes(j.id)).map((job, i) => {
                      const statuses = ['Em análise', 'Entrevista', 'Aprovado', 'Em análise', 'Reprovado']
                      const statusColors = {
                        'Em análise': 'badge-warning',
                        'Entrevista': 'badge-primary',
                        'Aprovado': 'badge-success',
                        'Reprovado': 'badge-error'
                      }
                      const status = statuses[i % statuses.length]
                      return (
                        <tr key={job.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
                          <td style={{ fontWeight: 500 }}>{job.title}</td>
                          <td>{job.company}</td>
                          <td className="text-muted">
                            {new Date().toLocaleDateString('pt-BR')}
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
                    {myApplications.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center" style={{ padding: 'var(--space-12)' }}>
                          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📂</div>
                          <p className="text-body">Você ainda não se candidatou a nenhuma vaga.</p>
                          <button 
                            className="btn btn-primary" 
                            style={{ marginTop: 'var(--space-4)' }}
                            onClick={() => setActiveTab('vagas')}
                          >
                            Explorar Vagas
                          </button>
                        </td>
                      </tr>
                    )}
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

              <div className="card animate-fadeInUp delay-100" style={{ padding: 'var(--space-8)' }}>
                <h3 className="text-h3" style={{ marginBottom: 'var(--space-6)' }}>Editar Dados Pessoais</h3>
                <form onSubmit={handleSaveProfile}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div className="form-control">
                      <label className="label">Nome Completo</label>
                      <input 
                        type="text" 
                        className="input" 
                        value={userProfile.name} 
                        onChange={e => setUserProfile({...userProfile, name: e.target.value})}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">E-mail</label>
                      <input 
                        type="email" 
                        className="input" 
                        value={userProfile.email} 
                        onChange={e => setUserProfile({...userProfile, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
                    <div className="form-control">
                      <label className="label">Telefone</label>
                      <input 
                        type="text" 
                        className="input" 
                        value={userProfile.phone} 
                        onChange={e => setUserProfile({...userProfile, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">LinkedIn</label>
                      <input 
                        type="text" 
                        className="input" 
                        value={userProfile.linkedin} 
                        onChange={e => setUserProfile({...userProfile, linkedin: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="form-control" style={{ marginBottom: 'var(--space-6)' }}>
                    <label className="label">Bio Profissional</label>
                    <textarea 
                      className="input" 
                      style={{ height: '100px', paddingTop: '10px' }}
                      value={userProfile.bio} 
                      onChange={e => setUserProfile({...userProfile, bio: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Salvar Alterações
                  </button>
                </form>
              </div>

              <div className="card animate-fadeInUp delay-200" style={{ padding: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
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

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '1rem 2rem',
          borderRadius: 'var(--radius-md)',
          background: toast.type === 'success' ? 'var(--color-success)' : 'var(--color-error)',
          color: 'white',
          fontWeight: 600,
          boxShadow: 'var(--shadow-lg)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          animation: 'fadeInUp 0.3s ease-out'
        }}>
          {toast.type === 'success' ? '✅' : '❌'} {toast.message}
        </div>
      )}
    </div>
  )
}

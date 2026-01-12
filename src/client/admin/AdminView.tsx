import React, { useState, useEffect } from 'react'
import { mockJobs, mockAdmin } from '../../shared/data/mockData'
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

export default function AdminView() {
  const [theme, setTheme] = useState<ThemeType>('default')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [activeSection, setActiveSection] = useState<'dashboard' | 'vagas' | 'candidatos' | 'relatorios'>('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['default', 'teal', 'purple'].includes(themeParam)) {
      setTheme(themeParam)
    }
    setMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      setIsLoggedIn(true)
    }
  }

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
    window.history.replaceState({}, '', `?theme=${newTheme}`)
  }

  if (!mounted) return null

  // Dashboard stats
  const stats = {
    activeJobs: mockJobs.filter(j => j.isActive).length,
    totalCandidates: 147,
    applications: 328,
    hired: 23,
    pendingReview: 45,
    interviewsScheduled: 12
  }

  // Recent activity
  const recentActivity = [
    { type: 'application', message: 'João Silva candidatou-se para Desenvolvedor Full Stack', time: '5 min' },
    { type: 'interview', message: 'Entrevista agendada: Ana Costa - UX Designer', time: '1h' },
    { type: 'hired', message: 'Pedro Santos foi contratado para Analista de Dados', time: '2h' },
    { type: 'application', message: 'Maria Oliveira candidatou-se para Product Manager', time: '3h' },
    { type: 'job', message: 'Nova vaga publicada: DevOps Engineer', time: '5h' },
  ]

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'vagas', label: 'Vagas', icon: '💼' },
    { id: 'candidatos', label: 'Candidatos', icon: '👥' },
    { id: 'relatorios', label: 'Relatórios', icon: '📈' },
  ]

  return (
    <div className={`theme-${theme}`}>
      {/* Theme Switcher */}
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

      {!isLoggedIn ? (
        /* LOGIN SCREEN */
        <div style={{ 
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-6)',
          background: 'var(--gradient-hero)'
        }}>
          <div className="card animate-fadeInUp" style={{
            width: '100%',
            maxWidth: '420px',
            padding: 'var(--space-8)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <div className="navbar-logo" style={{ 
                width: '64px', 
                height: '64px', 
                fontSize: '1.75rem',
                margin: '0 auto var(--space-6)'
              }}>M</div>
              <h1 className="text-h1" style={{ marginBottom: 'var(--space-2)' }}>
                Área Administrativa
              </h1>
              <p className="text-body">
                Acesse o painel de gestão do Midu Group
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <label className="text-small" style={{ 
                  display: 'block', 
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                  color: 'var(--color-gray-700)'
                }}>
                  E-mail
                </label>
                <input
                  type="email"
                  className="input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label className="text-small" style={{ 
                  display: 'block', 
                  marginBottom: 'var(--space-2)',
                  fontWeight: 500,
                  color: 'var(--color-gray-700)'
                }}>
                  Senha
                </label>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-full">
                Entrar
              </button>
            </form>

            <p className="text-small" style={{ 
              textAlign: 'center', 
              marginTop: 'var(--space-6)',
              color: 'var(--color-gray-400)'
            }}>
              Demo: use qualquer credencial para acessar
            </p>
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD */
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* SIDEBAR */}
          <aside className="sidebar">
            <div style={{ padding: '0 var(--space-4)', marginBottom: 'var(--space-6)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div className="navbar-logo" style={{ width: '36px', height: '36px', fontSize: '1rem' }}>M</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Midu Admin</div>
                  <div className="text-small">Painel de Gestão</div>
                </div>
              </div>
            </div>

            <nav className="sidebar-nav">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`sidebar-link ${activeSection === item.id ? 'sidebar-link-active' : ''}`}
                  style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </nav>

            <div style={{ 
              marginTop: 'auto', 
              padding: 'var(--space-4)',
              borderTop: '1px solid var(--color-gray-200)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                <div className="avatar">
                  {mockAdmin.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.875rem' }}>{mockAdmin.name}</div>
                  <div className="text-small">{mockAdmin.role}</div>
                </div>
              </div>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="btn btn-secondary btn-sm btn-full"
              >
                Sair
              </button>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main style={{ flex: 1, padding: 'var(--space-8)', overflow: 'auto' }}>
            {/* DASHBOARD VIEW */}
            {activeSection === 'dashboard' && (
              <>
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <h1 className="text-h1">Dashboard</h1>
                  <p className="text-body">Bem-vindo de volta, {mockAdmin.name.split(' ')[0]}!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-4" style={{ marginBottom: 'var(--space-8)' }}>
                  <div className="stat-card animate-fadeInUp">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="stat-value stat-value-primary">{stats.activeJobs}</div>
                        <div className="stat-label">Vagas Ativas</div>
                      </div>
                      <span style={{ fontSize: '2rem' }}>💼</span>
                    </div>
                    <div className="stat-trend stat-trend-up">
                      ↑ 12% vs mês anterior
                    </div>
                  </div>

                  <div className="stat-card animate-fadeInUp delay-100">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="stat-value stat-value-primary">{stats.totalCandidates}</div>
                        <div className="stat-label">Candidatos</div>
                      </div>
                      <span style={{ fontSize: '2rem' }}>👥</span>
                    </div>
                    <div className="stat-trend stat-trend-up">
                      ↑ 23% vs mês anterior
                    </div>
                  </div>

                  <div className="stat-card animate-fadeInUp delay-200">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="stat-value stat-value-primary">{stats.applications}</div>
                        <div className="stat-label">Candidaturas</div>
                      </div>
                      <span style={{ fontSize: '2rem' }}>📋</span>
                    </div>
                    <div className="stat-trend stat-trend-up">
                      ↑ 18% vs mês anterior
                    </div>
                  </div>

                  <div className="stat-card animate-fadeInUp delay-300">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div className="stat-value" style={{ color: 'var(--color-success)' }}>{stats.hired}</div>
                        <div className="stat-label">Contratados</div>
                      </div>
                      <span style={{ fontSize: '2rem' }}>✅</span>
                    </div>
                    <div className="stat-trend stat-trend-up">
                      ↑ 8% vs mês anterior
                    </div>
                  </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
                  {/* Pipeline Overview */}
                  <div className="card animate-fadeInUp delay-400" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="text-h3" style={{ marginBottom: 'var(--space-6)' }}>Pipeline de Recrutamento</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                          <span className="text-small" style={{ fontWeight: 500 }}>Triagem</span>
                          <span className="text-small">{stats.pendingReview}</span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: '45%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                          <span className="text-small" style={{ fontWeight: 500 }}>Entrevistas</span>
                          <span className="text-small">{stats.interviewsScheduled}</span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: '30%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                          <span className="text-small" style={{ fontWeight: 500 }}>Propostas</span>
                          <span className="text-small">8</span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: '15%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                          <span className="text-small" style={{ fontWeight: 500 }}>Contratados</span>
                          <span className="text-small">{stats.hired}</span>
                        </div>
                        <div className="progress">
                          <div className="progress-bar" style={{ width: '10%', background: 'var(--color-success)' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="card animate-fadeInUp delay-500" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="text-h3" style={{ marginBottom: 'var(--space-6)' }}>Atividade Recente</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      {recentActivity.map((activity, i) => (
                        <div key={i} style={{ 
                          display: 'flex', 
                          gap: 'var(--space-3)',
                          paddingBottom: 'var(--space-4)',
                          borderBottom: i < recentActivity.length - 1 ? '1px solid var(--color-gray-100)' : 'none'
                        }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: activity.type === 'hired' ? 'var(--color-success)' : 
                                        activity.type === 'interview' ? 'var(--color-warning)' : 
                                        'var(--color-primary)',
                            marginTop: '6px',
                            flexShrink: 0
                          }}></div>
                          <div style={{ flex: 1 }}>
                            <p className="text-body" style={{ fontSize: '0.875rem', marginBottom: 'var(--space-1)' }}>
                              {activity.message}
                            </p>
                            <p className="text-small">{activity.time} atrás</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* JOBS VIEW */}
            {activeSection === 'vagas' && (
              <>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 'var(--space-8)' 
                }}>
                  <div>
                    <h1 className="text-h1">Gerenciar Vagas</h1>
                    <p className="text-body">{stats.activeJobs} vagas ativas</p>
                  </div>
                  <button className="btn btn-primary">
                    + Nova Vaga
                  </button>
                </div>

                <div className="card animate-fadeInUp" style={{ overflow: 'hidden' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Título</th>
                        <th>Empresa</th>
                        <th>Localização</th>
                        <th>Candidatos</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockJobs.map((job) => (
                        <tr key={job.id}>
                          <td style={{ fontWeight: 500 }}>{job.title}</td>
                          <td>{job.company}</td>
                          <td className="text-muted">{job.location}</td>
                          <td>
                            <span style={{ 
                              fontWeight: 600, 
                              color: 'var(--color-primary)'
                            }}>
                              {Math.floor(Math.random() * 30) + 5}
                            </span>
                          </td>
                          <td>
                            <span className={`badge ${job.isActive ? 'badge-success' : 'badge-neutral'}`}>
                              {job.isActive ? 'Ativa' : 'Pausada'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                              <button className="btn btn-ghost btn-sm">Editar</button>
                              <button className="btn btn-ghost btn-sm">Ver</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* CANDIDATES VIEW */}
            {activeSection === 'candidatos' && (
              <>
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <h1 className="text-h1">Candidatos</h1>
                  <p className="text-body">{stats.totalCandidates} candidatos cadastrados</p>
                </div>

                <div className="grid grid-3" style={{ marginBottom: 'var(--space-8)' }}>
                  <div className="stat-card">
                    <div className="stat-value stat-value-primary">{stats.pendingReview}</div>
                    <div className="stat-label">Aguardando Triagem</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--color-warning)' }}>{stats.interviewsScheduled}</div>
                    <div className="stat-label">Em Entrevista</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value" style={{ color: 'var(--color-success)' }}>{stats.hired}</div>
                    <div className="stat-label">Contratados</div>
                  </div>
                </div>

                <div className="card animate-fadeInUp" style={{ overflow: 'hidden' }}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Candidato</th>
                        <th>Vaga</th>
                        <th>Data</th>
                        <th>Etapa</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'João Silva', job: 'Desenvolvedor Full Stack', date: '10/01/2026', stage: 'Triagem' },
                        { name: 'Ana Costa', job: 'UX Designer', date: '09/01/2026', stage: 'Entrevista' },
                        { name: 'Pedro Santos', job: 'Analista de Dados', date: '08/01/2026', stage: 'Proposta' },
                        { name: 'Maria Oliveira', job: 'Product Manager', date: '07/01/2026', stage: 'Triagem' },
                        { name: 'Carlos Ferreira', job: 'DevOps Engineer', date: '06/01/2026', stage: 'Entrevista' },
                      ].map((candidate, i) => (
                        <tr key={i}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                              <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.75rem' }}>
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span style={{ fontWeight: 500 }}>{candidate.name}</span>
                            </div>
                          </td>
                          <td>{candidate.job}</td>
                          <td className="text-muted">{candidate.date}</td>
                          <td>
                            <span className={`badge ${
                              candidate.stage === 'Triagem' ? 'badge-neutral' :
                              candidate.stage === 'Entrevista' ? 'badge-warning' :
                              'badge-success'
                            }`}>
                              {candidate.stage}
                            </span>
                          </td>
                          <td>
                            <button className="btn btn-ghost btn-sm">Ver Perfil</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* REPORTS VIEW */}
            {activeSection === 'relatorios' && (
              <>
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <h1 className="text-h1">Relatórios</h1>
                  <p className="text-body">Métricas e análises de recrutamento</p>
                </div>

                <div className="grid grid-2" style={{ gap: 'var(--space-6)' }}>
                  <div className="card animate-fadeInUp" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="text-h3" style={{ marginBottom: 'var(--space-6)' }}>Taxa de Conversão por Etapa</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Candidatura → Triagem</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>78%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Triagem → Entrevista</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>45%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Entrevista → Proposta</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>32%</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Proposta → Contratação</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-success)' }}>85%</span>
                      </div>
                    </div>
                  </div>

                  <div className="card animate-fadeInUp delay-100" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="text-h3" style={{ marginBottom: 'var(--space-6)' }}>Tempo Médio por Etapa</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Triagem</span>
                        <span style={{ fontWeight: 600 }}>2.5 dias</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Agendamento Entrevista</span>
                        <span style={{ fontWeight: 600 }}>4 dias</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Processo Completo</span>
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>18 dias</span>
                      </div>
                    </div>
                  </div>

                  <div className="card animate-fadeInUp delay-200" style={{ padding: 'var(--space-6)', gridColumn: 'span 2' }}>
                    <h3 className="text-h3" style={{ marginBottom: 'var(--space-6)' }}>Top Vagas por Candidaturas</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                      {mockJobs.slice(0, 5).map((job, i) => {
                        const candidates = [42, 38, 35, 28, 24][i]
                        const percentage = (candidates / 42) * 100
                        return (
                          <div key={job.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                            <span style={{ width: '200px', fontWeight: 500 }}>{job.title}</span>
                            <div style={{ flex: 1 }}>
                              <div className="progress">
                                <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                              </div>
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--color-primary)', width: '50px', textAlign: 'right' }}>
                              {candidates}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      )}
    </div>
  )
}

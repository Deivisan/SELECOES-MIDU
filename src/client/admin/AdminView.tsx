import React, { useState, useEffect } from 'react'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts'
import { mockJobs } from '../../shared/data/mockData'
import ViewSelector from '../../shared/components/ViewSelector'
import '../../shared/styles/themes.css'

type ThemeType = 'default' | 'teal' | 'purple'
type SectionType = 'dashboard' | 'vagas' | 'candidatos' | 'relatorios'

// Dados para gráficos
const statusCandidatos = [
  { name: 'Pendente', value: 45, color: '#fbbf24' },
  { name: 'Em Análise', value: 32, color: '#3b82f6' },
  { name: 'Entrevista', value: 18, color: '#8b5cf6' },
  { name: 'Contratado', value: 23, color: '#10b981' },
  { name: 'Rejeitado', value: 35, color: '#ef4444' },
]

const aplicacoesMes = [
  { mes: 'Jul', candidatos: 42, vagas: 8 },
  { mes: 'Ago', candidatos: 58, vagas: 12 },
  { mes: 'Set', candidatos: 71, vagas: 15 },
  { mes: 'Out', candidatos: 89, vagas: 18 },
  { mes: 'Nov', candidatos: 103, vagas: 22 },
  { mes: 'Dez', candidatos: 147, vagas: 25 },
]

const vagasCategoria = [
  { name: 'Tecnologia', value: 12, color: '#3b82f6' },
  { name: 'Administração', value: 5, color: '#10b981' },
  { name: 'Vendas', value: 4, color: '#f97316' },
  { name: 'Marketing', value: 3, color: '#8b5cf6' },
  { name: 'Saúde', value: 1, color: '#ef4444' },
]

const contratacoesTrimestre = [
  { mes: 'Jul', contratados: 3 },
  { mes: 'Ago', contratados: 5 },
  { mes: 'Set', contratados: 4 },
  { mes: 'Out', contratados: 6 },
  { mes: 'Nov', contratados: 8 },
  { mes: 'Dez', contratados: 10 },
]

export default function AdminView() {
  const [theme, setTheme] = useState<ThemeType>('default')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeSection, setActiveSection] = useState<SectionType>('dashboard')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Verificar sessão persistida
    const session = localStorage.getItem('admin_session')
    if (session === 'authenticated') {
      setIsLoggedIn(true)
    }

    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['default', 'teal', 'purple'].includes(themeParam)) {
      setTheme(themeParam)
    }
    setMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    // Validação REAL: admin/admin
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true)
      localStorage.setItem('admin_session', 'authenticated')
    } else {
      setLoginError('❌ Credenciais inválidas! Use: admin / admin')
      setTimeout(() => setLoginError(''), 4000)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('admin_session')
    setUsername('')
    setPassword('')
  }

  const changeTheme = (newTheme: ThemeType) => {
    setTheme(newTheme)
    window.history.replaceState({}, '', `?theme=${newTheme}`)
  }

  if (!mounted) return null

  // Estatísticas dinâmicas
  const stats = {
    activeJobs: mockJobs.filter(j => j.isActive).length,
    totalCandidates: 147,
    applications: 328,
    hired: 23,
    pendingReview: 45,
    interviewsScheduled: 12,
    companies: [...new Set(mockJobs.map(j => j.company))].length,
    avgTimeToHire: 18 // dias
  }

  const menuItems = [
    { id: 'dashboard' as SectionType, label: 'Dashboard', icon: '📊', badge: null },
    { id: 'vagas' as SectionType, label: 'Vagas', icon: '💼', badge: stats.activeJobs },
    { id: 'candidatos' as SectionType, label: 'Candidatos', icon: '👥', badge: stats.pendingReview },
    { id: 'relatorios' as SectionType, label: 'Relatórios', icon: '📈', badge: null },
  ]

  return (
    <div className={`theme-${theme}`}>
      <ViewSelector 
        theme={theme} 
        onThemeChange={changeTheme}
        onViewChange={() => {}}
      />

      {!isLoggedIn ? (
        /* ==================== LOGIN SCREEN ==================== */
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
            maxWidth: '460px',
            padding: 'var(--space-8)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
          }}>
            {/* Logo + Título */}
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
              <div className="navbar-logo" style={{ 
                width: '80px', 
                height: '80px', 
                fontSize: '2rem',
                margin: '0 auto var(--space-4)',
                background: 'var(--gradient-hero)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }}>M</div>
              <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: 700, 
                marginBottom: 'var(--space-2)',
                color: 'var(--color-gray-900)'
              }}>
                🔐 Área Administrativa
              </h1>
              <p style={{ 
                fontSize: '1rem', 
                color: 'var(--color-gray-600)',
                marginBottom: 'var(--space-2)'
              }}>
                Painel de Gestão Midu Group
              </p>
              <p style={{ 
                fontSize: '0.875rem', 
                color: 'var(--color-gray-500)',
                background: 'var(--color-gray-50)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                display: 'inline-block'
              }}>
                💡 Use: <code style={{ 
                  background: 'var(--color-primary-light)', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  fontWeight: 600
                }}>admin / admin</code>
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleLogin} style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-700)'
                }}>
                  👤 Usuário
                </label>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  style={{ fontSize: '1rem' }}
                />
              </div>

              <div style={{ marginBottom: 'var(--space-6)' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: 'var(--space-2)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: 'var(--color-gray-700)'
                }}>
                  🔑 Senha
                </label>
                <input
                  type="password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  style={{ fontSize: '1rem' }}
                />
              </div>

              {loginError && (
                <div style={{
                  padding: 'var(--space-3)',
                  marginBottom: 'var(--space-4)',
                  background: '#fee2e2',
                  border: '2px solid #ef4444',
                  borderRadius: 'var(--radius-md)',
                  color: '#991b1b',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textAlign: 'center'
                }}>
                  {loginError}
                </div>
              )}

              <button type="submit" className="btn btn-lg" style={{ width: '100%', fontSize: '1.125rem' }}>
                🚀 Entrar no Painel
              </button>
            </form>

            <p style={{ 
              textAlign: 'center', 
              fontSize: '0.75rem', 
              color: 'var(--color-gray-500)' 
            }}>
              🔒 Área restrita - Acesso autorizado apenas
            </p>
          </div>
        </div>
      ) : (
        /* ==================== ADMIN DASHBOARD ==================== */
        <div style={{ minHeight: '100vh', background: 'var(--color-gray-50)' }}>
          {/* Top Navbar */}
          <nav style={{
            background: 'white',
            borderBottom: '2px solid var(--color-gray-200)',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div className="navbar-logo" style={{ width: '48px', height: '48px', fontSize: '1.25rem' }}>M</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-gray-900)' }}>
                  Midu Group Admin
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)' }}>
                  Painel de Gestão
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="btn"
              style={{ 
                background: 'var(--color-gray-100)', 
                color: 'var(--color-gray-700)',
                border: '1px solid var(--color-gray-300)'
              }}
            >
              🚪 Sair
            </button>
          </nav>

          {/* Layout Principal */}
          <div style={{ display: 'flex', minHeight: 'calc(100vh - 85px)' }}>
            {/* Sidebar */}
            <aside style={{
              width: '280px',
              background: 'white',
              borderRight: '2px solid var(--color-gray-200)',
              padding: '2rem 1rem'
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 700, 
                  color: 'var(--color-gray-500)', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '1rem'
                }}>
                  Menu Principal
                </h3>
                <nav>
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        marginBottom: '0.5rem',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        background: activeSection === item.id ? 'var(--gradient-hero)' : 'transparent',
                        color: activeSection === item.id ? 'white' : 'var(--color-gray-700)',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.background = 'var(--color-gray-50)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >
                      <span>
                        <span style={{ marginRight: '0.75rem' }}>{item.icon}</span>
                        {item.label}
                      </span>
                      {item.badge !== null && (
                        <span style={{
                          background: activeSection === item.id ? 'rgba(255,255,255,0.25)' : 'var(--color-primary)',
                          color: activeSection === item.id ? 'white' : 'white',
                          padding: '0.25rem 0.625rem',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Stats Rápidas */}
              <div style={{
                background: 'var(--color-gray-50)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                marginTop: '2rem'
              }}>
                <h4 style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: 700, 
                  marginBottom: '1rem',
                  color: 'var(--color-gray-700)'
                }}>
                  📌 Resumo Rápido
                </h4>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-600)', lineHeight: 1.8 }}>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Vagas Ativas:</span>
                    <strong>{stats.activeJobs}</strong>
                  </div>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Candidatos:</span>
                    <strong>{stats.totalCandidates}</strong>
                  </div>
                  <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Entrevistas:</span>
                    <strong>{stats.interviewsScheduled}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Contratados:</span>
                    <strong style={{ color: 'var(--color-success)' }}>+{stats.hired}</strong>
                  </div>
                </div>
              </div>
            </aside>

            {/* Conteúdo Principal */}
            <main style={{ flex: 1, padding: '2rem' }}>
              {activeSection === 'dashboard' && (
                <DashboardSection stats={stats} />
              )}
              {activeSection === 'vagas' && (
                <VagasSection />
              )}
              {activeSection === 'candidatos' && (
                <CandidatosSection />
              )}
              {activeSection === 'relatorios' && (
                <RelatoriosSection />
              )}
            </main>
          </div>
        </div>
      )}
    </div>
  )
}

/* ==================== DASHBOARD SECTION ==================== */
function DashboardSection({ stats }: { stats: any }) {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-gray-900)' }}>
        📊 Dashboard Geral
      </h1>
      <p style={{ fontSize: '1rem', color: 'var(--color-gray-600)', marginBottom: '2rem' }}>
        Visão completa do desempenho da plataforma
      </p>

      {/* KPI Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <KPICard 
          icon="💼" 
          label="Vagas Ativas" 
          value={stats.activeJobs} 
          trend="+12%" 
          trendUp={true}
          color="#3b82f6"
        />
        <KPICard 
          icon="👥" 
          label="Total Candidatos" 
          value={stats.totalCandidates} 
          trend="+28%" 
          trendUp={true}
          color="#10b981"
        />
        <KPICard 
          icon="📨" 
          label="Candidaturas" 
          value={stats.applications} 
          trend="+45%" 
          trendUp={true}
          color="#8b5cf6"
        />
        <KPICard 
          icon="✅" 
          label="Contratados" 
          value={stats.hired} 
          trend="+8%" 
          trendUp={true}
          color="#10b981"
        />
        <KPICard 
          icon="⏳" 
          label="Pendentes" 
          value={stats.pendingReview} 
          trend="-5%" 
          trendUp={false}
          color="#fbbf24"
        />
        <KPICard 
          icon="🏢" 
          label="Empresas Parceiras" 
          value={stats.companies} 
          trend="+2" 
          trendUp={true}
          color="#f97316"
        />
      </div>

      {/* Gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '1.5rem' }}>
        {/* Gráfico de Barras: Status Candidatos */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
            📊 Candidatos por Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusCandidatos}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" style={{ fontSize: '0.875rem' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '0.875rem' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }} 
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {statusCandidatos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza: Vagas por Categoria */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
            📈 Vagas por Categoria
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vagasCategoria}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {vagasCategoria.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Linha: Aplicações por Mês */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
            📉 Crescimento Mensal
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={aplicacoesMes}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '0.875rem' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '0.875rem' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px' 
                }} 
              />
              <Legend />
              <Line type="monotone" dataKey="candidatos" stroke="#3b82f6" strokeWidth={3} dot={{ r: 6 }} />
              <Line type="monotone" dataKey="vagas" stroke="#10b981" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Área: Contratações */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
            ✅ Tendência de Contratações
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={contratacoesTrimestre}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="mes" stroke="#6b7280" style={{ fontSize: '0.875rem' }} />
              <YAxis stroke="#6b7280" style={{ fontSize: '0.875rem' }} />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '8px' 
                }} 
              />
              <Area type="monotone" dataKey="contratados" stroke="#10b981" fill="rgba(16, 185, 129, 0.2)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

/* ==================== KPI CARD ==================== */
function KPICard({ icon, label, value, trend, trendUp, color }: {
  icon: string
  label: string
  value: number
  trend: string
  trendUp: boolean
  color: string
}) {
  return (
    <div className="card" style={{ 
      padding: '1.5rem',
      borderLeft: `4px solid ${color}`,
      transition: 'transform 0.2s ease'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = ''
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>
            {label}
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>
            {value.toLocaleString()}
          </div>
        </div>
        <div style={{
          padding: '0.375rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: trendUp ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: trendUp ? '#059669' : '#dc2626',
          fontSize: '0.8125rem',
          fontWeight: 700
        }}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      </div>
    </div>
  )
}

/* ==================== VAGAS SECTION (Placeholder) ==================== */
function VagasSection() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>💼 Gestão de Vagas</h1>
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Em Desenvolvimento</h3>
        <p style={{ color: 'var(--color-gray-600)' }}>CRUD completo de vagas será implementado em breve</p>
      </div>
    </div>
  )
}

/* ==================== CANDIDATOS SECTION (Placeholder) ==================== */
function CandidatosSection() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>👥 Gestão de Candidatos</h1>
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Em Desenvolvimento</h3>
        <p style={{ color: 'var(--color-gray-600)' }}>Gestão completa de candidatos será implementada em breve</p>
      </div>
    </div>
  )
}

/* ==================== RELATÓRIOS SECTION (Placeholder) ==================== */
function RelatoriosSection() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>📈 Relatórios e Análises</h1>
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Em Desenvolvimento</h3>
        <p style={{ color: 'var(--color-gray-600)' }}>Relatórios avançados serão implementados em breve</p>
      </div>
    </div>
  )
}

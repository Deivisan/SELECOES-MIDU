import React, { useState, useEffect } from 'react'
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts'
import { mockJobs } from '../../shared/data/mockData'
import type { Job } from '../../shared/types'
import VagasTable from '../../shared/components/VagasTable'
import VagaForm from '../../shared/components/VagaForm'
import ViewSelector from '../../shared/components/ViewSelector'
import '../../shared/styles/themes.css'

type ThemeType = 'default' | 'teal' | 'purple' | 'orange' | 'pink' | 'cyan'
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
    console.log('AdminView: Iniciando montagem...')
    // Verificar sessão persistida
    const session = localStorage.getItem('admin_session')
    console.log('AdminView: Sessão encontrada:', session)
    if (session === 'authenticated') {
      setIsLoggedIn(true)
    }

    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['default', 'teal', 'purple', 'orange', 'pink', 'cyan'].includes(themeParam)) {
      setTheme(themeParam)
    }
    setMounted(true)
    console.log('AdminView: Montagem concluída.')
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
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalCandidates: 147,
    applications: 328,
    hired: 23,
    pendingReview: 45,
    interviewsScheduled: 12,
    companies: 0,
    avgTimeToHire: 18 // dias
  })

  useEffect(() => {
    console.log('AdminView: Calculando estatísticas dinâmicas...')
    // Calcular estatísticas baseadas em mockJobs e localStorage
    const savedApplications = localStorage.getItem('midu_candidaturas')
    const applicationsCount = savedApplications ? JSON.parse(savedApplications).length : 0
    
    setStats(prev => ({
      ...prev,
      activeJobs: mockJobs.filter(j => j.isActive).length,
      companies: [...new Set(mockJobs.map(j => j.company))].length,
      applications: 328 + applicationsCount, // Mock base + reais
      pendingReview: 45 + applicationsCount
    }))
    console.log('AdminView: Estatísticas calculadas.')
  }, [])


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

/* ==================== VAGAS SECTION (CRUD Completo) ==================== */
function VagasSection() {
  const [vagas, setVagas] = useState<Job[]>([
    {
      id: '1',
      title: 'Desenvolvedor Full Stack Sênior',
      company: 'Ford Brasil',
      location: 'Salvador, BA',
      type: 'CLT',
      modality: 'Híbrido',
      category: 'Tecnologia',
      salary: 'R$ 8.000 - R$ 12.000',
      description: 'Desenvolvimento de sistemas web modernos',
      requirements: ['5+ anos React', 'TypeScript', 'Node.js'],
      responsibilities: ['Desenvolver features', 'Code review', 'Mentoria'],
      benefits: ['Plano de saúde', 'VR/VA', 'Home office'],
      postedAt: new Date('2026-01-10'),
      isActive: true
    },
    {
      id: '2',
      title: 'Analista de Marketing Digital',
      company: 'Midu Group',
      location: 'Feira de Santana, BA',
      type: 'PJ',
      modality: 'Remoto',
      category: 'Marketing',
      salary: 'R$ 4.000 - R$ 6.000',
      description: 'Gestão de campanhas digitais',
      requirements: ['2+ anos marketing', 'Google Ads', 'Meta Ads'],
      responsibilities: ['Criar campanhas', 'Analisar métricas', 'Otimizar conversões'],
      benefits: ['Horário flexível', 'Equipamento fornecido'],
      postedAt: new Date('2026-01-08'),
      isActive: true
    }
  ])
  
  const [editingVaga, setEditingVaga] = useState<Job | null>(null)
  const [showForm, setShowForm] = useState(false)
  
  const handleCreate = () => {
    setEditingVaga(null)
    setShowForm(true)
  }
  
  const handleEdit = (vaga: Job) => {
    setEditingVaga(vaga)
    setShowForm(true)
  }
  
  const handleSave = (vagaData: Partial<Job>) => {
    if (editingVaga) {
      // Atualizar vaga existente
      setVagas(prev => prev.map(v => 
        v.id === editingVaga.id 
          ? { ...v, ...vagaData } as Job
          : v
      ))
    } else {
      // Criar nova vaga
      const newVaga: Job = {
        id: Date.now().toString(),
        ...vagaData as Omit<Job, 'id'>
      }
      setVagas(prev => [newVaga, ...prev])
    }
    setShowForm(false)
    setEditingVaga(null)
  }
  
  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta vaga?')) {
      setVagas(prev => prev.filter(v => v.id !== id))
    }
  }
  
  const handleToggleActive = (id: string) => {
    setVagas(prev => prev.map(v => 
      v.id === id ? { ...v, isActive: !v.isActive } : v
    ))
  }
  
  const handleCancel = () => {
    setShowForm(false)
    setEditingVaga(null)
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>💼 Gestão de Vagas</h1>
        <button 
          className="btn btn-lg"
          onClick={handleCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          ➕ Nova Vaga
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>Total de Vagas</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-gray-900)' }}>{vagas.length}</div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>Vagas Ativas</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>{vagas.filter(v => v.isActive).length}</div>
        </div>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '0.5rem' }}>Vagas Inativas</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#6b7280' }}>{vagas.filter(v => !v.isActive).length}</div>
        </div>
      </div>

      {/* Tabela */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <VagasTable 
          vagas={vagas}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />
      </div>

      {/* Modal Form */}
      {showForm && (
        <VagaForm 
          vaga={editingVaga || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

/* ==================== CANDIDATOS SECTION ==================== */
function CandidatosSection() {
  const [candidatos, setCandidatos] = useState<any[]>([])
  const [allCandidatos, setAllCandidatos] = useState<any[]>([]) // Lista completa para filtragem
  const [filters, setFilters] = useState({ status: 'Todos', vaga: 'Todas', periodo: '30dias' })
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Status disponíveis com cores
  const statusOptions = [
    { label: 'Pendente', color: '#fbbf24' },
    { label: 'Em Análise', color: '#3b82f6' },
    { label: 'Entrevista', color: '#8b5cf6' },
    { label: 'Contratado', color: '#10b981' },
    { label: 'Rejeitado', color: '#ef4444' }
  ]

  useEffect(() => {
    // Carregar candidatos do localStorage (simulado)
    const apps = localStorage.getItem('midu_candidaturas')
    const appsList = apps ? JSON.parse(apps) : []
    
    // Obter perfil do usuário para simular um candidato real
    const profile = localStorage.getItem('midu_user_profile')
    const userProfile = profile ? JSON.parse(profile) : { 
      name: 'Daniel Duarte', 
      email: 'daniel@midu.com', 
      phone: '(71) 99999-9999',
      linkedin: 'linkedin.com/in/daniel',
      bio: 'Desenvolvedor focado em resultados.'
    }

    // Gerar lista de candidatos baseada nas aplicações em localStorage
    const candidatesList = appsList.map((appId: string, idx: number) => {
      const job = mockJobs.find(j => j.id === appId)
      const randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)]
      return {
        id: Math.random().toString(36).substr(2, 9),
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone || '(71) 98888-7777',
        linkedin: userProfile.linkedin,
        bio: userProfile.bio,
        jobId: appId,
        jobTitle: job?.title || 'Vaga Desconhecida',
        company: job?.company || 'Midu Group',
        appliedAt: new Date(Date.now() - idx * 3 * 24 * 60 * 60 * 1000).toLocaleDateString('pt-BR'),
        status: randomStatus.label,
        color: randomStatus.color
      }
    })

    // Adicionar mocks fixos se estiver vazio para demonstração
    if (candidatesList.length === 0) {
      candidatesList.push(
        {
          id: 'mock1',
          name: 'Ana Silva',
          email: 'ana.silva@email.com',
          phone: '(71) 99876-5432',
          linkedin: 'linkedin.com/in/anasilva',
          bio: 'Desenvolvedora Full Stack com 5 anos de experiência em React e Node.js. Apaixonada por criar soluções escaláveis.',
          jobId: '1',
          jobTitle: 'Desenvolvedor Full Stack Sênior',
          company: 'Ford Brasil',
          appliedAt: '12/01/2026',
          status: 'Em Análise',
          color: '#3b82f6'
        },
        {
          id: 'mock2',
          name: 'Carlos Eduardo',
          email: 'carlos.eduardo@email.com',
          phone: '(71) 98765-4321',
          linkedin: 'linkedin.com/in/carloseduardo',
          bio: 'Engenheiro de Dados com experiência em Python, SQL e cloud computing (AWS, GCP).',
          jobId: '2',
          jobTitle: 'Analista de Dados',
          company: 'Midu Group',
          appliedAt: '10/01/2026',
          status: 'Entrevista',
          color: '#8b5cf6'
        },
        {
          id: 'mock3',
          name: 'Mariana Costa',
          email: 'mariana.costa@email.com',
          phone: '(71) 97654-3210',
          linkedin: 'linkedin.com/in/marianacosta',
          bio: 'Designer UX/UI com foco em acessibilidade e design systems. Portfólio em behance.net/marianacosta',
          jobId: '3',
          jobTitle: 'Designer UX/UI',
          company: 'Midu Group',
          appliedAt: '08/01/2026',
          status: 'Pendente',
          color: '#fbbf24'
        }
      )
    }

    setAllCandidatos(candidatesList)
    setCandidatos(candidatesList)
  }, [])

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...allCandidatos]

    // Filtrar por status
    if (filters.status !== 'Todos') {
      filtered = filtered.filter(c => c.status === filters.status)
    }

    // Filtrar por vaga
    if (filters.vaga !== 'Todas') {
      filtered = filtered.filter(c => c.jobTitle.includes(filters.vaga))
    }

    // Filtrar por período (simulado)
    if (filters.periodo === '7dias') {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      filtered = filtered.filter(c => {
        const parts = c.appliedAt.split('/')
        const date = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
        return date >= sevenDaysAgo
      })
    }

    setCandidatos(filtered)
  }, [filters, allCandidatos])

  // Mudar status do candidato
  const handleChangeStatus = (candId: string, newStatus: string) => {
    const statusColor = statusOptions.find(s => s.label === newStatus)?.color || '#gray'
    
    const updated = allCandidatos.map(c => 
      c.id === candId ? { ...c, status: newStatus, color: statusColor } : c
    )
    
    setAllCandidatos(updated)
    
    // Atualizar também o modal se estiver aberto
    if (selectedCandidate?.id === candId) {
      setSelectedCandidate({ ...selectedCandidate, status: newStatus, color: statusColor })
    }
  }

  // Exportar CSV (mock)
  const handleExportCSV = () => {
    const headers = ['Nome', 'Email', 'Vaga', 'Empresa', 'Data', 'Status']
    const rows = candidatos.map(c => [c.name, c.email, c.jobTitle, c.company, c.appliedAt, c.status])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `candidatos_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.csv`
    link.click()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>👥 Gestão de Candidatos</h1>
          <p style={{ color: 'var(--color-gray-600)' }}>
            Visualize e gerencie os profissionais que se candidataram às vagas
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleExportCSV}>
          📥 Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Status
            </label>
            <select 
              className="input" 
              value={filters.status}
              onChange={e => setFilters({...filters, status: e.target.value})}
              style={{ width: '100%' }}
            >
              <option value="Todos">Todos os Status</option>
              {statusOptions.map(s => (
                <option key={s.label} value={s.label}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Vaga
            </label>
            <select 
              className="input" 
              value={filters.vaga}
              onChange={e => setFilters({...filters, vaga: e.target.value})}
              style={{ width: '100%' }}
            >
              <option value="Todas">Todas as Vagas</option>
              <option value="Desenvolvedor">Desenvolvedor</option>
              <option value="Analista">Analista</option>
              <option value="Designer">Designer</option>
              <option value="Gerente">Gerente</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Período
            </label>
            <select 
              className="input" 
              value={filters.periodo}
              onChange={e => setFilters({...filters, periodo: e.target.value})}
              style={{ width: '100%' }}
            >
              <option value="30dias">Últimos 30 dias</option>
              <option value="7dias">Últimos 7 dias</option>
              <option value="90dias">Últimos 90 dias</option>
              <option value="todos">Todos</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
          📊 <strong>{candidatos.length}</strong> candidato(s) encontrado(s)
        </div>
      </div>

      {/* Tabela */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--color-gray-50)', textAlign: 'left' }}>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--color-gray-200)' }}>Candidato</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--color-gray-200)' }}>Vaga / Empresa</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--color-gray-200)' }}>Data</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--color-gray-200)' }}>Status</th>
              <th style={{ padding: '1rem', borderBottom: '2px solid var(--color-gray-200)', textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {candidatos.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-gray-500)' }}>
                  😔 Nenhum candidato encontrado com os filtros aplicados
                </td>
              </tr>
            ) : (
              candidatos.map((cand) => (
                <tr key={cand.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 600 }}>{cand.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>{cand.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: 500 }}>{cand.jobTitle}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-gray-500)' }}>{cand.company}</div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{cand.appliedAt}</td>
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={cand.status}
                      onChange={(e) => handleChangeStatus(cand.id, e.target.value)}
                      style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '12px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700,
                        background: cand.color + '20',
                        color: cand.color,
                        border: `1px solid ${cand.color}`,
                        cursor: 'pointer'
                      }}
                    >
                      {statusOptions.map(s => (
                        <option key={s.label} value={s.label}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      className="btn btn-sm" 
                      style={{ marginRight: '0.5rem' }}
                      onClick={() => {
                        setSelectedCandidate(cand)
                        setShowModal(true)
                      }}
                    >
                      👁️ Ver
                    </button>
                    <button className="btn btn-sm btn-primary">✉️ Contato</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Visualização */}
      {showModal && selectedCandidate && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '2rem'
        }}>
          <div className="card" style={{
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--color-gray-200)',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '1.25rem'
              }}
            >
              ✕
            </button>

            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              👤 Perfil do Candidato
            </h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                {selectedCandidate.name}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--color-gray-600)' }}>
                <span>📧 {selectedCandidate.email}</span>
                <span>•</span>
                <span>📱 {selectedCandidate.phone}</span>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '1rem', marginBottom: '1rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>💼 Vaga Aplicada:</strong>
                <span>{selectedCandidate.jobTitle}</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>🏢 Empresa:</strong>
                <span>{selectedCandidate.company}</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>📅 Data de Aplicação:</strong>
                <span>{selectedCandidate.appliedAt}</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <strong style={{ display: 'block', marginBottom: '0.25rem' }}>📊 Status Atual:</strong>
                <span style={{ 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem', 
                  fontWeight: 700,
                  background: selectedCandidate.color + '20',
                  color: selectedCandidate.color
                }}>
                  {selectedCandidate.status}
                </span>
              </div>

              {selectedCandidate.linkedin && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>🔗 LinkedIn:</strong>
                  <a 
                    href={`https://${selectedCandidate.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {selectedCandidate.linkedin}
                  </a>
                </div>
              )}

              {selectedCandidate.bio && (
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>📝 Bio:</strong>
                  <p style={{ 
                    fontSize: '0.9375rem', 
                    lineHeight: '1.7', 
                    color: 'var(--color-gray-700)',
                    background: 'var(--color-gray-50)',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    {selectedCandidate.bio}
                  </p>
                </div>
              )}
            </div>

            <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '1rem', display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn" onClick={() => setShowModal(false)}>
                Fechar
              </button>
              <button className="btn btn-primary">
                ✉️ Enviar Email
              </button>
            </div>
          </div>
        </div>
      )}
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

import React, { useState, useEffect } from 'react'
import { mockJobs, mockAdmin } from '../../shared/data/mockData'
import '../../shared/styles/themes.css'

type ThemeType = 'industrial' | 'pastel' | 'artdeco'

const themeLabels: Record<ThemeType, string> = {
  industrial: 'Industrial',
  pastel: 'Pastel',
  artdeco: 'Art Deco'
}

export default function AdminView() {
  const [theme, setTheme] = useState<ThemeType>('industrial')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['industrial', 'pastel', 'artdeco'].includes(themeParam)) {
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

  const themeClass = theme === 'industrial' ? 'theme-industrial' : 
                     theme === 'pastel' ? 'theme-pastel' : 'theme-artdeco'

  // Stats mockados
  const stats = [
    { label: 'Vagas Ativas', value: mockJobs.length, icon: '📋' },
    { label: 'Candidatos', value: 47, icon: '👥' },
    { label: 'Candidaturas', value: 128, icon: '📊' },
    { label: 'Aprovados', value: 12, icon: '✅' }
  ]

  return (
    <div className={themeClass}>
      <div style={{ minHeight: '100vh' }}>
        {/* Theme Switcher */}
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          display: 'flex',
          gap: '0.5rem',
          padding: '0.5rem',
          background: theme === 'industrial' || theme === 'artdeco' 
            ? 'rgba(20,20,20,0.95)' 
            : 'rgba(255,255,255,0.95)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          {(['industrial', 'pastel', 'artdeco'] as ThemeType[]).map((t) => (
            <button
              key={t}
              onClick={() => changeTheme(t)}
              style={{
                padding: '0.5rem 1rem',
                border: theme === t 
                  ? `2px solid ${t === 'industrial' ? '#00ff88' : t === 'artdeco' ? '#d4af37' : '#a78bfa'}` 
                  : '1px solid #666',
                background: theme === t 
                  ? (t === 'industrial' ? '#00ff88' : t === 'artdeco' ? '#d4af37' : '#a78bfa')
                  : 'transparent',
                color: theme === t 
                  ? (t === 'pastel' ? '#fff' : '#0a0a0a')
                  : (theme === 'industrial' || theme === 'artdeco' ? '#ccc' : '#333'),
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: theme === t ? 700 : 400
              }}
            >
              {themeLabels[t]}
            </button>
          ))}
        </div>

        {!isLoggedIn ? (
          /* LOGIN SCREENS */
          <>
            {/* INDUSTRIAL LOGIN */}
            {theme === 'industrial' && (
              <div style={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '400px',
                  background: '#141414',
                  border: '1px solid #2a2a2a',
                  padding: '3rem'
                }}>
                  <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      border: '2px solid #00ff88',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '1.5rem',
                      color: '#00ff88',
                      boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
                    }}>M</div>
                    <h1 className="hero-title" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                      ADMIN_ACCESS
                    </h1>
                    <p style={{ 
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      color: '#666'
                    }}>// autenticação requerida</p>
                  </div>

                  <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{
                        display: 'block',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem',
                        color: '#00ff88',
                        marginBottom: '0.5rem'
                      }}>EMAIL</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@midu.com"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: '#0a0a0a',
                          border: '1px solid #2a2a2a',
                          color: '#e0e0e0',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                      <label style={{
                        display: 'block',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem',
                        color: '#00ff88',
                        marginBottom: '0.5rem'
                      }}>PASSWORD</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: '#0a0a0a',
                          border: '1px solid #2a2a2a',
                          color: '#e0e0e0',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                      [AUTHENTICATE]
                    </button>
                  </form>

                  <p style={{
                    marginTop: '2rem',
                    textAlign: 'center',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: '#666'
                  }}>
                    // demo: qualquer credencial
                  </p>
                </div>
              </div>
            )}

            {/* PASTEL LOGIN */}
            {theme === 'pastel' && (
              <div style={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}>
                <div className="card" style={{
                  width: '100%',
                  maxWidth: '420px',
                  padding: '3rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    color: 'white',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '2rem',
                    fontWeight: 800
                  }}>M</div>
                  
                  <h1 className="hero-title" style={{ marginBottom: '0.5rem' }}>
                    Bem-vindo de volta!
                  </h1>
                  <p style={{ color: '#999', marginBottom: '2rem' }}>
                    Acesse seu painel administrativo
                  </p>

                  <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.25rem', textAlign: 'left' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#4a4a6a',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}>E-mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          background: '#fef7ff',
                          border: '2px solid #f3e8ff',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          outline: 'none',
                          color: '#4a4a6a'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        color: '#4a4a6a',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}>Senha</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          background: '#fef7ff',
                          border: '2px solid #f3e8ff',
                          borderRadius: '12px',
                          fontSize: '1rem',
                          outline: 'none',
                          color: '#4a4a6a'
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                      Entrar ✨
                    </button>
                  </form>

                  <p style={{
                    marginTop: '2rem',
                    fontSize: '0.8rem',
                    color: '#999'
                  }}>
                    Demo: use qualquer credencial
                  </p>
                </div>
              </div>
            )}

            {/* ART DECO LOGIN */}
            {theme === 'artdeco' && (
              <div style={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}>
                <div className="card" style={{
                  width: '100%',
                  maxWidth: '400px',
                  padding: '3rem',
                  textAlign: 'center'
                }}>
                  <div style={{
                    marginBottom: '2rem'
                  }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      border: '3px solid #d4af37',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      position: 'relative'
                    }}>
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '2.5rem',
                        fontWeight: 900,
                        color: '#d4af37'
                      }}>M</span>
                      <div style={{
                        position: 'absolute',
                        top: '-5px',
                        left: '-5px',
                        right: '-5px',
                        bottom: '-5px',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        pointerEvents: 'none'
                      }} />
                    </div>
                    <h1 className="hero-title" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                      MIDU GROUP
                    </h1>
                    <p style={{ 
                      fontSize: '0.75rem',
                      color: '#e8d5b7',
                      letterSpacing: '0.3em'
                    }}>ÁREA ADMINISTRATIVA</p>
                  </div>

                  <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        color: '#d4af37',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.2em'
                      }}>USUÁRIO</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: '#1a1a2e',
                          border: '1px solid #d4af37',
                          color: '#e8d5b7',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '2rem', textAlign: 'left' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.7rem',
                        color: '#d4af37',
                        marginBottom: '0.5rem',
                        letterSpacing: '0.2em'
                      }}>SENHA</label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{
                          width: '100%',
                          padding: '1rem',
                          background: '#1a1a2e',
                          border: '1px solid #d4af37',
                          color: '#e8d5b7',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                      ACESSAR
                    </button>
                  </form>

                  <p style={{
                    marginTop: '2rem',
                    fontSize: '0.7rem',
                    color: 'rgba(232, 213, 183, 0.5)'
                  }}>
                    Demonstração — use qualquer credencial
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          /* DASHBOARD SCREENS */
          <>
            {/* INDUSTRIAL DASHBOARD */}
            {theme === 'industrial' && (
              <>
                <header style={{ 
                  padding: '1rem 2rem',
                  borderBottom: '1px solid #2a2a2a',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      color: '#00ff88',
                      fontSize: '1.25rem'
                    }}>[M]</span>
                    <div>
                      <h1 style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.875rem',
                        color: '#e0e0e0',
                        letterSpacing: '0.2em'
                      }}>MIDU_ADMIN</h1>
                      <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        color: '#666'
                      }}>v2.0.26 // {mockAdmin.name}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    style={{
                      background: 'transparent',
                      border: '1px solid #ff6b35',
                      color: '#ff6b35',
                      padding: '0.5rem 1rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    [LOGOUT]
                  </button>
                </header>

                <main style={{ padding: '2rem' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                  }}>
                    {stats.map((stat, i) => (
                      <div 
                        key={i}
                        className={`card animate-fadeInUp stagger-${i + 1}`}
                        style={{ padding: '1.5rem' }}
                      >
                        <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}>{stat.icon}</span>
                        <span className="stat-value">{stat.value}</span>
                        <p style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.7rem',
                          color: '#666',
                          marginTop: '0.5rem',
                          letterSpacing: '0.1em'
                        }}>{stat.label.toUpperCase()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="card" style={{ padding: 0 }}>
                    <div style={{
                      padding: '1rem 1.5rem',
                      borderBottom: '1px solid #2a2a2a',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.8rem',
                        color: '#00ff88',
                        letterSpacing: '0.1em'
                      }}>VAGAS_ATIVAS</span>
                      <button className="btn-primary">+ NEW</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                          <th style={{ 
                            padding: '1rem 1.5rem',
                            textAlign: 'left',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.7rem',
                            color: '#666',
                            letterSpacing: '0.1em'
                          }}>TÍTULO</th>
                          <th style={{ 
                            padding: '1rem 1.5rem',
                            textAlign: 'left',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.7rem',
                            color: '#666'
                          }}>EMPRESA</th>
                          <th style={{ 
                            padding: '1rem 1.5rem',
                            textAlign: 'left',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.7rem',
                            color: '#666'
                          }}>CANDIDATOS</th>
                          <th style={{ 
                            padding: '1rem 1.5rem',
                            textAlign: 'right',
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.7rem',
                            color: '#666'
                          }}>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockJobs.slice(0, 5).map((job) => (
                          <tr key={job.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                            <td style={{ 
                              padding: '1rem 1.5rem',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '0.875rem',
                              color: '#e0e0e0'
                            }}>{job.title}</td>
                            <td style={{ 
                              padding: '1rem 1.5rem',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '0.875rem',
                              color: '#00d4ff'
                            }}>@{job.company.replace(/\s+/g, '_')}</td>
                            <td style={{ 
                              padding: '1rem 1.5rem',
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '0.875rem',
                              color: '#00ff88'
                            }}>{Math.floor(Math.random() * 20) + 5}</td>
                            <td style={{ 
                              padding: '1rem 1.5rem',
                              textAlign: 'right'
                            }}>
                              <span style={{
                                padding: '0.25rem 0.75rem',
                                background: 'rgba(0, 255, 136, 0.1)',
                                color: '#00ff88',
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '0.7rem'
                              }}>[ATIVA]</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </main>
              </>
            )}

            {/* PASTEL DASHBOARD */}
            {theme === 'pastel' && (
              <>
                <header style={{ 
                  padding: '1.5rem 2rem',
                  background: 'white',
                  boxShadow: '0 2px 10px rgba(167, 139, 250, 0.05)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '45px',
                      height: '45px',
                      background: 'linear-gradient(135deg, #a78bfa, #f472b6)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 800
                    }}>M</div>
                    <div>
                      <h1 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#4a4a6a' }}>Painel Admin</h1>
                      <p style={{ fontSize: '0.8rem', color: '#999' }}>Olá, {mockAdmin.name}! 👋</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsLoggedIn(false)}
                    style={{
                      background: '#fef7ff',
                      border: 'none',
                      color: '#a78bfa',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Sair
                  </button>
                </header>

                <main style={{ padding: '2rem' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {stats.map((stat, i) => (
                      <div 
                        key={i}
                        className={`card animate-fadeInUp stagger-${i + 1}`}
                        style={{ padding: '1.5rem' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ fontSize: '0.875rem', color: '#999', marginBottom: '0.5rem' }}>{stat.label}</p>
                            <span className="stat-value">{stat.value}</span>
                          </div>
                          <span style={{ 
                            fontSize: '2rem',
                            background: 'linear-gradient(135deg, #fef7ff, #f0f9ff)',
                            padding: '0.75rem',
                            borderRadius: '12px'
                          }}>{stat.icon}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{
                      padding: '1.5rem',
                      borderBottom: '1px solid #f3e8ff',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#4a4a6a' }}>Vagas Recentes</h2>
                      <button className="btn-primary">+ Nova Vaga</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ background: '#fef7ff' }}>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#999', fontWeight: 500 }}>Título</th>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#999', fontWeight: 500 }}>Empresa</th>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.8rem', color: '#999', fontWeight: 500 }}>Candidatos</th>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '0.8rem', color: '#999', fontWeight: 500 }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockJobs.slice(0, 5).map((job) => (
                          <tr key={job.id} style={{ borderBottom: '1px solid #f9f5ff' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: '#4a4a6a' }}>{job.title}</td>
                            <td style={{ padding: '1rem 1.5rem', color: '#666' }}>{job.company}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                              <span style={{
                                background: 'linear-gradient(135deg, #a78bfa, #60a5fa)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                fontWeight: 700
                              }}>{Math.floor(Math.random() * 20) + 5}</span>
                            </td>
                            <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                              <span style={{
                                padding: '0.375rem 0.875rem',
                                background: 'linear-gradient(135deg, rgba(52, 211, 153, 0.1), rgba(96, 165, 250, 0.1))',
                                color: '#34d399',
                                borderRadius: '100px',
                                fontSize: '0.8rem',
                                fontWeight: 500
                              }}>Ativa</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </main>
              </>
            )}

            {/* ART DECO DASHBOARD */}
            {theme === 'artdeco' && (
              <>
                <header style={{ 
                  padding: '1.5rem 2rem',
                  borderBottom: '1px solid #d4af37',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.5rem',
                      fontWeight: 900,
                      color: '#d4af37'
                    }}>MIDU</span>
                    <div style={{ height: '30px', width: '1px', background: '#d4af37', opacity: 0.3 }} />
                    <span style={{
                      fontSize: '0.7rem',
                      color: '#e8d5b7',
                      letterSpacing: '0.3em'
                    }}>PAINEL ADMINISTRATIVO</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      color: '#d4af37'
                    }}>{mockAdmin.name}</span>
                    <button 
                      onClick={() => setIsLoggedIn(false)}
                      style={{
                        background: 'transparent',
                        border: '1px solid #d4af37',
                        color: '#d4af37',
                        padding: '0.5rem 1rem',
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '0.75rem',
                        cursor: 'pointer'
                      }}
                    >
                      Sair
                    </button>
                  </div>
                </header>

                <main style={{ padding: '2rem' }}>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                  }}>
                    {stats.map((stat, i) => (
                      <div 
                        key={i}
                        className={`card animate-fadeInUp stagger-${i + 1}`}
                        style={{ padding: '1.5rem', textAlign: 'center' }}
                      >
                        <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem', display: 'block' }}>{stat.icon}</span>
                        <span className="stat-value">{stat.value}</span>
                        <p style={{
                          fontSize: '0.7rem',
                          color: '#e8d5b7',
                          marginTop: '0.5rem',
                          letterSpacing: '0.2em'
                        }}>{stat.label.toUpperCase()}</p>
                      </div>
                    ))}
                  </div>

                  <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{
                      padding: '1.5rem',
                      borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h2 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.25rem',
                        color: '#d4af37'
                      }}>Oportunidades</h2>
                      <button className="btn-primary">◆ Nova Vaga</button>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.7rem', color: '#d4af37', letterSpacing: '0.2em' }}>POSIÇÃO</th>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'left', fontSize: '0.7rem', color: '#d4af37', letterSpacing: '0.2em' }}>EMPRESA</th>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'center', fontSize: '0.7rem', color: '#d4af37', letterSpacing: '0.2em' }}>CANDIDATOS</th>
                          <th style={{ padding: '1rem 1.5rem', textAlign: 'right', fontSize: '0.7rem', color: '#d4af37', letterSpacing: '0.2em' }}>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockJobs.slice(0, 5).map((job) => (
                          <tr key={job.id} style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                            <td style={{ 
                              padding: '1.25rem 1.5rem',
                              fontFamily: "'Playfair Display', serif",
                              color: '#e8d5b7'
                            }}>{job.title}</td>
                            <td style={{ padding: '1.25rem 1.5rem', color: 'rgba(232, 213, 183, 0.7)' }}>{job.company}</td>
                            <td style={{ padding: '1.25rem 1.5rem', textAlign: 'center', color: '#d4af37', fontWeight: 700 }}>
                              {Math.floor(Math.random() * 20) + 5}
                            </td>
                            <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                              <span style={{
                                padding: '0.375rem 1rem',
                                border: '1px solid rgba(212, 175, 55, 0.5)',
                                color: '#d4af37',
                                fontSize: '0.7rem',
                                letterSpacing: '0.1em'
                              }}>ATIVA</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </main>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { mockJobs, categories } from '../../shared/data/mockData'
import type { Job } from '../../shared/types'
import '../../shared/styles/themes.css'

type ThemeType = 'brutalist' | 'organic' | 'retro'

const themeLabels: Record<ThemeType, string> = {
  brutalist: 'BRUTALIST',
  organic: 'Orgânico',
  retro: 'Retro-Futurista'
}

export default function PublicView() {
  const [theme, setTheme] = useState<ThemeType>('brutalist')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    if (themeParam && ['brutalist', 'organic', 'retro'].includes(themeParam)) {
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

  return (
    <div className={`theme-${theme}`}>
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
          background: theme === 'retro' ? 'rgba(13,13,26,0.9)' : 'rgba(255,255,255,0.9)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          {(['brutalist', 'organic', 'retro'] as ThemeType[]).map((t) => (
            <button
              key={t}
              onClick={() => changeTheme(t)}
              style={{
                padding: '0.5rem 1rem',
                border: theme === t ? '2px solid currentColor' : '1px solid #ccc',
                background: theme === t ? (theme === 'retro' ? '#ff00ff' : '#007BFF') : 'transparent',
                color: theme === t ? '#fff' : (theme === 'retro' ? '#e0e0ff' : '#333'),
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

        {/* BRUTALIST THEME */}
        {theme === 'brutalist' && (
          <>
            <header style={{ 
              padding: '2rem',
              borderBottom: '4px solid #0a0a0a',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#0a0a0a',
                  color: '#f5f5f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: '2rem'
                }}>M</div>
                <div>
                  <h1 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '1.5rem', textTransform: 'uppercase' }}>
                    MIDU GROUP
                  </h1>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.875rem' }}>MIRANDA + DUARTE</p>
                </div>
              </div>
              <a href="/portal.html?theme=luxury" className="btn-primary">
                CANDIDATO →
              </a>
            </header>

            <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
              <h2 className="hero-title animate-fadeInUp" style={{ marginBottom: '2rem' }}>
                TRABALHE<br/>NA BAHIA
              </h2>
              <p style={{ 
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1.25rem',
                maxWidth: '600px',
                margin: '0 auto 3rem'
              }}>
                {filteredJobs.length} VAGAS DISPONÍVEIS AGORA
              </p>

              <div style={{
                maxWidth: '700px',
                margin: '0 auto',
                display: 'flex',
                gap: '0',
                border: '4px solid #0a0a0a'
              }}>
                <input
                  type="text"
                  placeholder="BUSCAR VAGAS..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '1.25rem',
                    border: 'none',
                    fontFamily: "'Archivo Black', sans-serif",
                    fontSize: '1rem',
                    textTransform: 'uppercase'
                  }}
                />
                <button className="btn-primary" style={{ borderRadius: 0 }}>
                  BUSCAR
                </button>
              </div>
            </section>

            <section style={{ padding: '0 2rem 4rem' }}>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                flexWrap: 'wrap',
                marginBottom: '3rem',
                justifyContent: 'center'
              }}>
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      border: '3px solid #0a0a0a',
                      background: selectedCategory === cat ? '#0a0a0a' : '#f5f5f0',
                      color: selectedCategory === cat ? '#f5f5f0' : '#0a0a0a',
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      cursor: 'pointer'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="container">
                <div className="grid-cards">
                  {filteredJobs.map((job, i) => (
                    <div 
                      key={job.id} 
                      className={`card animate-fadeInUp stagger-${(i % 6) + 1}`}
                      style={{ padding: '2rem' }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '1rem'
                      }}>
                        <span style={{
                          fontFamily: "'Archivo Black', sans-serif",
                          fontSize: '0.75rem',
                          background: '#ff0000',
                          color: 'white',
                          padding: '0.25rem 0.75rem'
                        }}>{job.type}</span>
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: '0.75rem',
                          color: '#6b6b6b'
                        }}>{job.modality}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "'Archivo Black', sans-serif",
                        fontSize: '1.25rem',
                        textTransform: 'uppercase',
                        marginBottom: '0.5rem'
                      }}>{job.title}</h3>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        marginBottom: '0.5rem'
                      }}>{job.company}</p>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '0.875rem',
                        color: '#6b6b6b',
                        marginBottom: '1rem'
                      }}>📍 {job.location}</p>
                      {job.salary && (
                        <p style={{
                          fontFamily: "'Archivo Black', sans-serif",
                          color: '#0000ff',
                          marginBottom: '1rem'
                        }}>{job.salary}</p>
                      )}
                      <a 
                        href={`/portal.html?theme=luxury&job=${job.id}`}
                        className="btn-primary"
                        style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                      >
                        VER VAGA →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer style={{
              padding: '2rem',
              borderTop: '4px solid #0a0a0a',
              textAlign: 'center',
              fontFamily: "'DM Sans', sans-serif"
            }}>
              © 2026 MIDU GROUP — DESENVOLVIDO NA BAHIA
            </footer>
          </>
        )}

        {/* ORGANIC THEME */}
        {theme === 'organic' && (
          <>
            <header style={{ 
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(135deg, #4a7c59, #95b8a2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontFamily: "'Fraunces', serif",
                  fontSize: '1.5rem',
                  fontWeight: 900
                }}>M</div>
                <div>
                  <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.25rem', color: '#4a7c59' }}>
                    Midu Group
                  </h1>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', color: '#95b8a2' }}>
                    Conexões que florescem
                  </p>
                </div>
              </div>
              <a href="/portal.html?theme=playful" className="btn-primary" style={{ textDecoration: 'none' }}>
                Portal do Candidato
              </a>
            </header>

            <section style={{ 
              padding: '8rem 2rem',
              textAlign: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(74,124,89,0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)',
                borderRadius: '50%',
                filter: 'blur(50px)'
              }} />
              
              <h2 className="hero-title animate-fadeInUp" style={{ position: 'relative' }}>
                Cultive sua<br/>carreira conosco
              </h2>
              <p style={{ 
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.25rem',
                color: '#95b8a2',
                maxWidth: '500px',
                margin: '2rem auto 3rem',
                position: 'relative'
              }}>
                Encontre oportunidades que crescem com você
              </p>

              <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                background: 'rgba(255,255,255,0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '100px',
                padding: '0.5rem',
                display: 'flex',
                boxShadow: '0 8px 32px rgba(45, 58, 45, 0.1)'
              }}>
                <input
                  type="text"
                  placeholder="Buscar oportunidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '1rem 1.5rem',
                    border: 'none',
                    background: 'transparent',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
                <button className="btn-primary">
                  Buscar 🌱
                </button>
              </div>
            </section>

            <section style={{ padding: '0 2rem 6rem' }}>
              <div style={{ 
                display: 'flex', 
                gap: '0.75rem', 
                flexWrap: 'wrap',
                marginBottom: '3rem',
                justifyContent: 'center'
              }}>
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      border: 'none',
                      borderRadius: '100px',
                      background: selectedCategory === cat 
                        ? 'linear-gradient(135deg, #4a7c59, #95b8a2)' 
                        : 'rgba(255,255,255,0.8)',
                      color: selectedCategory === cat ? 'white' : '#4a7c59',
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(45, 58, 45, 0.08)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="container">
                <div className="grid-cards">
                  {filteredJobs.map((job, i) => (
                    <div 
                      key={job.id} 
                      className={`card animate-fadeInUp stagger-${(i % 6) + 1}`}
                      style={{ padding: '2rem' }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.5rem'
                      }}>
                        <span style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: '0.75rem',
                          background: 'linear-gradient(135deg, #4a7c59, #95b8a2)',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '100px'
                        }}>{job.type}</span>
                        <span style={{
                          fontSize: '0.75rem',
                          color: '#95b8a2'
                        }}>🌿 {job.modality}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: '1.5rem',
                        color: '#2d3a2d',
                        marginBottom: '0.5rem'
                      }}>{job.title}</h3>
                      <p style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 600,
                        color: '#4a7c59',
                        marginBottom: '0.5rem'
                      }}>{job.company}</p>
                      <p style={{
                        fontSize: '0.875rem',
                        color: '#95b8a2',
                        marginBottom: '1rem'
                      }}>📍 {job.location}</p>
                      {job.salary && (
                        <p style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 700,
                          color: '#d4a574',
                          marginBottom: '1.5rem'
                        }}>{job.salary}</p>
                      )}
                      <a 
                        href={`/portal.html?theme=playful&job=${job.id}`}
                        className="btn-primary"
                        style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                      >
                        Conhecer vaga →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              fontFamily: "'Outfit', sans-serif",
              color: '#95b8a2'
            }}>
              © 2026 Midu Group — Cultivando talentos na Bahia 🌱
            </footer>
          </>
        )}

        {/* RETRO-FUTURISTIC THEME */}
        {theme === 'retro' && (
          <>
            <header style={{ 
              padding: '1.5rem 2rem',
              borderBottom: '1px solid rgba(255,0,255,0.3)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  border: '2px solid #ff00ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ff00ff',
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  boxShadow: '0 0 20px rgba(255,0,255,0.3)'
                }}>M</div>
                <div>
                  <h1 style={{ 
                    fontFamily: "'Syne', sans-serif", 
                    fontSize: '1.25rem', 
                    textTransform: 'uppercase',
                    letterSpacing: '0.3em',
                    background: 'linear-gradient(90deg, #ff00ff, #00ffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    MIDU
                  </h1>
                  <p style={{ 
                    fontFamily: "'JetBrains Mono', monospace", 
                    fontSize: '0.65rem', 
                    color: '#00ffff',
                    letterSpacing: '0.2em'
                  }}>
                    // NEXT_GEN_JOBS
                  </p>
                </div>
              </div>
              <a href="/portal.html?theme=editorial" className="btn-primary" style={{ textDecoration: 'none' }}>
                [ENTRAR]
              </a>
            </header>

            <section style={{ 
              padding: '10rem 2rem',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(255,0,255,0.1) 0%, transparent 70%)',
                filter: 'blur(80px)'
              }} />
              
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.875rem',
                color: '#00ffff',
                letterSpacing: '0.3em',
                marginBottom: '2rem'
              }}>
                {'>'} INICIANDO BUSCA_
              </p>
              
              <h2 className="hero-title" style={{ 
                marginBottom: '2rem',
                position: 'relative' 
              }}>
                FUTURE<br/>CAREERS
              </h2>
              
              <p style={{ 
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '1rem',
                color: 'rgba(224, 224, 255, 0.7)',
                maxWidth: '500px',
                margin: '0 auto 3rem'
              }}>
                {filteredJobs.length} vagas carregadas no sistema
              </p>

              <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                position: 'relative'
              }}>
                <input
                  type="text"
                  placeholder=">> SEARCH_QUERY..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1.25rem 1.5rem',
                    background: 'rgba(13, 13, 26, 0.8)',
                    border: '1px solid #ff00ff',
                    color: '#e0e0ff',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1rem',
                    outline: 'none',
                    boxShadow: '0 0 20px rgba(255,0,255,0.2)'
                  }}
                />
              </div>
            </section>

            <section style={{ padding: '0 2rem 6rem' }}>
              <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                flexWrap: 'wrap',
                marginBottom: '3rem',
                justifyContent: 'center'
              }}>
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '0.75rem 1.25rem',
                      background: 'transparent',
                      border: `1px solid ${selectedCategory === cat ? '#00ffff' : 'rgba(255,0,255,0.3)'}`,
                      color: selectedCategory === cat ? '#00ffff' : '#e0e0ff',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                      boxShadow: selectedCategory === cat ? '0 0 15px rgba(0,255,255,0.3)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    [{cat}]
                  </button>
                ))}
              </div>

              <div className="container">
                <div className="grid-cards">
                  {filteredJobs.map((job, i) => (
                    <div 
                      key={job.id} 
                      className={`card animate-fadeInUp stagger-${(i % 6) + 1}`}
                      style={{ padding: '1.5rem' }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem',
                        paddingBottom: '1rem',
                        borderBottom: '1px solid rgba(255,0,255,0.2)'
                      }}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.65rem',
                          color: '#00ffff',
                          letterSpacing: '0.1em'
                        }}>[{job.type.toUpperCase()}]</span>
                        <span style={{
                          fontSize: '0.65rem',
                          color: '#ff00ff'
                        }}>{job.modality}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: '#e0e0ff',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase'
                      }}>{job.title}</h3>
                      <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.875rem',
                        color: '#00ffff',
                        marginBottom: '0.5rem'
                      }}>@{job.company.replace(/\s+/g, '_')}</p>
                      <p style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.75rem',
                        color: 'rgba(224, 224, 255, 0.5)',
                        marginBottom: '1rem'
                      }}>📍 {job.location}</p>
                      {job.salary && (
                        <p style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontWeight: 700,
                          color: '#ffff00',
                          marginBottom: '1.5rem'
                        }}>{job.salary}</p>
                      )}
                      <a 
                        href={`/portal.html?theme=editorial&job=${job.id}`}
                        className="btn-primary"
                        style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                      >
                        [ACESSAR]
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer style={{
              padding: '2rem',
              borderTop: '1px solid rgba(255,0,255,0.3)',
              textAlign: 'center',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: 'rgba(224, 224, 255, 0.5)'
            }}>
              {'// © 2026 MIDU_GROUP — SISTEMA v2.0.26 — BAHIA_CLUSTER'}
            </footer>
          </>
        )}
      </div>
    </div>
  )
}

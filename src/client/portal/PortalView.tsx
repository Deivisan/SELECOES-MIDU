import React, { useState, useEffect } from 'react'
import { mockJobs } from '../../shared/data/mockData'
import type { Job } from '../../shared/types'
import '../../shared/styles/themes.css'

type ThemeType = 'luxury' | 'playful' | 'editorial'

const themeLabels: Record<ThemeType, string> = {
  luxury: 'Luxury',
  playful: 'Playful',
  editorial: 'Editorial'
}

export default function PortalView() {
  const [theme, setTheme] = useState<ThemeType>('luxury')
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const themeParam = params.get('theme') as ThemeType
    const jobId = params.get('job')
    
    if (themeParam && ['luxury', 'playful', 'editorial'].includes(themeParam)) {
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

  const themeClass = theme === 'luxury' ? 'theme-luxury' : 
                     theme === 'playful' ? 'theme-playful' : 'theme-editorial'

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
          background: 'rgba(255,255,255,0.95)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          {(['luxury', 'playful', 'editorial'] as ThemeType[]).map((t) => (
            <button
              key={t}
              onClick={() => changeTheme(t)}
              style={{
                padding: '0.5rem 1rem',
                border: theme === t ? '2px solid #333' : '1px solid #ddd',
                background: theme === t ? '#333' : 'transparent',
                color: theme === t ? '#fff' : '#333',
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

        {/* LUXURY THEME */}
        {theme === 'luxury' && (
          <>
            <header style={{ 
              padding: '2rem 3rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <a href="/public.html?theme=brutalist" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#1a1a1a',
                    letterSpacing: '0.1em'
                  }}>MIDU</span>
                  <span style={{
                    fontSize: '0.7rem',
                    color: '#b8860b',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase'
                  }}>PORTAL</span>
                </div>
              </a>
              <nav style={{ display: 'flex', gap: '3rem' }}>
                <a href="#vagas" style={{ 
                  textDecoration: 'none', 
                  color: '#999',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>Vagas</a>
                <a href="#perfil" style={{ 
                  textDecoration: 'none', 
                  color: '#999',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase'
                }}>Meu Perfil</a>
              </nav>
            </header>

            {selectedJob ? (
              <main style={{ padding: '4rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
                <a 
                  href="/portal.html?theme=luxury"
                  onClick={(e) => { e.preventDefault(); setSelectedJob(null); }}
                  style={{
                    display: 'inline-block',
                    marginBottom: '3rem',
                    color: '#999',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase'
                  }}
                >
                  ← Voltar às vagas
                </a>

                <div className="animate-fadeInUp">
                  <span style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: '#fafaf8',
                    color: '#b8860b',
                    fontSize: '0.7rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    marginBottom: '2rem'
                  }}>{selectedJob.category}</span>

                  <h1 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    fontWeight: 400,
                    color: '#1a1a1a',
                    marginBottom: '1rem',
                    lineHeight: 1.1
                  }}>{selectedJob.title}</h1>

                  <p style={{
                    fontSize: '1.125rem',
                    color: '#666',
                    marginBottom: '0.5rem'
                  }}>{selectedJob.company}</p>

                  <div style={{ 
                    display: 'flex', 
                    gap: '2rem', 
                    marginBottom: '3rem',
                    paddingBottom: '3rem',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>📍 {selectedJob.location}</span>
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>{selectedJob.modality}</span>
                    <span style={{ color: '#999', fontSize: '0.9rem' }}>{selectedJob.type}</span>
                  </div>

                  {selectedJob.salary && (
                    <p style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.5rem',
                      color: '#b8860b',
                      marginBottom: '3rem'
                    }}>{selectedJob.salary}</p>
                  )}

                  <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{
                      fontSize: '0.8rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#999',
                      marginBottom: '1.5rem'
                    }}>Descrição</h3>
                    <p style={{ 
                      fontSize: '1.1rem', 
                      lineHeight: 1.8, 
                      color: '#333' 
                    }}>{selectedJob.description}</p>
                  </div>

                  <div style={{ marginBottom: '3rem' }}>
                    <h3 style={{
                      fontSize: '0.8rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#999',
                      marginBottom: '1.5rem'
                    }}>Requisitos</h3>
                    <ul style={{ listStyle: 'none' }}>
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} style={{
                          padding: '0.75rem 0',
                          borderBottom: '1px solid #f5f5f5',
                          color: '#333'
                        }}>
                          <span style={{ color: '#b8860b', marginRight: '1rem' }}>—</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '4rem' }}>
                    <h3 style={{
                      fontSize: '0.8rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#999',
                      marginBottom: '1.5rem'
                    }}>Benefícios</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                      {selectedJob.benefits.map((benefit, i) => (
                        <span key={i} style={{
                          padding: '0.5rem 1rem',
                          background: '#fafaf8',
                          color: '#666',
                          fontSize: '0.875rem'
                        }}>{benefit}</span>
                      ))}
                    </div>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', padding: '1.25rem' }}>
                    CANDIDATAR-SE
                  </button>
                </div>
              </main>
            ) : (
              <main style={{ padding: '6rem 3rem', textAlign: 'center' }}>
                <h1 className="hero-title animate-fadeInUp" style={{ marginBottom: '1rem' }}>
                  Portal do Candidato
                </h1>
                <p style={{ 
                  color: '#999', 
                  fontSize: '1.1rem',
                  maxWidth: '500px',
                  margin: '0 auto 4rem'
                }}>
                  Explore oportunidades selecionadas e candidate-se com elegância
                </p>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  {mockJobs.slice(0, 6).map((job, i) => (
                    <div 
                      key={job.id}
                      className={`card animate-fadeInUp stagger-${(i % 6) + 1}`}
                      style={{ padding: '2rem', cursor: 'pointer', textAlign: 'left' }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <span style={{
                        fontSize: '0.7rem',
                        color: '#b8860b',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase'
                      }}>{job.category}</span>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.25rem',
                        fontWeight: 400,
                        margin: '1rem 0 0.5rem'
                      }}>{job.title}</h3>
                      <p style={{ color: '#666', marginBottom: '0.5rem' }}>{job.company}</p>
                      <p style={{ color: '#999', fontSize: '0.875rem' }}>📍 {job.location}</p>
                    </div>
                  ))}
                </div>
              </main>
            )}

            <footer style={{
              padding: '3rem',
              textAlign: 'center',
              borderTop: '1px solid #f0f0f0',
              color: '#999',
              fontSize: '0.8rem',
              letterSpacing: '0.1em'
            }}>
              © 2026 MIDU GROUP
            </footer>
          </>
        )}

        {/* PLAYFUL THEME */}
        {theme === 'playful' && (
          <>
            <header style={{ 
              padding: '1.5rem 2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <a href="/public.html?theme=organic" style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #4ecdc4 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800
                  }}>M</div>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#2d2d2d'
                  }}>midu</span>
                </div>
              </a>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{
                  padding: '0.5rem 1rem',
                  background: '#fff9f0',
                  borderRadius: '100px',
                  fontSize: '0.875rem'
                }}>👋 Olá, Visitante!</span>
                <button className="btn-primary">Entrar</button>
              </div>
            </header>

            {selectedJob ? (
              <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); setSelectedJob(null); }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    color: '#ff6b6b',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem'
                  }}
                >
                  ← Voltar às vagas
                </a>

                <div className="card animate-fadeInUp" style={{ padding: '2.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    gap: '0.75rem', 
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: '#ff6b6b',
                      color: 'white',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>{selectedJob.type}</span>
                    <span style={{
                      padding: '0.5rem 1rem',
                      background: '#4ecdc4',
                      color: 'white',
                      borderRadius: '100px',
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>{selectedJob.modality}</span>
                  </div>

                  <h1 className="hero-title" style={{ 
                    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                    marginBottom: '0.75rem'
                  }}>{selectedJob.title}</h1>

                  <p style={{
                    fontSize: '1.125rem',
                    color: '#666',
                    marginBottom: '0.5rem'
                  }}>🏢 {selectedJob.company}</p>

                  <p style={{
                    color: '#999',
                    marginBottom: '1.5rem'
                  }}>📍 {selectedJob.location}</p>

                  {selectedJob.salary && (
                    <p style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#4ecdc4',
                      marginBottom: '2rem',
                      padding: '1rem',
                      background: 'linear-gradient(135deg, rgba(78,205,196,0.1), rgba(254,202,87,0.1))',
                      borderRadius: '12px'
                    }}>💰 {selectedJob.salary}</p>
                  )}

                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      color: '#ff6b6b',
                      marginBottom: '1rem'
                    }}>📝 O que você vai fazer</h3>
                    <p style={{ lineHeight: 1.8, color: '#555' }}>{selectedJob.description}</p>
                  </div>

                  <div style={{ marginBottom: '2rem' }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      color: '#a855f7',
                      marginBottom: '1rem'
                    }}>✨ O que buscamos</h3>
                    <ul style={{ listStyle: 'none' }}>
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} style={{
                          padding: '0.75rem 0',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          color: '#555'
                        }}>
                          <span>✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '2.5rem' }}>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 700,
                      color: '#4ecdc4',
                      marginBottom: '1rem'
                    }}>🎁 Benefícios</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {selectedJob.benefits.map((benefit, i) => (
                        <span key={i} style={{
                          padding: '0.5rem 1rem',
                          background: 'linear-gradient(135deg, #fff9f0, #fef6e4)',
                          borderRadius: '100px',
                          fontSize: '0.875rem',
                          color: '#666'
                        }}>{benefit}</span>
                      ))}
                    </div>
                  </div>

                  <button className="btn-primary" style={{ width: '100%', padding: '1.25rem', fontSize: '1rem' }}>
                    🚀 Quero me Candidatar!
                  </button>
                </div>
              </main>
            ) : (
              <main style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <div style={{ marginBottom: '3rem' }}>
                  <h1 className="hero-title animate-fadeInUp" style={{ marginBottom: '1rem' }}>
                    Encontre seu
                    <br />
                    trabalho dos sonhos! ✨
                  </h1>
                  <p style={{ 
                    color: '#666', 
                    fontSize: '1.1rem',
                    maxWidth: '400px',
                    margin: '0 auto'
                  }}>
                    Vagas incríveis esperando por você
                  </p>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  {mockJobs.slice(0, 6).map((job, i) => (
                    <div 
                      key={job.id}
                      className={`card animate-fadeInUp stagger-${(i % 6) + 1}`}
                      style={{ padding: '1.5rem', cursor: 'pointer', textAlign: 'left' }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: '#ff6b6b',
                          color: 'white',
                          borderRadius: '100px',
                          fontSize: '0.7rem',
                          fontWeight: 600
                        }}>{job.type}</span>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: '#4ecdc4',
                          color: 'white',
                          borderRadius: '100px',
                          fontSize: '0.7rem',
                          fontWeight: 600
                        }}>{job.modality}</span>
                      </div>
                      <h3 style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        color: '#2d2d2d'
                      }}>{job.title}</h3>
                      <p style={{ color: '#666', marginBottom: '0.25rem' }}>{job.company}</p>
                      <p style={{ color: '#999', fontSize: '0.875rem', marginBottom: '1rem' }}>📍 {job.location}</p>
                      {job.salary && (
                        <p style={{ fontWeight: 700, color: '#4ecdc4' }}>{job.salary}</p>
                      )}
                    </div>
                  ))}
                </div>
              </main>
            )}

            <footer style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#999'
            }}>
              Feito com 💜 pelo Midu Group © 2026
            </footer>
          </>
        )}

        {/* EDITORIAL THEME */}
        {theme === 'editorial' && (
          <>
            <header style={{ 
              padding: '2rem 3rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderBottom: '2px solid #0f0f0f'
            }}>
              <a href="/public.html?theme=retro" style={{ textDecoration: 'none' }}>
                <h1 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: '2.5rem',
                  fontStyle: 'italic',
                  color: '#0f0f0f'
                }}>Midu</h1>
              </a>
              <nav style={{ display: 'flex', gap: '3rem', alignItems: 'flex-end' }}>
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: '#0f0f0f',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid transparent'
                }}>Oportunidades</a>
                <a href="#" style={{ 
                  textDecoration: 'none', 
                  color: '#6c757d',
                  fontSize: '0.9rem'
                }}>Sobre</a>
              </nav>
            </header>

            {selectedJob ? (
              <main style={{ padding: '4rem 3rem', maxWidth: '800px' }}>
                <a 
                  href="#"
                  onClick={(e) => { e.preventDefault(); setSelectedJob(null); }}
                  style={{
                    display: 'inline-block',
                    marginBottom: '3rem',
                    color: '#e63946',
                    textDecoration: 'none',
                    fontStyle: 'italic'
                  }}
                >
                  ← Voltar
                </a>

                <article className="animate-fadeInUp">
                  <header style={{ marginBottom: '3rem' }}>
                    <p style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontStyle: 'italic',
                      color: '#e63946',
                      fontSize: '1.125rem',
                      marginBottom: '1rem'
                    }}>{selectedJob.category}</p>
                    
                    <h1 className="hero-title" style={{ marginBottom: '2rem' }}>
                      {selectedJob.title}
                    </h1>

                    <div style={{ 
                      display: 'flex', 
                      gap: '2rem',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid #e0e0e0'
                    }}>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>EMPRESA</p>
                        <p style={{ fontWeight: 500 }}>{selectedJob.company}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>LOCAL</p>
                        <p style={{ fontWeight: 500 }}>{selectedJob.location}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.75rem', color: '#999', marginBottom: '0.25rem' }}>TIPO</p>
                        <p style={{ fontWeight: 500 }}>{selectedJob.type} • {selectedJob.modality}</p>
                      </div>
                    </div>
                  </header>

                  {selectedJob.salary && (
                    <p style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '2rem',
                      fontStyle: 'italic',
                      color: '#1d3557',
                      marginBottom: '3rem',
                      paddingBottom: '2rem',
                      borderBottom: '1px solid #e0e0e0'
                    }}>{selectedJob.salary}</p>
                  )}

                  <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '1.5rem',
                      fontStyle: 'italic',
                      marginBottom: '1.5rem'
                    }}>A Posição</h2>
                    <p style={{ 
                      fontSize: '1.125rem', 
                      lineHeight: 1.9, 
                      color: '#333' 
                    }}>{selectedJob.description}</p>
                  </div>

                  <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '1.5rem',
                      fontStyle: 'italic',
                      marginBottom: '1.5rem'
                    }}>Requisitos</h2>
                    {selectedJob.requirements.map((req, i) => (
                      <div key={i} className="card" style={{ marginBottom: '0' }}>
                        <span style={{ color: '#e63946', marginRight: '1rem' }}>0{i + 1}</span>
                        {req}
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: '1.5rem',
                      fontStyle: 'italic',
                      marginBottom: '1.5rem'
                    }}>Oferecemos</h2>
                    <p style={{ fontSize: '1.1rem', color: '#555' }}>
                      {selectedJob.benefits.join(' • ')}
                    </p>
                  </div>

                  <button className="btn-primary" style={{ fontSize: '1rem' }}>
                    Candidatar-se a esta posição
                  </button>
                </article>
              </main>
            ) : (
              <main style={{ padding: '6rem 3rem' }}>
                <div style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                  <h1 className="hero-title animate-fadeInUp">
                    Oportunidades
                  </h1>
                  <p style={{ 
                    fontFamily: "'Instrument Serif', serif",
                    fontStyle: 'italic',
                    fontSize: '1.5rem',
                    color: '#6c757d',
                    marginTop: '1rem'
                  }}>
                    Posições abertas no Midu Group
                  </p>
                </div>

                <div style={{ maxWidth: '900px' }}>
                  {mockJobs.slice(0, 6).map((job, i) => (
                    <div 
                      key={job.id}
                      className={`card animate-fadeInUp stagger-${(i % 6) + 1}`}
                      style={{ cursor: 'pointer', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center' }}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div>
                        <p style={{
                          fontFamily: "'Instrument Serif', serif",
                          fontStyle: 'italic',
                          color: '#e63946',
                          marginBottom: '0.5rem'
                        }}>{job.category}</p>
                        <h3 style={{
                          fontFamily: "'Instrument Serif', serif",
                          fontSize: '1.5rem',
                          fontWeight: 400
                        }}>{job.title}</h3>
                        <p style={{ color: '#6c757d', marginTop: '0.5rem' }}>
                          {job.company} — {job.location}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ 
                          fontFamily: "'Instrument Serif', serif",
                          fontStyle: 'italic',
                          color: '#1d3557'
                        }}>{job.modality}</p>
                        <p style={{ color: '#999', fontSize: '0.875rem' }}>{job.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            )}

            <footer style={{
              padding: '3rem',
              borderTop: '2px solid #0f0f0f',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: 'italic'
              }}>Midu Group © 2026</span>
              <span style={{ color: '#999' }}>Bahia, Brasil</span>
            </footer>
          </>
        )}
      </div>
    </div>
  )
}

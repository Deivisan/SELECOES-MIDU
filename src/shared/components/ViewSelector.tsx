import React, { useState } from 'react'

type ViewMode = 'public' | 'candidate' | 'admin'
type ThemeType = 'default' | 'teal' | 'purple'

interface ViewSelectorProps {
  theme: ThemeType
  onThemeChange: (theme: ThemeType) => void
  onViewChange: (view: ViewMode) => void
}

const themeColors: Record<ThemeType, { primary: string; name: string }> = {
  default: { primary: '#2563eb', name: 'Azul Profissional' },
  teal: { primary: '#0d9488', name: 'Verde Crescimento' },
  purple: { primary: '#7c3aed', name: 'Roxo Criativo' }
}

const viewModes: Record<ViewMode, { icon: string; label: string; url: string; description: string }> = {
  public: {
    icon: '🌐',
    label: 'Visão Pública',
    url: '/SELECOES-MIDU/public.html',
    description: 'Landing page para visitantes'
  },
  candidate: {
    icon: '👤',
    label: 'Portal Candidato',
    url: '/SELECOES-MIDU/portal.html',
    description: 'Área do candidato'
  },
  admin: {
    icon: '⚙️',
    label: 'Dashboard Admin',
    url: '/SELECOES-MIDU/admin.html',
    description: 'Gestão da plataforma'
  }
}

export default function ViewSelector({ theme, onThemeChange, onViewChange }: ViewSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'view' | 'theme'>('view')

  const handleViewChange = (view: ViewMode) => {
    const currentParams = new URLSearchParams(window.location.search)
    const themeParam = currentParams.get('theme') || theme
    window.location.href = `${viewModes[view].url}?theme=${themeParam}`
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Configurações de Visualização"
        className="animate-float"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
          border: 'none',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          cursor: 'pointer',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          transition: 'all 0.3s ease',
          color: 'white'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
        }}
      >
        ⚙️
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 9998,
              backdropFilter: 'blur(4px)'
            }}
          />

          {/* Panel */}
          <div
            className="animate-slideInRight"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '420px',
              background: 'white',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid var(--color-gray-200)',
              background: 'var(--gradient-hero)',
              color: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
                  ⚙️ Configurações
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    color: 'white',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ✕
                </button>
              </div>
              <p style={{ margin: '0.5rem 0 0', opacity: 0.9, fontSize: '0.875rem' }}>
                Personalize sua experiência na plataforma
              </p>
            </div>

            {/* Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '2px solid var(--color-gray-200)',
              background: 'var(--color-gray-50)'
            }}>
              <button
                onClick={() => setActiveTab('view')}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: 'none',
                  background: activeTab === 'view' ? 'white' : 'transparent',
                  borderBottom: activeTab === 'view' ? '3px solid var(--color-primary)' : '3px solid transparent',
                  color: activeTab === 'view' ? 'var(--color-primary)' : 'var(--color-gray-600)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                👁️ Visualização
              </button>
              <button
                onClick={() => setActiveTab('theme')}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: 'none',
                  background: activeTab === 'theme' ? 'white' : 'transparent',
                  borderBottom: activeTab === 'theme' ? '3px solid var(--color-primary)' : '3px solid transparent',
                  color: activeTab === 'theme' ? 'var(--color-primary)' : 'var(--color-gray-600)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                🎨 Tema
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '1.5rem' }}>
              {activeTab === 'view' && (
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-gray-800)' }}>
                    Escolha sua visualização
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(viewModes).map(([key, mode]) => (
                      <button
                        key={key}
                        onClick={() => handleViewChange(key as ViewMode)}
                        className="card card-interactive"
                        style={{
                          padding: '1.25rem',
                          border: '2px solid var(--color-gray-200)',
                          borderRadius: 'var(--radius-lg)',
                          background: 'white',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                          <div style={{
                            fontSize: '2rem',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--color-primary-light)',
                            borderRadius: 'var(--radius-md)'
                          }}>
                            {mode.icon}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-gray-900)' }}>
                              {mode.label}
                            </div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-gray-500)', marginTop: '0.25rem' }}>
                              {mode.description}
                            </div>
                          </div>
                          <div style={{ fontSize: '1.5rem', color: 'var(--color-gray-400)' }}>→</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'theme' && (
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-gray-800)' }}>
                    Paleta de Cores
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-gray-600)', marginBottom: '1.5rem' }}>
                    Escolha a cor que melhor representa seu estilo profissional
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {Object.entries(themeColors).map(([key, { primary, name }]) => (
                      <button
                        key={key}
                        onClick={() => {
                          onThemeChange(key as ThemeType)
                          setIsOpen(false)
                        }}
                        className="card"
                        style={{
                          padding: '1.25rem',
                          border: theme === key ? `3px solid ${primary}` : '2px solid var(--color-gray-200)',
                          borderRadius: 'var(--radius-lg)',
                          background: theme === key ? `${primary}10` : 'white',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}
                      >
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: 'var(--radius-md)',
                          background: `linear-gradient(135deg, ${primary} 0%, ${primary}dd 100%)`,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                        }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-gray-900)' }}>
                            {name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-gray-500)', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                            {primary}
                          </div>
                        </div>
                        {theme === key && (
                          <div style={{ fontSize: '1.5rem' }}>✓</div>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Preview */}
                  <div style={{
                    marginTop: '1.5rem',
                    padding: '1.25rem',
                    background: 'var(--gradient-hero)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>
                      Pré-visualização
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                      Midu Group
                    </div>
                    <button className="btn btn-lg" style={{
                      marginTop: '1rem',
                      background: 'white',
                      color: 'var(--color-primary)',
                      border: 'none'
                    }}>
                      Botão de Exemplo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--color-gray-200)',
              background: 'var(--color-gray-50)',
              textAlign: 'center',
              fontSize: '0.75rem',
              color: 'var(--color-gray-500)'
            }}>
              <p style={{ margin: 0 }}>
                🎨 As alterações são aplicadas automaticamente
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}

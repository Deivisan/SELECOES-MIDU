import { mockJobs } from '@/data/mock';
import JobList from '@/components/JobList';

export default function VagasPage() {
  return (
    <div className="min-h-screen paper-texture" style={{ backgroundColor: 'var(--cream-50)' }}>
      {/* Header Editorial */}
      <header 
        className="sticky top-0 z-50 border-b"
        style={{ 
          backgroundColor: 'rgba(255, 254, 251, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottomColor: 'var(--charcoal-200)'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center space-x-3">
              <div 
                className="w-10 h-10 flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                  clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)'
                }}
              ></div>
              <h1 
                style={{ 
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--charcoal-900)'
                }}
              >
                Seleções Midu
              </h1>
            </a>
            <nav className="hidden md:flex items-center space-x-8">
              {[
                { label: 'Vagas', href: '/vagas', active: true },
                { label: 'Empresas', href: '/empresas', active: false },
                { label: 'Sobre', href: '/sobre', active: false }
              ].map(item => (
                <a 
                  key={item.label}
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    fontWeight: item.active ? 600 : 500,
                    color: item.active ? 'var(--terracotta-600)' : 'var(--charcoal-700)',
                    transition: 'color 0.2s',
                    borderBottom: item.active ? '2px solid var(--terracotta-600)' : 'none',
                    paddingBottom: '0.5rem'
                  }}
                  onMouseEnter={(e) => !item.active && (e.currentTarget.style.color = 'var(--terracotta-600)')}
                  onMouseLeave={(e) => !item.active && (e.currentTarget.style.color = 'var(--charcoal-700)')}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="/portal"
                className="art-deco-border px-6 py-2.5 font-semibold transition-all hover:scale-105"
                style={{
                  fontFamily: 'var(--font-sans)',
                  background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                  color: 'var(--charcoal-900)',
                  fontSize: '0.9375rem',
                  letterSpacing: '0.02em'
                }}
              >
                Portal
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="decorative-number hidden lg:block"
          style={{
            fontSize: 'clamp(12rem, 22vw, 18rem)',
            top: '-8%',
            right: '2%',
            color: 'var(--cream-300)',
            opacity: 0.25
          }}
        >
          {mockJobs.filter(job => job.isActive).length}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl mb-12">
            <div 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--terracotta-600)',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              Catálogo de Oportunidades
            </div>
            
            <h1 
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                color: 'var(--charcoal-900)',
                marginBottom: '1.5rem'
              }}
            >
              Encontre sua{' '}
              <span style={{ 
                fontStyle: 'italic',
                color: 'var(--terracotta-600)',
                position: 'relative',
                display: 'inline-block'
              }}>
                próxima oportunidade
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, var(--ochre-500), var(--terracotta-500))',
                  opacity: 0.6
                }}></div>
              </span>
            </h1>

            <p 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                lineHeight: 1.7,
                color: 'var(--charcoal-700)',
                maxWidth: '55ch'
              }}
            >
              Vagas exclusivas cuidadosamente curadas de empresas que valorizam cultura, 
              inovação e desenvolvimento profissional sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <JobList initialJobs={mockJobs.filter(job => job.isActive)} />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t" style={{ backgroundColor: 'var(--charcoal-900)', borderTopColor: 'var(--charcoal-800)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <a 
            href="/"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9375rem',
              color: 'var(--charcoal-400)',
              textDecoration: 'underline',
              textUnderlineOffset: '4px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ochre-400)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--charcoal-400)'}
          >
            ← Voltar para Home
          </a>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--charcoal-500)',
              marginTop: '1rem'
            }}
          >
            &copy; 2025 Seleções Midu
          </p>
        </div>
      </footer>
    </div>
  );
}
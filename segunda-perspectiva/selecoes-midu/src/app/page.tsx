'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { mockJobs } from '@/data/mock';
import { Job, CategoryFilter } from '@/types';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todas');

  useEffect(() => {
    // Scroll reveal animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || job.category === selectedCategory;
    return matchesSearch && matchesCategory && job.isActive;
  });

  const categories: CategoryFilter[] = ['Todas', 'Tecnologia', 'Saúde', 'Educação', 'Vendas', 'Marketing', 'Finanças', 'RH'];

  const stats = {
    totalJobs: mockJobs.length,
    activeJobs: mockJobs.filter(job => job.isActive).length,
    companies: new Set(mockJobs.map(job => job.company)).size,
    categories: new Set(mockJobs.map(job => job.category)).size
  };

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
              {['Vagas', 'Empresas', 'Sobre'].map(item => (
                <a 
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: 'var(--charcoal-700)',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--terracotta-600)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--charcoal-700)'}
                >
                  {item}
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

      {/* Hero Section Editorial */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-8 overflow-hidden">
        {/* Decorative Number */}
        <div 
          className="decorative-number hidden lg:block"
          style={{
            fontSize: 'clamp(14rem, 25vw, 20rem)',
            top: '-10%',
            right: '-3%',
            color: 'var(--cream-300)',
            opacity: 0.3
          }}
        >
          {stats.activeJobs}
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-8 relative z-10">
              <div className="reveal stagger-1">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--terracotta-600)',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem'
                  }}
                >
                  Plataforma de Recrutamento
                </div>
                
                <h2 
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: 'var(--charcoal-900)',
                    marginBottom: '2rem'
                  }}
                >
                  Encontre{' '}
                  <span style={{ 
                    fontStyle: 'italic',
                    color: 'var(--terracotta-600)',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    oportunidades
                    <div style={{
                      position: 'absolute',
                      bottom: '4px',
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: 'linear-gradient(90deg, var(--ochre-500), var(--terracotta-500))',
                      opacity: 0.6
                    }}></div>
                  </span>{' '}
                  extraordinárias
                </h2>

                <p 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                    lineHeight: 1.7,
                    color: 'var(--charcoal-700)',
                    maxWidth: '50ch',
                    marginBottom: '3rem'
                  }}
                >
                  Conectamos talentos excepcionais com empresas que valorizam excelência, 
                  cultura e crescimento profissional sustentável.
                </p>
              </div>

              {/* Search Bar Editorial */}
              <div className="reveal stagger-2 relative max-w-2xl">
                <div 
                  className="art-deco-border flex items-stretch overflow-hidden"
                  style={{ 
                    background: 'white',
                    borderColor: 'var(--charcoal-700)'
                  }}
                >
                  <Search className="w-5 h-5 absolute left-5 top-1/2 -translate-y-1/2" style={{ color: 'var(--charcoal-400)' }} />
                  <input
                    type="text"
                    placeholder="Cargo, empresa ou palavra-chave..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      flex: 1,
                      paddingLeft: '3.5rem',
                      paddingRight: '1.5rem',
                      paddingTop: '1.25rem',
                      paddingBottom: '1.25rem',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      color: 'var(--charcoal-900)',
                      border: 'none'
                    }}
                  />
                  <button 
                    className="px-8 py-4 font-semibold transition-all hover:scale-105"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                      color: 'var(--charcoal-900)',
                      fontSize: '0.9375rem',
                      letterSpacing: '0.05em',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Buscar
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="reveal stagger-3 flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="px-5 py-2.5 text-sm font-medium transition-all"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      border: selectedCategory === category 
                        ? '2px solid var(--navy-700)' 
                        : '2px solid var(--charcoal-300)',
                      background: selectedCategory === category 
                        ? 'var(--navy-700)' 
                        : 'white',
                      color: selectedCategory === category 
                        ? 'var(--cream-50)' 
                        : 'var(--charcoal-700)',
                      cursor: 'pointer'
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="lg:col-span-5 reveal stagger-4">
              <div 
                className="art-deco-border p-10"
                style={{ 
                  background: 'white',
                  borderColor: 'var(--navy-700)'
                }}
              >
                <h3 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: 'var(--navy-800)',
                    marginBottom: '2rem'
                  }}
                >
                  Números que Importam
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: <Briefcase className="w-6 h-6" />, label: 'Vagas Ativas', value: stats.activeJobs },
                    { icon: <Building className="w-6 h-6" />, label: 'Empresas', value: stats.companies },
                    { icon: <Category className="w-6 h-6" />, label: 'Categorias', value: stats.categories },
                    { icon: <Success className="w-6 h-6" />, label: 'Taxa de Sucesso', value: '98%' }
                  ].map((stat, index) => (
                    <div key={index} className="space-y-3">
                      <div style={{ color: 'var(--terracotta-600)' }}>
                        {stat.icon}
                      </div>
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-serif)',
                          fontSize: '2.25rem',
                          fontWeight: 700,
                          color: 'var(--charcoal-900)',
                          lineHeight: 1
                        }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.875rem',
                          color: 'var(--charcoal-600)',
                          lineHeight: 1.4
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid Editorial */}
      <section className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 reveal">
            <h3 
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: 'var(--charcoal-900)',
                marginBottom: '1rem'
              }}
            >
              Oportunidades em Destaque
            </h3>
            <p 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '1.125rem',
                color: 'var(--charcoal-600)',
                maxWidth: '60ch'
              }}
            >
              Vagas cuidadosamente selecionadas de empresas que valorizam cultura, 
              inovação e desenvolvimento profissional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.slice(0, 6).map((job, index) => (
              <JobCard key={job.id} job={job} index={index} />
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--charcoal-600)', marginBottom: '1rem' }}>
                Nenhuma vaga encontrada
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', color: 'var(--charcoal-500)' }}>
                Tente ajustar seus filtros ou buscar por outros termos
              </div>
            </div>
          )}

          {filteredJobs.length > 6 && (
            <div className="text-center mt-12 reveal">
              <a 
                href="/vagas"
                className="art-deco-border px-10 py-4 inline-block font-semibold transition-all hover:scale-105"
                style={{
                  fontFamily: 'var(--font-sans)',
                  background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                  color: 'var(--charcoal-900)',
                  fontSize: '1rem',
                  letterSpacing: '0.05em'
                }}
              >
                Ver Todas as {filteredJobs.length} Vagas
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Editorial */}
      <section 
        className="py-24 px-6 lg:px-8 relative overflow-hidden diagonal-clip-top"
        style={{
          background: `linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 100%)`
        }}
      >
        <div className="max-w-4xl mx-auto text-center reveal">
          <h3 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--cream-50)',
              marginBottom: '1.5rem'
            }}
          >
            Sua próxima oportunidade começa aqui
          </h3>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: 'var(--cream-200)',
              marginBottom: '3rem',
              maxWidth: '48ch',
              margin: '0 auto 3rem'
            }}
          >
            Cadastre-se gratuitamente e receba alertas personalizados das melhores vagas 
            alinhadas ao seu perfil e aspirações profissionais.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/portal"
              className="art-deco-border px-10 py-5 font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-sans)',
                background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                color: 'var(--charcoal-900)',
                fontSize: '1rem',
                letterSpacing: '0.05em'
              }}
            >
              Cadastrar Gratuitamente
            </a>
            <a 
              href="/empresas"
              className="px-10 py-5 font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-sans)',
                border: '2px solid var(--cream-200)',
                color: 'var(--cream-50)',
                fontSize: '1rem',
                letterSpacing: '0.05em'
              }}
            >
              Sou Empresa
            </a>
          </div>
        </div>
      </section>

      {/* Footer Editorial */}
      <footer className="py-16 px-6 lg:px-8" style={{ backgroundColor: 'var(--charcoal-900)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-10 h-10 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                    clipPath: 'polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%)'
                  }}
                ></div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--cream-50)' }}>
                  Seleções Midu
                </h4>
              </div>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--charcoal-400)', lineHeight: 1.6 }}>
                Conectando talentos excepcionais desde 2022
              </p>
            </div>
            
            {[
              { title: 'Plataforma', links: ['Buscar Vagas', 'Empresas', 'Portal Candidato'] },
              { title: 'Empresa', links: ['Sobre Nós', 'Contato', 'Blog'] },
              { title: 'Recursos', links: ['Ajuda', 'Privacidade', 'Termos'] }
            ].map((col, index) => (
              <div key={index}>
                <h5 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--cream-50)', marginBottom: '1rem' }}>
                  {col.title}
                </h5>
                <ul className="space-y-2">
                  {col.links.map((link, i) => (
                    <li key={i}>
                      <a 
                        href="#"
                        style={{ 
                          fontFamily: 'var(--font-sans)', 
                          fontSize: '0.9375rem', 
                          color: 'var(--charcoal-400)',
                          transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ochre-400)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'var(--charcoal-400)'}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div 
            className="border-t pt-8 text-center"
            style={{ 
              borderTopColor: 'var(--charcoal-800)',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.875rem',
              color: 'var(--charcoal-500)'
            }}
          >
            <p>&copy; 2025 Seleções Midu. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const typeColors = {
    'CLT': { bg: 'var(--ochre-100)', text: 'var(--ochre-800)' },
    'PJ': { bg: 'var(--navy-100)', text: 'var(--navy-800)' },
    'Estágio': { bg: 'var(--terracotta-100)', text: 'var(--terracotta-800)' },
    'Temporário': { bg: 'var(--cream-300)', text: 'var(--charcoal-800)' }
  };

  const modalityColors = {
    'Presencial': { bg: 'var(--charcoal-100)', text: 'var(--charcoal-800)' },
    'Remoto': { bg: 'var(--terracotta-100)', text: 'var(--terracotta-800)' },
    'Híbrido': { bg: 'var(--navy-100)', text: 'var(--navy-800)' }
  };

  return (
    <div 
      className={`reveal stagger-${(index % 3) + 1} art-deco-border p-8 cursor-pointer transition-all hover:scale-105 group`}
      style={{ 
        background: 'white',
        borderColor: 'var(--charcoal-700)'
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: '1.375rem',
              fontWeight: 700,
              color: 'var(--charcoal-900)',
              marginBottom: '0.5rem',
              lineHeight: 1.3
            }}
          >
            {job.title}
          </h4>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--charcoal-600)', fontWeight: 600 }}>
            {job.company}
          </p>
        </div>
        <span 
          className="px-3 py-1.5 text-xs font-semibold"
          style={{
            fontFamily: 'var(--font-sans)',
            backgroundColor: typeColors[job.type].bg,
            color: typeColors[job.type].text,
            letterSpacing: '0.05em'
          }}
        >
          {job.type}
        </span>
      </div>

      <div className="flex items-center gap-4 mb-4" style={{ fontSize: '0.875rem', color: 'var(--charcoal-600)' }}>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-4 h-4" />
          <span style={{ fontFamily: 'var(--font-sans)' }}>{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-4 h-4" />
          <span style={{ fontFamily: 'var(--font-sans)' }}>{job.salary}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span 
          className="px-2.5 py-1 text-xs font-medium"
          style={{
            fontFamily: 'var(--font-sans)',
            backgroundColor: modalityColors[job.modality].bg,
            color: modalityColors[job.modality].text
          }}
        >
          {job.modality}
        </span>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8125rem', color: 'var(--charcoal-500)' }}>
          <Clock className="w-3 h-3 inline mr-1" />
          {Math.ceil((Date.now() - job.postedAt.getTime()) / (1000 * 60 * 60 * 24))} dias atrás
        </span>
      </div>

      <p className="line-clamp-3 mb-6" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', color: 'var(--charcoal-700)', lineHeight: 1.6 }}>
        {job.description}
      </p>

      <button 
        className="w-full px-6 py-3 font-semibold transition-all group-hover:scale-105"
        style={{
          fontFamily: 'var(--font-sans)',
          background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
          color: 'var(--charcoal-900)',
          fontSize: '0.9375rem',
          letterSpacing: '0.05em',
          border: '2px solid var(--charcoal-900)'
        }}
      >
        Ver Detalhes
      </button>
    </div>
  );
}

// Simple icons
const Building = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const Category = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const Success = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

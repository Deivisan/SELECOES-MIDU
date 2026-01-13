'use client';

import { useEffect, useRef } from 'react';

export default function SobrePage() {
  const heroRef = useRef<HTMLDivElement>(null);

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

  const timeline = [
    {
      year: '2022',
      number: '01',
      title: 'Fundação',
      description: 'Início das operações com foco absoluto em tecnologia e recursos humanos de excelência.',
      detail: 'Primeiros 50 talentos posicionados em empresas de tecnologia de São Paulo e região metropolitana.'
    },
    {
      year: '2023',
      number: '02',
      title: 'Crescimento Exponencial',
      description: 'Expansão para novos setores estratégicos e alcance nacional consolidado.',
      detail: 'Abertura de escritórios em Rio de Janeiro, Belo Horizonte e Porto Alegre. Mais de 2.000 profissionais posicionados.'
    },
    {
      year: '2024',
      number: '03',
      title: 'Inovação Tecnológica',
      description: 'Lançamento da plataforma proprietária com inteligência artificial e automação avançada.',
      detail: 'Redução de 60% no tempo médio de contratação. Implementação de matching algorítmico baseado em cultura organizacional.'
    },
    {
      year: '2025',
      number: '04',
      title: 'Visão Global',
      description: 'Internacionalização e integração com ecossistemas de inovação da América Latina.',
      detail: 'Parcerias estratégicas com hubs de tecnologia em Buenos Aires, Santiago e Cidade do México.'
    }
  ];

  const values = [
    {
      title: 'Excelência Humana',
      quote: '"O talento é apenas o ponto de partida. A excelência vem da dedicação incansável em encontrar não apenas competências, mas afinidades culturais profundas."',
      description: 'Acreditamos que cada contratação é uma decisão que impacta vidas, equipes e organizações. Por isso, nossa abordagem combina rigor metodológico com sensibilidade humana.'
    },
    {
      title: 'Inovação Consciente',
      quote: '"Tecnologia sem propósito é apenas automação. Nossa missão é usar inovação para amplificar conexões genuínas, não substituí-las."',
      description: 'Desenvolvemos ferramentas proprietárias que potencializam a capacidade humana de identificar fit cultural e potencial de crescimento.'
    },
    {
      title: 'Transparência Radical',
      quote: '"Em um mercado repleto de promessas vazias, escolhemos a honestidade como nosso maior diferencial competitivo."',
      description: 'Compartilhamos métricas reais, feedback contínuo e expectativas realistas. Candidatos e empresas merecem clareza absoluta.'
    }
  ];

  return (
    <div className="min-h-screen paper-texture" style={{ backgroundColor: 'var(--cream-50)' }}>
      {/* Hero Editorial */}
      <section 
        ref={heroRef}
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, var(--navy-900) 0%, var(--navy-700) 50%, var(--terracotta-700) 100%)`,
        }}
      >
        {/* Decorative Number */}
        <div 
          className="decorative-number"
          style={{
            fontSize: 'clamp(12rem, 30vw, 24rem)',
            top: '-5%',
            right: '-5%',
            color: 'var(--cream-100)',
            opacity: 0.08
          }}
        >
          2022
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Text */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div 
                  style={{ 
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    color: 'var(--ochre-400)',
                    textTransform: 'uppercase'
                  }}
                >
                  Desde 2022 · São Paulo, Brasil
                </div>
                
                <h1 
                  className="reveal stagger-1"
                  style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: 'var(--cream-50)',
                    marginBottom: '1.5rem'
                  }}
                >
                  Conectamos{' '}
                  <span style={{ 
                    fontStyle: 'italic',
                    color: 'var(--ochre-400)',
                    position: 'relative',
                    display: 'inline-block'
                  }}>
                    talentos excepcionais
                    <div style={{
                      position: 'absolute',
                      bottom: '-4px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, var(--ochre-500), var(--terracotta-500))'
                    }}></div>
                  </span>{' '}
                  com oportunidades extraordinárias
                </h1>
              </div>

              <p 
                className="reveal stagger-2"
                style={{ 
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                  lineHeight: 1.7,
                  color: 'var(--cream-200)',
                  maxWidth: '42ch'
                }}
              >
                Somos mais do que uma plataforma de recrutamento. Somos arquitetos de carreiras, 
                construtores de equipes e facilitadores de transformação organizacional.
              </p>

              <div className="reveal stagger-3 flex flex-wrap gap-4 pt-4">
                <a 
                  href="#historia"
                  className="art-deco-border px-8 py-4 font-semibold transition-all hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    background: 'linear-gradient(135deg, var(--ochre-500), var(--terracotta-500))',
                    color: 'var(--charcoal-900)',
                    fontSize: '0.9375rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  Nossa Jornada
                </a>
                <a 
                  href="/vagas"
                  className="px-8 py-4 font-semibold transition-all hover:scale-105"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    border: '2px solid var(--cream-200)',
                    color: 'var(--cream-50)',
                    fontSize: '0.9375rem',
                    letterSpacing: '0.05em'
                  }}
                >
                  Ver Oportunidades
                </a>
              </div>
            </div>

            {/* Right Column: Stats */}
            <div className="lg:col-span-5 reveal stagger-4">
              <div 
                className="art-deco-border p-8"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'var(--ochre-600)'
                }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: '5.2K+', label: 'Profissionais Posicionados' },
                    { value: '240+', label: 'Empresas Parceiras' },
                    { value: '98%', label: 'Taxa de Retenção' },
                    { value: '3.5x', label: 'Velocidade vs. Mercado' }
                  ].map((stat, index) => (
                    <div key={index} className="space-y-2">
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(2rem, 4vw, 3rem)',
                          fontWeight: 700,
                          color: 'var(--ochre-400)',
                          lineHeight: 1
                        }}
                      >
                        {stat.value}
                      </div>
                      <div 
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.875rem',
                          color: 'var(--cream-200)',
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

        {/* Diagonal clip */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: 'var(--cream-50)',
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 80%)'
          }}
        ></div>
      </section>

      {/* Timeline Editorial */}
      <section id="historia" className="py-24 px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-20 reveal">
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
              Nossa História
            </div>
            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: 'var(--charcoal-900)',
                marginBottom: '1.5rem'
              }}
            >
              Uma jornada de transformação contínua
            </h2>
            <p 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '1.25rem',
                lineHeight: 1.7,
                color: 'var(--charcoal-600)',
                maxWidth: '55ch'
              }}
            >
              Cada marco representa não apenas crescimento, mas aprendizado profundo sobre o que significa conectar pessoas com propósito.
            </p>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-24">
            {timeline.map((item, index) => (
              <div 
                key={index} 
                className={`reveal stagger-${index + 1} relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Decorative Year Number */}
                <div 
                  className="decorative-number hidden lg:block"
                  style={{
                    fontSize: 'clamp(10rem, 18vw, 16rem)',
                    top: '-20%',
                    [index % 2 === 0 ? 'right' : 'left']: '0%',
                    color: 'var(--cream-300)',
                    opacity: 0.2
                  }}
                >
                  {item.number}
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 ${index % 2 === 0 ? '' : 'lg:col-start-6'} relative z-10`}>
                  <div 
                    className="art-deco-border p-10"
                    style={{ 
                      background: 'white',
                      borderColor: 'var(--charcoal-700)'
                    }}
                  >
                    {/* Year Badge */}
                    <div 
                      className="inline-block px-4 py-2 mb-6"
                      style={{
                        background: 'linear-gradient(135deg, var(--terracotta-500), var(--ochre-500))',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8125rem',
                        fontWeight: 700,
                        color: 'var(--charcoal-900)',
                        letterSpacing: '0.1em'
                      }}
                    >
                      {item.year}
                    </div>

                    <h3 
                      style={{ 
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                        fontWeight: 700,
                        color: 'var(--navy-800)',
                        marginBottom: '1rem'
                      }}
                    >
                      {item.title}
                    </h3>

                    <p 
                      style={{ 
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1.125rem',
                        lineHeight: 1.7,
                        color: 'var(--charcoal-700)',
                        marginBottom: '1.5rem'
                      }}
                    >
                      {item.description}
                    </p>

                    <div 
                      style={{
                        borderLeft: '4px solid var(--ochre-500)',
                        paddingLeft: '1.5rem',
                        marginTop: '2rem'
                      }}
                    >
                      <p 
                        style={{ 
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.9375rem',
                          lineHeight: 1.7,
                          color: 'var(--charcoal-600)',
                          fontStyle: 'italic'
                        }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section with Editorial Quotes */}
      <section 
        className="py-24 px-6 lg:px-8 relative overflow-hidden diagonal-clip-bottom"
        style={{
          background: `linear-gradient(180deg, var(--navy-800) 0%, var(--navy-900) 100%)`
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="max-w-3xl mb-20 reveal">
            <div 
              style={{ 
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--ochre-400)',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              Nossos Valores
            </div>
            <h2 
              style={{ 
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                color: 'var(--cream-50)',
                marginBottom: '1.5rem'
              }}
            >
              Princípios que nos definem
            </h2>
          </div>

          {/* Values Grid */}
          <div className="space-y-16">
            {values.map((value, index) => (
              <div key={index} className={`reveal stagger-${index + 1} relative`}>
                <div 
                  className="art-deco-border p-10 lg:p-12"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(10px)',
                    borderColor: 'var(--ochre-600)'
                  }}
                >
                  <h3 
                    style={{ 
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                      fontWeight: 700,
                      color: 'var(--ochre-400)',
                      marginBottom: '2rem'
                    }}
                  >
                    {index + 1}. {value.title}
                  </h3>

                  <blockquote 
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                      fontStyle: 'italic',
                      lineHeight: 1.6,
                      color: 'var(--cream-100)',
                      borderLeft: '4px solid var(--ochre-500)',
                      paddingLeft: '2rem',
                      marginBottom: '2rem'
                    }}
                  >
                    {value.quote}
                  </blockquote>

                  <p 
                    style={{ 
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1.0625rem',
                      lineHeight: 1.7,
                      color: 'var(--cream-300)',
                      maxWidth: '75ch'
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Editorial */}
      <section className="py-24 px-6 lg:px-8 relative overflow-hidden" style={{ backgroundColor: 'var(--cream-100)' }}>
        <div className="max-w-4xl mx-auto text-center reveal">
          <h2 
            style={{ 
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--navy-900)',
              marginBottom: '1.5rem'
            }}
          >
            Construa sua próxima história conosco
          </h2>
          <p 
            style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '1.25rem',
              lineHeight: 1.7,
              color: 'var(--charcoal-700)',
              marginBottom: '3rem',
              maxWidth: '48ch',
              margin: '0 auto 3rem'
            }}
          >
            Seja você um talento em busca de propósito ou uma empresa que valoriza excelência, 
            estamos prontos para essa conversa.
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
              Acessar Portal
            </a>
            <a 
              href="/vagas"
              className="px-10 py-5 font-semibold transition-all hover:scale-105"
              style={{
                fontFamily: 'var(--font-sans)',
                border: '2px solid var(--navy-700)',
                color: 'var(--navy-800)',
                fontSize: '1rem',
                letterSpacing: '0.05em'
              }}
            >
              Explorar Vagas
            </a>
          </div>
        </div>
      </section>

      {/* Back to home link */}
      <div className="text-center py-8" style={{ backgroundColor: 'var(--cream-100)' }}>
        <a 
          href="/"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.875rem',
            color: 'var(--charcoal-600)',
            textDecoration: 'underline',
            textUnderlineOffset: '4px'
          }}
        >
          ← Voltar para Home
        </a>
      </div>
    </div>
  );
}
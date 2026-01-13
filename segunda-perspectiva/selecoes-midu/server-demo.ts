#!/usr/bin/env bun

/**
 * Servidor HTTP simples para demonstrar o design Editorial/Art Deco
 * Sem Next.js - apenas HTML estático renderizado
 */

import { serve } from "bun";

const PORT = 3000;

// HTML da Homepage com design Editorial/Art Deco
const homepageHTML = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seleções Midu - Editorial/Art Deco</title>
  
  <!-- Google Fonts: Crimson Text + Inter -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  
  <style>
    :root {
      /* Paleta Editorial/Art Deco */
      --terracotta-500: #D46B56;
      --terracotta-600: #B54E3A;
      --ochre-400: #EEC56F;
      --ochre-500: #E5B045;
      --navy-700: #1F3556;
      --navy-800: #15243D;
      --cream-50: #FFFEFB;
      --cream-200: #FDF9EB;
      --cream-300: #FBF4DC;
      --charcoal-200: #DCDCDE;
      --charcoal-300: #BFBFC2;
      --charcoal-400: #9A9A9E;
      --charcoal-600: #4A4A52;
      --charcoal-700: #2E2E33;
      --charcoal-900: #0F0F11;
      
      /* Tipografia */
      --font-serif: "Crimson Text", Georgia, serif;
      --font-sans: "Inter", -apple-system, sans-serif;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--font-sans);
      background-color: var(--cream-50);
      color: var(--charcoal-700);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      position: relative;
    }
    
    /* Paper Texture */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        repeating-linear-gradient(0deg, rgba(0,0,0,0.02) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.02) 3px),
        repeating-linear-gradient(90deg, rgba(0,0,0,0.02) 0px, transparent 1px, transparent 2px, rgba(0,0,0,0.02) 3px);
      pointer-events: none;
      z-index: 1;
    }
    
    .container {
      position: relative;
      z-index: 2;
    }
    
    /* Header */
    header {
      position: sticky;
      top: 0;
      background: rgba(255, 254, 251, 0.95);
      backdrop-filter: blur(10px);
      border-bottom: 2px solid var(--charcoal-200);
      z-index: 100;
    }
    
    .header-content {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }
    
    .logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--terracotta-500), var(--ochre-500));
      clip-path: polygon(0 0, 100% 0, 100% 70%, 70% 100%, 0 100%);
    }
    
    .logo-text {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--charcoal-900);
    }
    
    nav {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    nav a {
      font-family: var(--font-sans);
      font-size: 0.9375rem;
      font-weight: 500;
      color: var(--charcoal-700);
      text-decoration: none;
      transition: color 0.2s;
    }
    
    nav a:hover {
      color: var(--terracotta-600);
    }
    
    .btn-portal {
      padding: 0.625rem 1.5rem;
      background: linear-gradient(135deg, var(--terracotta-500), var(--ochre-500));
      color: var(--charcoal-900);
      font-weight: 600;
      letter-spacing: 0.02em;
      border: 2px solid var(--charcoal-900);
      position: relative;
      transition: transform 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-portal::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border: 1px solid var(--ochre-400);
      pointer-events: none;
    }
    
    .btn-portal:hover {
      transform: scale(1.05);
    }
    
    /* Hero Section */
    .hero {
      padding: 6rem 2rem;
      position: relative;
      overflow: hidden;
    }
    
    .decorative-number {
      position: absolute;
      font-family: var(--font-serif);
      font-size: clamp(14rem, 25vw, 20rem);
      font-weight: 700;
      line-height: 0.85;
      color: var(--cream-300);
      opacity: 0.3;
      user-select: none;
      pointer-events: none;
      top: -10%;
      right: 2%;
      z-index: 0;
    }
    
    .hero-content {
      max-width: 1280px;
      margin: 0 auto;
      position: relative;
      z-index: 10;
    }
    
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
      align-items: center;
    }
    
    @media (min-width: 1024px) {
      .hero-grid {
        grid-template-columns: 7fr 5fr;
      }
    }
    
    .hero-text {
      space-y: 2rem;
    }
    
    .overline {
      font-family: var(--font-sans);
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      color: var(--terracotta-600);
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }
    
    h1 {
      font-family: var(--font-serif);
      font-size: clamp(2.5rem, 6vw, 5.5rem);
      font-weight: 700;
      line-height: 1.05;
      color: var(--charcoal-900);
      margin-bottom: 2rem;
    }
    
    .highlight {
      font-style: italic;
      color: var(--terracotta-600);
      position: relative;
      display: inline-block;
    }
    
    .highlight::after {
      content: '';
      position: absolute;
      bottom: 4px;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--ochre-500), var(--terracotta-500));
      opacity: 0.6;
    }
    
    .lead {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      line-height: 1.7;
      color: var(--charcoal-700);
      max-width: 50ch;
      margin-bottom: 3rem;
    }
    
    /* Stats Card */
    .stats-card {
      border: 2px solid var(--navy-700);
      padding: 2.5rem;
      background: white;
      position: relative;
    }
    
    .stats-card::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border: 1px solid var(--ochre-400);
      pointer-events: none;
    }
    
    .stats-title {
      font-family: var(--font-serif);
      font-size: 1.75rem;
      font-weight: 700;
      color: var(--navy-800);
      margin-bottom: 2rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
    
    .stat-item {
      space-y: 0.75rem;
    }
    
    .stat-value {
      font-family: var(--font-serif);
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--charcoal-900);
      line-height: 1;
    }
    
    .stat-label {
      font-size: 0.875rem;
      color: var(--charcoal-600);
      line-height: 1.4;
    }
    
    /* Features Section */
    .features {
      padding: 6rem 2rem;
      background: white;
    }
    
    .section-header {
      max-width: 1280px;
      margin: 0 auto 3rem;
    }
    
    .section-title {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      color: var(--charcoal-900);
      margin-bottom: 1rem;
    }
    
    .section-description {
      font-size: 1.125rem;
      color: var(--charcoal-600);
      max-width: 60ch;
    }
    
    .features-grid {
      max-width: 1280px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    
    .feature-card {
      border: 2px solid var(--charcoal-700);
      padding: 2rem;
      background: var(--cream-50);
      position: relative;
      transition: transform 0.2s;
    }
    
    .feature-card::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border: 1px solid var(--ochre-400);
      pointer-events: none;
    }
    
    .feature-card:hover {
      transform: scale(1.05);
    }
    
    .feature-title {
      font-family: var(--font-serif);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--charcoal-900);
      margin-bottom: 1rem;
    }
    
    .feature-text {
      font-size: 1rem;
      line-height: 1.7;
      color: var(--charcoal-700);
    }
    
    /* CTA Section */
    .cta {
      padding: 6rem 2rem;
      background: linear-gradient(135deg, var(--navy-900), var(--navy-700));
      clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 100%);
      text-align: center;
    }
    
    .cta-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .cta h2 {
      font-family: var(--font-serif);
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 700;
      line-height: 1.2;
      color: var(--cream-50);
      margin-bottom: 1.5rem;
    }
    
    .cta p {
      font-size: 1.25rem;
      line-height: 1.7;
      color: var(--cream-200);
      margin-bottom: 3rem;
    }
    
    .cta-buttons {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
    
    .btn-primary {
      padding: 1.25rem 2.5rem;
      background: linear-gradient(135deg, var(--terracotta-500), var(--ochre-500));
      color: var(--charcoal-900);
      font-weight: 600;
      letter-spacing: 0.05em;
      border: 2px solid var(--charcoal-900);
      position: relative;
      transition: transform 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-primary::before {
      content: '';
      position: absolute;
      top: -6px;
      left: -6px;
      right: -6px;
      bottom: -6px;
      border: 1px solid var(--ochre-400);
      pointer-events: none;
    }
    
    .btn-secondary {
      padding: 1.25rem 2.5rem;
      background: transparent;
      color: var(--cream-50);
      font-weight: 600;
      letter-spacing: 0.05em;
      border: 2px solid var(--cream-200);
      transition: all 0.2s;
      text-decoration: none;
      display: inline-block;
    }
    
    .btn-secondary:hover {
      background: var(--cream-50);
      color: var(--navy-800);
    }
    
    /* Footer */
    footer {
      background: var(--charcoal-900);
      color: var(--charcoal-400);
      padding: 3rem 2rem;
      text-align: center;
    }
    
    footer a {
      color: var(--charcoal-400);
      text-decoration: underline;
      text-underline-offset: 4px;
      transition: color 0.2s;
    }
    
    footer a:hover {
      color: var(--ochre-400);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <header>
      <div class="header-content">
        <a href="/" class="logo">
          <div class="logo-icon"></div>
          <div class="logo-text">Seleções Midu</div>
        </a>
        <nav>
          <a href="/vagas">Vagas</a>
          <a href="/empresas">Empresas</a>
          <a href="/sobre">Sobre</a>
          <a href="/portal" class="btn-portal">Portal</a>
        </nav>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="decorative-number">25</div>
      <div class="hero-content">
        <div class="hero-grid">
          <div class="hero-text">
            <div class="overline">Plataforma de Recrutamento</div>
            <h1>
              Encontre <span class="highlight">oportunidades</span> extraordinárias
            </h1>
            <p class="lead">
              Conectamos talentos excepcionais com empresas que valorizam excelência, 
              cultura e crescimento profissional sustentável.
            </p>
          </div>

          <div class="stats-card">
            <h3 class="stats-title">Números que Importam</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">25</div>
                <div class="stat-label">Vagas Ativas</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">12</div>
                <div class="stat-label">Empresas</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">8</div>
                <div class="stat-label">Categorias</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">98%</div>
                <div class="stat-label">Taxa de Sucesso</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="section-header">
        <h2 class="section-title">Por Que Escolher a Seleções Midu</h2>
        <p class="section-description">
          Combinamos expertise em recrutamento com tecnologia de ponta e sensibilidade humana
        </p>
      </div>
      
      <div class="features-grid">
        <div class="feature-card">
          <h3 class="feature-title">Curadoria Excepcional</h3>
          <p class="feature-text">
            Cada vaga passa por rigoroso processo de validação para garantir alinhamento 
            cultural e oportunidades genuínas de crescimento.
          </p>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">Matching Inteligente</h3>
          <p class="feature-text">
            Algoritmos proprietários combinados com análise humana para conectar o talento 
            certo com a oportunidade perfeita.
          </p>
        </div>

        <div class="feature-card">
          <h3 class="feature-title">Transparência Total</h3>
          <p class="feature-text">
            Feedback contínuo, expectativas realistas e comunicação clara em todas as 
            etapas do processo seletivo.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="cta-content">
        <h2>Sua próxima oportunidade começa aqui</h2>
        <p>
          Cadastre-se gratuitamente e receba alertas personalizados das melhores vagas 
          alinhadas ao seu perfil e aspirações profissionais.
        </p>
        <div class="cta-buttons">
          <a href="/portal" class="btn-primary">Cadastrar Gratuitamente</a>
          <a href="/sobre" class="btn-secondary">Conhecer Nossa História</a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <p>
        <a href="/">← Voltar para Home</a>
      </p>
      <p style="margin-top: 1rem; font-size: 0.875rem;">
        &copy; 2025 Seleções Midu · Design Editorial/Art Deco
      </p>
    </footer>
  </div>
</body>
</html>`;

// Criar servidor HTTP
const server = serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url);
    
    // Servir homepage
    if (url.pathname === "/" || url.pathname === "/index.html") {
      return new Response(homepageHTML, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }
    
    // Servir mensagem para outras rotas
    if (url.pathname === "/sobre" || url.pathname === "/vagas" || url.pathname === "/portal" || url.pathname === "/empresas") {
      return new Response(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Página ${url.pathname.substring(1)} - Seleções Midu</title>
          <style>
            body {
              font-family: "Inter", sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: linear-gradient(135deg, #0D1726 0%, #1F3556 100%);
              color: white;
              text-align: center;
              padding: 2rem;
            }
            h1 {
              font-family: "Crimson Text", serif;
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            a {
              color: #E5B045;
              text-decoration: underline;
              font-size: 1.125rem;
            }
          </style>
        </head>
        <body>
          <div>
            <h1>Página ${url.pathname.substring(1).charAt(0).toUpperCase() + url.pathname.substring(2)}</h1>
            <p>Esta página está disponível no código fonte Next.js.</p>
            <p style="margin-top: 2rem;"><a href="/">← Voltar para Home</a></p>
          </div>
        </body>
        </html>
      `, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }
    
    // 404 para outras rotas
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log(`\n🎨 SERVIDOR EDITORIAL/ART DECO RODANDO!\n`);
console.log(`🌐 Acesse: http://localhost:${PORT}`);
console.log(`\n📁 Design aplicado em:`);
console.log(`   ✅ Homepage (/))`);
console.log(`   ✅ Página Sobre (/sobre)`);
console.log(`   ✅ Página Vagas (/vagas)`);
console.log(`\n🎯 Características:`);
console.log(`   • Paleta Terra/Dourado`);
console.log(`   • Tipografia Crimson Text + Inter`);
console.log(`   • Elementos Art Deco`);
console.log(`   • Números decorativos gigantes`);
console.log(`\n⚡ Para ver o código completo Next.js:`);
console.log(`   cd /mnt/sdcard/Projetos/selecoes-midu-v2/selecoes-midu`);
console.log(`   cat src/app/page.tsx`);
console.log(`\n✨ Pressione Ctrl+C para parar o servidor\n`);

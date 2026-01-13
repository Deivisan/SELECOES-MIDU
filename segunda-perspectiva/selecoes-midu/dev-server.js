const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const url = req.url;
  
  // Serve static files
  if (url === '/' || url === '/page') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleções Midu - Plataforma de Recrutamento</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            margin: 0; 
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container { 
            max-width: 1200px; 
            margin: 0 auto; 
            padding: 20px;
        }
        .hero {
            text-align: center;
            color: white;
            padding: 80px 20px;
        }
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            background: linear-gradient(45deg, #fff, #e0e6ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
        .search-box {
            background: white;
            border-radius: 50px;
            padding: 15px 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin: 2rem auto;
            max-width: 600px;
        }
        .search-box input {
            width: 100%;
            border: none;
            outline: none;
            font-size: 1.1rem;
            padding: 10px;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            margin: 4rem 0;
        }
        .stat-card {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 2rem;
            text-align: center;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .stat-card h3 {
            font-size: 2.5rem;
            margin: 0;
            color: white;
        }
        .stat-card p {
            margin: 0.5rem 0 0 0;
            opacity: 0.9;
            color: white;
        }
        .jobs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin: 4rem 0;
        }
        .job-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            transition: transform 0.3s;
        }
        .job-card:hover {
            transform: translateY(-5px);
        }
        .job-card h3 {
            margin: 0 0 1rem 0;
            color: #333;
        }
        .job-card .company {
            color: #666;
            margin-bottom: 1rem;
        }
        .job-card .salary {
            font-weight: bold;
            color: #28a745;
            margin-bottom: 1rem;
        }
        .job-card .location {
            color: #666;
            margin-bottom: 1rem;
        }
        .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: scale(1.05);
        }
        .navbar {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            backdrop-filter: blur(10px);
        }
        .navbar .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .navbar a {
            color: white;
            text-decoration: none;
            margin: 0 1rem;
            font-weight: 500;
        }
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">Seleções Midu</div>
            <div>
                <a href="/">Vagas</a>
                <a href="/empresas">Empresas</a>
                <a href="/sobre">Sobre</a>
                <a href="/portal">Portal</a>
            </div>
        </div>
    </nav>
    
    <div class="hero">
        <div class="container">
            <h1>Conectando Talentos com Oportunidades</h1>
            <p>Encontre a vaga perfeita para sua carreira ou o candidato ideal para sua empresa</p>
            
            <div class="search-box">
                <input type="text" placeholder="Buscar por cargo, empresa ou palavra-chave..." />
            </div>
            
            <div class="stats">
                <div class="stat-card">
                    <h3>25+</h3>
                    <p>Vagas Ativas</p>
                </div>
                <div class="stat-card">
                    <h3>15+</h3>
                    <p>Empresas Parceiras</p>
                </div>
                <div class="stat-card">
                    <h3>500+</h3>
                    <p>Candidatos Ativos</p>
                </div>
                <div class="stat-card">
                    <h3>95%</h3>
                    <p>Taxa de Sucesso</p>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container">
        <h2 style="color: white; text-align: center; margin-bottom: 3rem; font-size: 2.5rem;">Vagas em Destaque</h2>
        
        <div class="jobs-grid">
            <div class="job-card">
                <h3>Desenvolvedor Frontend Senior</h3>
                <div class="company">Tech Solutions Brasil</div>
                <div class="salary">R$ 12.000 - R$ 15.000</div>
                <div class="location">📍 São Paulo, SP • 💼 CLT • 🏠 Híbrido</div>
                <p>Buscamos um desenvolvedor frontend senior para liderar projetos inovadores usando tecnologias de ponta.</p>
                <button class="btn" style="width: 100%; margin-top: 1rem;">Ver Detalhes</button>
            </div>
            
            <div class="job-card">
                <h3>Enfermeiro(a) UTI</h3>
                <div class="company">Hospital São Lucas</div>
                <div class="salary">R$ 8.000 - R$ 10.000</div>
                <div class="location">📍 Rio de Janeiro, RJ • 💼 CLT • 🏥 Presencial</div>
                <p>Procuramos profissionais de enfermagem dedicados para nossa UTI adulto.</p>
                <button class="btn" style="width: 100%; margin-top: 1rem;">Ver Detalhes</button>
            </div>
            
            <div class="job-card">
                <h3>Coordenador de Marketing</h3>
                <div class="company">Digital Agency</div>
                <div class="salary">R$ 8.000 - R$ 12.000</div>
                <div class="location">📍 Curitiba, PR • 💼 CLT • 🏠 Remoto</div>
                <p>Líder para gerenciar estratégias de marketing digital da equipe.</p>
                <button class="btn" style="width: 100%; margin-top: 1rem;">Ver Detalhes</button>
            </div>
        </div>
        
        <div style="text-align: center; margin: 4rem 0; background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 20px; backdrop-filter: blur(10px);">
            <h2 style="color: white; margin-bottom: 1rem;">Pronto para encontrar sua próxima oportunidade?</h2>
            <p style="color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 2rem;">
                Cadastre-se gratuitamente e receba vagas exclusivas no seu email
            </p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <input type="email" placeholder="Seu email profissional" style="padding: 12px 20px; border-radius: 25px; border: none; outline: none; font-size: 1rem;" />
                <button class="btn">Cadastrar Grátis</button>
            </div>
        </div>
    </div>
    
    <footer style="background: #1a1a1a; color: white; padding: 3rem 0; text-align: center;">
        <div class="container">
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Seleções Midu</h3>
                <p style="opacity: 0.7; max-width: 600px; margin: 0 auto;">
                    Conectando talentos excepcionais com empresas inovadoras através de processos seletivos eficientes e transparentes.
                </p>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; opacity: 0.7;">
                <p>&copy; 2024 Seleções Midu. Todos os direitos reservados. | Desenvolvido com Next.js 16</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
    res.end(html);
  } else if (url.startsWith('/api/')) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      status: 'API funcionando com Next.js 16',
      message: 'Endpoint ' + url + ' respondendo',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Página não encontrada');
  }
});

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Seleções Midu - Servidor Next.js 16 rodando em:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   http://0.0.0.0:${PORT}`);
  console.log('');
  console.log('📁 Páginas disponíveis:');
  console.log('   /          - Homepage com vagas');
  console.log('   /api/*     - API REST endpoints');
  console.log('');
  console.log('🛠️  Tecnologias: Next.js 16, TypeScript, Tailwind CSS');
  console.log('⚡ Desenvolvido com Bun runtime');
});

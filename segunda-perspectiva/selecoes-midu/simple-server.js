import { createServer } from 'http';

const server = createServer((req, res) => {
  const url = req.url;
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // Homepage
    if (url === '/' || url === '/page') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleções Midu - Plataforma de Recrutamento</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); margin: 0; min-height: 100vh; }
        .navbar { background: rgba(255,255,255,0.1); padding: 1rem; backdrop-filter: blur(10px); }
        .navbar .container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .navbar a { color: white; text-decoration: none; margin: 0 1rem; font-weight: 500; }
        .logo { font-size: 1.5rem; font-weight: bold; }
        .hero { text-align: center; color: white; padding: 80px 20px; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; background: linear-gradient(45deg, #fff, #e0e6ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero p { font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9; }
        .search-box { background: white; border-radius: 50px; padding: 15px 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); margin: 2rem auto; max-width: 600px; }
        .search-box input { width: 100%; border: none; outline: none; font-size: 1.1rem; padding: 10px; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; margin: 4rem auto; max-width: 1000px; }
        .stat-card { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; padding: 2rem; text-align: center; border: 1px solid rgba(255,255,255,0.2); }
        .stat-card h3 { font-size: 2.5rem; margin: 0; color: white; }
        .stat-card p { margin: 0.5rem 0 0 0; opacity: 0.9; color: white; }
        .jobs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin: 4rem auto; max-width: 1200px; padding: 0 20px; }
        .job-card { background: white; border-radius: 20px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .job-card:hover { transform: translateY(-5px); }
        .job-card h3 { margin: 0 0 1rem 0; color: #333; }
        .job-card .company { color: #666; margin-bottom: 1rem; }
        .job-card .salary { font-weight: bold; color: #28a745; margin-bottom: 1rem; }
        .job-card .location { color: #666; margin-bottom: 1rem; }
        .btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 12px 24px; border: none; border-radius: 25px; text-decoration: none; display: inline-block; }
        .btn:hover { transform: scale(1.05); }
        .cta { text-align: center; margin: 4rem auto; background: rgba(255,255,255,0.1); padding: 3rem; border-radius: 20px; backdrop-filter: blur(10px); max-width: 800px; }
        .cta h2 { color: white; margin-bottom: 1rem; }
        .cta p { color: rgba(255,255,255,0.9); font-size: 1.2rem; margin-bottom: 2rem; }
        .cta input { padding: 12px 20px; border-radius: 25px; border: none; outline: none; font-size: 1rem; margin-right: 1rem; }
        footer { background: #1a1a1a; color: white; padding: 3rem 0; text-align: center; }
        footer .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        @media (max-width: 768px) { .hero h1 { font-size: 2rem; } .jobs-grid { grid-template-columns: 1fr; } .stats { grid-template-columns: repeat(2, 1fr); } }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">Seleções Midu</div>
            <div>
                <a href="/vagas">Vagas</a>
                <a href="/empresas">Empresas</a>
                <a href="/sobre">Sobre</a>
                <a href="/portal">Portal</a>
                <a href="/admin">Admin</a>
            </div>
        </div>
    </nav>
    
    <div class="hero">
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
    
    <div style="padding: 20px;">
        <h2 style="color: white; text-align: center; margin-bottom: 3rem; font-size: 2.5rem;">Vagas em Destaque</h2>
        
        <div class="jobs-grid">
            <div class="job-card">
                <h3>Desenvolvedor Frontend Senior</h3>
                <div class="company">Tech Solutions Brasil</div>
                <div class="salary">R$ 12.000 - R$ 15.000</div>
                <div class="location">📍 São Paulo, SP • 💼 CLT • 🏠 Híbrido</div>
                <p>Buscamos um desenvolvedor frontend senior para liderar projetos inovadores usando tecnologias de ponta.</p>
                <a href="/vaga/1" class="btn" style="width: 100%; margin-top: 1rem; text-align: center;">Ver Detalhes</a>
            </div>
            
            <div class="job-card">
                <h3>Enfermeiro(a) UTI</h3>
                <div class="company">Hospital São Lucas</div>
                <div class="salary">R$ 8.000 - R$ 10.000</div>
                <div class="location">📍 Rio de Janeiro, RJ • 💼 CLT • 🏥 Presencial</div>
                <p>Procuramos profissionais de enfermagem dedicados para nossa UTI adulto.</p>
                <a href="/vaga/2" class="btn" style="width: 100%; margin-top: 1rem; text-align: center;">Ver Detalhes</a>
            </div>
            
            <div class="job-card">
                <h3>Coordenador de Marketing</h3>
                <div class="company">Digital Agency</div>
                <div class="salary">R$ 8.000 - R$ 12.000</div>
                <div class="location">📍 Curitiba, PR • 💼 CLT • 🏠 Remoto</div>
                <p>Líder para gerenciar estratégias de marketing digital da equipe.</p>
                <a href="/vaga/5" class="btn" style="width: 100%; margin-top: 1rem; text-align: center;">Ver Detalhes</a>
            </div>
        </div>
        
        <div class="cta">
            <h2>Pronto para encontrar sua próxima oportunidade?</h2>
            <p>Cadastre-se gratuitamente e receba vagas exclusivas no seu email</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <input type="email" placeholder="Seu email profissional" />
                <button class="btn">Cadastrar Grátis</button>
            </div>
        </div>
    </div>
    
    <footer>
        <div class="container">
            <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem;">Seleções Midu</h3>
                <p style="opacity: 0.7; max-width: 600px; margin: 0 auto;">
                    Conectando talentos excepcionais com empresas inovadoras através de processos seletivos eficientes e transparentes.
                </p>
            </div>
            <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; opacity: 0.7;">
                <p>&copy; 2024 Seleções Midu. Todos os direitos reservados. | Desenvolvido com Next.js 16 + Bun</p>
            </div>
        </div>
    </footer>
</body>
</html>`);
      return;
    }
    
    // Vagas page
    if (url === '/vagas') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vagas - Seleções Midu</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; }
        .navbar { background: white; padding: 1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .navbar .container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .navbar a { color: #667eea; text-decoration: none; font-weight: 500; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .filters { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-bottom: 2rem; }
        .jobs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; }
        .job-card { background: white; padding: 1.5rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.2s; }
        .job-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
        .job-card h3 { margin: 0 0 0.5rem 0; color: #1a202c; }
        .job-card .company { color: #718096; margin-bottom: 0.5rem; }
        .job-card .details { display: flex; gap: 1rem; margin-bottom: 1rem; color: #4a5568; font-size: 0.9rem; }
        .job-card .description { color: #4a5568; margin-bottom: 1rem; }
        .btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 8px; text-decoration: none; display: inline-block; }
    </style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;">Seleções Midu</div>
            <div>
                <a href="/">Início</a>
            </div>
        </div>
    </nav>
    
    <div class="container">
        <h1 style="text-align: center; margin: 2rem 0; color: #1a202c;">Encontre sua próxima oportunidade</h1>
        
        <div class="filters">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <input type="text" placeholder="Buscar vagas..." style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;" />
                <select style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <option value="">Todos os tipos</option>
                    <option value="CLT">CLT</option>
                    <option value="PJ">PJ</option>
                    <option value="Estágio">Estágio</option>
                </select>
                <select style="padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 8px;">
                    <option value="">Todas as modalidades</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Remoto">Remoto</option>
                    <option value="Híbrido">Híbrido</option>
                </select>
            </div>
        </div>
        
        <div class="jobs-grid">
            <div class="job-card">
                <h3>Desenvolvedor Frontend Senior</h3>
                <div class="company">Tech Solutions Brasil</div>
                <div class="details">
                    <span>📍 São Paulo, SP</span>
                    <span>💼 CLT</span>
                    <span>💰 R$ 12.000 - R$ 15.000</span>
                    <span>🏠 Híbrido</span>
                </div>
                <div class="description">Buscamos um desenvolvedor frontend senior para liderar projetos inovadores usando tecnologias de ponta.</div>
                <a href="/vaga/1" class="btn">Ver Detalhes</a>
            </div>
            
            <div class="job-card">
                <h3>Enfermeiro(a) UTI</h3>
                <div class="company">Hospital São Lucas</div>
                <div class="details">
                    <span>📍 Rio de Janeiro, RJ</span>
                    <span>💼 CLT</span>
                    <span>💰 R$ 8.000 - R$ 10.000</span>
                    <span>🏥 Presencial</span>
                </div>
                <div class="description">Procuramos profissionais de enfermagem dedicados para nossa UTI adulto.</div>
                <a href="/vaga/2" class="btn">Ver Detalhes</a>
            </div>
            
            <div class="job-card">
                <h3>Professor de Matemática</h3>
                <div class="company">Colégio Elite</div>
                <div class="details">
                    <span>📍 Belo Horizonte, MG</span>
                    <span>💼 CLT</span>
                    <span>💰 R$ 4.000 - R$ 6.000</span>
                    <span>🏫 Presencial</span>
                </div>
                <div class="description">Buscamos professor apaixonado por matemática para inspirar nossos alunos.</div>
                <a href="/vaga/3" class="btn">Ver Detalhes</a>
            </div>
            
            <div class="job-card">
                <h3>Vendedor Pleno</h3>
                <div class="company">Sales Force Brasil</div>
                <div class="details">
                    <span>📍 Porto Alegre, RS</span>
                    <span>💼 CLT</span>
                    <span>💰 R$ 5.000 + comissões</span>
                    <span>🏠 Remoto</span>
                </div>
                <div class="description">Oportunidade para vendedores que buscam crescimento e alto potencial.</div>
                <a href="/vaga/4" class="btn">Ver Detalhes</a>
            </div>
            
            <div class="job-card">
                <h3>Coordenador de Marketing</h3>
                <div class="company">Digital Agency</div>
                <div class="details">
                    <span>📍 Curitiba, PR</span>
                    <span>💼 CLT</span>
                    <span>💰 R$ 8.000 - R$ 12.000</span>
                    <span>🏠 Híbrido</span>
                </div>
                <div class="description">Líder para gerenciar estratégias de marketing digital da equipe.</div>
                <a href="/vaga/5" class="btn">Ver Detalhes</a>
            </div>
        </div>
    </div>
</body>
</html>`);
      return;
    }
    
    // API endpoints
    if (url === '/api/health') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        server: 'Next.js 16 + Bun'
      }));
      return;
    }
    
    if (url.startsWith('/api/jobs')) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      const jobs = [
        { id: '1', title: 'Desenvolvedor Frontend Senior', company: 'Tech Solutions Brasil', location: 'São Paulo, SP', type: 'CLT', modality: 'Híbrido', salary: 'R$ 12.000 - R$ 15.000', category: 'Tecnologia' },
        { id: '2', title: 'Enfermeiro(a) UTI', company: 'Hospital São Lucas', location: 'Rio de Janeiro, RJ', type: 'CLT', modality: 'Presencial', salary: 'R$ 8.000 - R$ 10.000', category: 'Saúde' },
        { id: '3', title: 'Professor de Matemática', company: 'Colégio Elite', location: 'Belo Horizonte, MG', type: 'CLT', modality: 'Presencial', salary: 'R$ 4.000 - R$ 6.000', category: 'Educação' },
        { id: '4', title: 'Vendedor Pleno', company: 'Sales Force Brasil', location: 'Porto Alegre, RS', type: 'CLT', modality: 'Remoto', salary: 'R$ 5.000 + comissões', category: 'Vendas' },
        { id: '5', title: 'Coordenador de Marketing', company: 'Digital Agency', location: 'Curitiba, PR', type: 'CLT', modality: 'Híbrido', salary: 'R$ 8.000 - R$ 12.000', category: 'Marketing' }
      ];
      res.end(JSON.stringify({ jobs, total: jobs.length }));
      return;
    }
    
    // Simple responses for other routes
    if (url === '/portal' || url === '/empresas' || url === '/sobre' || url === '/admin') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seleções Midu - ${url.slice(1).charAt(0).toUpperCase() + url.slice(2)}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
        .container { max-width: 600px; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .logo { font-size: 2rem; font-weight: bold; color: #667eea; margin-bottom: 1rem; }
        h1 { color: #1a202c; margin-bottom: 1rem; }
        p { color: #718096; margin-bottom: 2rem; }
        .btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 1rem 2rem; border: none; border-radius: 8px; text-decoration: none; display: inline-block; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">Seleções Midu</div>
        <h1>${url === '/portal' ? 'Portal do Candidato' : url === '/empresas' ? 'Empresas Parceiras' : url === '/sobre' ? 'Sobre Nós' : 'Painel Administrativo'}</h1>
        <p>Página ${url.slice(1)} funcionando com Next.js 16 + Bun!</p>
        <a href="/" class="btn">Voltar ao Início</a>
    </div>
</body>
</html>`);
      return;
    }
    
    // 404
    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página não encontrada - Seleções Midu</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f8fafc; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center; }
        .error-container { max-width: 500px; padding: 2rem; }
        .error-code { font-size: 6rem; font-weight: bold; color: #667eea; margin-bottom: 1rem; }
        .error-message { font-size: 1.5rem; color: #1a202c; margin-bottom: 1rem; }
        .error-description { color: #718096; margin-bottom: 2rem; }
        .btn { background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 1rem 2rem; border: none; border-radius: 8px; text-decoration: none; display: inline-block; }
    </style>
</head>
<body>
    <div class="error-container">
        <div class="error-code">404</div>
        <h1 class="error-message">Página não encontrada</h1>
        <p class="error-description">A página que você está procurando não existe.</p>
        <a href="/" class="btn">Voltar ao início</a>
    </div>
</body>
</html>`);
    
  } catch (error) {
    console.error('Server error:', error);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal server error');
  }
});

const PORT = 3000;
console.log('🚀 Seleções Midu - Servidor Next.js 16 + Bun');
console.log('   http://localhost:' + PORT);
console.log('   http://0.0.0.0:' + PORT);
console.log('');
console.log('📁 Páginas disponíveis:');
console.log('   /          - Homepage');
console.log('   /vagas     - Lista de vagas');
console.log('   /portal    - Portal candidato');
console.log('   /empresas  - Empresas');
console.log('   /sobre     - Sobre');
console.log('   /admin     - Admin');
console.log('');
console.log('🔗 APIs:');
console.log('   /api/health - Status');
console.log('   /api/jobs   - Vagas');
console.log('');
console.log('⚡ Servidor rodando com Bun!');

server.listen(PORT, '0.0.0.0', () => {
  console.log('✅ Servidor iniciado na porta ' + PORT);
});

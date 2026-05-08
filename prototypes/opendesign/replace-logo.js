const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'admin/index.html',
  'admin/login.html',
  'admin/vagas.html',
  'admin/vagas-nova.html',
  'admin/vagas-editar.html',
  'admin/candidatos.html',
  'admin/candidato-detalhes.html',
  'admin/relatorios.html',
  'portal.html',
  'portal/perfil.html',
  'portal/curriculo.html',
  'portal/candidaturas.html',
  'vagas.html',
  'vaga-detalhes.html',
  'candidatar.html',
  'candidatar-se.html',
  'midu-group-landing.html'
];

const logoImgTag = '<img src="assets/logo.png" alt="Midu Group" class="nav-logo-img">';

// Padrão regex: <svg ...> ... losango azul ... </svg>
const logoSVGPattern = /<svg\s+viewBox="0\s+0\s+40\s+40"\s+fill="none"[^>]*>[\s\S]*?<rect[^>]*fill="#2563eb"[^>]*>[\s\S]*?<path[^>]*fill="white"[^>]*>[\s\S]*?<path[^>]*fill="#2563eb"[^>]*>[\s\S]*?<\/svg>/g;

files.forEach(file => {
  const fullPath = path.join('.', file);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  if (logoSVGPattern.test(content)) {
    content = content.replace(logoSVGPattern, logoImgTag);
    console.log('✓ Trocado logo em:', file);
  } else {
    console.log('⚠️  Logo não encontrada em:', file);
  }

  fs.writeFileSync(fullPath, content);
});

console.log('\n✅ Substituição de logo concluída!');

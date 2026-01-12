/**
 * 🧪 Teste 1: Detecção Edge
 */
const fs = require('fs');

console.log('🔍 Buscando Microsoft Edge...\n');

const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.LOCALAPPDATA ? `${process.env.LOCALAPPDATA}\\Microsoft\\Edge\\Application\\msedge.exe` : null
].filter(Boolean);

let found = null;
for (const path of edgePaths) {
  if (fs.existsSync(path)) {
    found = path;
    console.log(`✅ Edge encontrado: ${path}`);
    break;
  } else {
    console.log(`❌ Não encontrado: ${path}`);
  }
}

if (!found) {
  console.log('\n❌ ERRO: Microsoft Edge não está instalado!');
  console.log('📥 Instale em: https://www.microsoft.com/edge');
  process.exit(1);
}

console.log(`\n🎯 Path: ${found}`);

// Testa se pode ser executado
const { exec } = require('child_process');
exec(`"${found}" --version`, (error, stdout, stderr) => {
  if (error) {
    console.log(`\n⚠️ Erro ao executar: ${error.message}`);
    return;
  }
  console.log(`\n📦 Versão: ${stdout.trim()}`);
  console.log('✅ Edge funcional para Playwright!\n');
});

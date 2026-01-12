/**
 * 🧪 Teste 2: Playwright + Edge Básico
 */
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('🧪 Teste Playwright + Edge Básico\n');

  // 1. Detecta Edge
  console.log('1️⃣ Detectando Edge...');
  const edgePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
  ];
  
  const edgePath = edgePaths.find(p => fs.existsSync(p));
  if (!edgePath) {
    console.log('❌ Edge não encontrado!');
    process.exit(1);
  }
  console.log(`✅ Edge: ${edgePath}\n`);

  // 2. Inicia browser
  console.log('2️⃣ Iniciando Playwright...');
  const browser = await chromium.launch({
    headless: false,
    channel: 'msedge',
    executablePath: edgePath,
    viewport: { width: 1920, height: 1080 },
    locale: 'pt-BR',
    args: ['--no-sandbox']
  });
  console.log('✅ Browser iniciado!\n');

  // 3. Cria página
  console.log('3️⃣ Criando página...');
  const page = await browser.newPage();
  console.log('✅ Página criada!\n');

  // 4. Navega
  console.log('4️⃣ Navegando para example.com...');
  await page.goto('https://example.com', { waitUntil: 'load', timeout: 30000 });
  const title = await page.title();
  console.log(`✅ Página carregada: ${title}\n`);

  // 5. Extrai conteúdo
  console.log('5️⃣ Extraindo conteúdo...');
  const text = await page.innerText('h1');
  console.log(`✅ Título H1: ${text}\n`);

  // 6. Screenshot
  console.log('6️⃣ Tirando screenshot...');
  await page.screenshot({ path: 'test-edge-screenshot.png' });
  console.log('✅ Screenshot salvo: test-edge-screenshot.png\n');

  // 7. Fecha
  console.log('7️⃣ Fechando browser...');
  await browser.close();
  console.log('✅ Teste concluído com sucesso!\n');
})();

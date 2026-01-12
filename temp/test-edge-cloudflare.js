/**
 * 🧪 Teste 3: Playwright + Edge + Cloudflare
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🧪 Teste Playwright + Edge + Cloudflare\n');
  const url = process.argv[2] || 'https://grok.com';

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
    timezoneId: 'America/Sao_Paulo',
    args: ['--no-sandbox', '--disable-blink-features=AutomationControlled']
  });
  console.log('✅ Browser iniciado!\n');

  // 3. Cria página
  console.log('3️⃣ Criando página...');
  const page = await browser.newPage();
  console.log('✅ Página criada!\n');

  // 4. Anti-detection
  console.log('4️⃣ Configurando anti-detection...');
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
    Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR', 'pt', 'en-US', 'en'] });
    window.chrome = { runtime: {} };
  });
  console.log('✅ Anti-detection configurado!\n');

  // 5. Navega
  console.log('5️⃣ Navegando para:', url);
  try {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    console.log('✅ Página carregada!\n');
  } catch (e) {
    console.log(`⚠️ Erro na navegação: ${e.message}`);
    console.log('Continuando mesmo assim...\n');
  }

  // 6. Aguarda Cloudflare
  console.log('6️⃣ Aguardando Cloudflare resolver...');
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 1000));
    
    const title = await page.title();
    const currentUrl = page.url();
    
    if (!title.includes('Just a moment') && 
        !title.includes('Cloudflare') && 
        !currentUrl.includes('__cf_chl')) {
      console.log(`✅ Cloudflare resolvido! Título: ${title}\n`);
      break;
    }
    
    if (i % 10 === 0 && i > 0) {
      console.log(`   ⏳ ${i}s esperando...`);
    }
  }

  // 7. Aguarda React/Next.js
  console.log('7️⃣ Aguardando JavaScript carregar...');
  await new Promise(r => setTimeout(r, 3000));
  console.log('✅ JS carregado!\n');

  // 8. Scroll
  console.log('8️⃣ Rolando página...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 2000));
  console.log('✅ Scroll realizado!\n');

  // 9. Extrai conteúdo
  console.log('9️⃣ Extraindo conteúdo...');
  const html = await page.content();
  const text = await page.innerText('body');
  const title = await page.title();
  
  console.log(`✅ HTML: ${html.length} bytes`);
  console.log(`✅ Texto: ${text.length} caracteres`);
  console.log(`✅ Título: ${title}\n`);

  // 10. Salva artefatos
  console.log('🔟 Salvando artefatos...');
  const outputDir = path.join(__dirname, 'captures');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  const timestamp = Date.now();
  const basename = `edge-cloudflare-${timestamp}`;
  
  fs.writeFileSync(path.join(outputDir, `${basename}.html`), html);
  fs.writeFileSync(path.join(outputDir, `${basename}.txt`), text);
  fs.writeFileSync(path.join(outputDir, `${basename}.json`), JSON.stringify({
    url,
    title,
    timestamp: new Date().toISOString(),
    stats: { htmlSize: html.length, textSize: text.length }
  }, null, 2));
  
  await page.screenshot({ path: path.join(outputDir, `${basename}.png`), fullPage: true });
  
  console.log(`✅ HTML: ${basename}.html`);
  console.log(`✅ TXT: ${basename}.txt`);
  console.log(`✅ JSON: ${basename}.json`);
  console.log(`✅ PNG: ${basename}.png\n`);

  // 11. Fecha
  console.log('1️⃣1️⃣ Fechando browser...');
  await browser.close();
  console.log('✅ Teste concluído com sucesso!\n');
})();

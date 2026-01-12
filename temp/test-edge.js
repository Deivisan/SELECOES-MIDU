/**
 * Teste simples de Playwright + Edge
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  console.log('🚀 Iniciando Edge...');
  
  const browser = await chromium.launch({
    headless: false,
    channel: 'msedge',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  });
  
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo'
  });
  
  const page = await context.newPage();
  
  // Anti-detection
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'webdriver', { get: () => false });
    window.chrome = { runtime: {} };
  });
  
  console.log('🌐 Navegando para URL...');
  await page.goto('https://grok.com/share/c2hhcmQtMg_6dd55899-b70b-4eee-93b4-8266010f646d', {
    waitUntil: 'load',
    timeout: 60000
  });
  
  console.log('✅ Página carregada!');
  console.log('⏳ Aguardando Cloudflare...');
  
  // Aguarda Cloudflare resolver
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 1000));
    const title = await page.title();
    const url = page.url();
    
    if (!title.includes('Just a moment') && !title.includes('Cloudflare') && !url.includes('__cf_chl')) {
      console.log(`✅ Cloudflare resolvido! Título: ${title}`);
      break;
    }
    
    if (i % 10 === 0 && i > 0) {
      console.log(`   ⏳ ${i}s esperando...`);
    }
  }
  
  // Scroll para carregar mais conteúdo
  console.log('📜 Rolando página...');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 3000));
  
  // Extrai texto
  console.log('🔍 Extraindo conteúdo...');
  const content = await page.content();
  const text = await page.innerText('body');
  
  // Salva
  const outputDir = path.join(__dirname, 'captures');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
  
  const timestamp = Date.now();
  
  fs.writeFileSync(path.join(outputDir, `grok-${timestamp}.html`), content);
  fs.writeFileSync(path.join(outputDir, `grok-${timestamp}.txt`), text);
  fs.writeFileSync(path.join(outputDir, `grok-${timestamp}.json`), JSON.stringify({
    url: 'https://grok.com/share/c2hhcmQtMg_6dd55899-b70b-4eee-93b4-8266010f646d',
    timestamp: new Date().toISOString(),
    length: text.length
  }, null, 2));
  
  console.log(`✅ Arquivos salvos em: ${outputDir}`);
  console.log(`   HTML: grok-${timestamp}.html`);
  console.log(`   TXT: grok-${timestamp}.txt`);
  console.log(`   JSON: grok-${timestamp}.json`);
  
  // Screenshot
  await page.screenshot({ path: path.join(outputDir, `grok-${timestamp}.png`), fullPage: true });
  console.log(`   PNG: grok-${timestamp}.png`);
  
  await browser.close();
  console.log('✅ Concluído!');
})();

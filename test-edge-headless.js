const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  console.log('🧪 Teste Playwright + Edge (Headless)\n');

  // Detecta Edge
  const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  console.log(`✅ Edge: ${edgePath}\n`);

  // Inicia browser em modo headless
  console.log('🚀 Iniciando browser (headless)...');
  const browser = await chromium.launch({
    headless: true,
    channel: 'msedge',
    executablePath: edgePath,
    viewport: { width: 1920, height: 1080 }
  });
  console.log('✅ Browser iniciado!\n');

  // Navega
  const page = await browser.newPage();
  console.log('🌐 Navegando para example.com...');
  await page.goto('https://example.com', { waitUntil: 'load' });
  const title = await page.title();
  console.log(`✅ Página: ${title}\n`);

  // Fecha
  await browser.close();
  console.log('✅ Teste concluído!\n');
})();

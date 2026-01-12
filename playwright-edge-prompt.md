# 🎭 Prompt: Playwright + Microsoft Edge

## Contexto
Você é um especialista em automação web com Playwright. Objetivo: configurar e executar scripts de scraping usando Microsoft Edge instalado no Windows.

## Requisitos

### 1. Detecção Automática do Edge
Antes de qualquer ação, detectar se Edge está disponível:
```javascript
const edgePaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
];

const edgePath = edgePaths.find(p => fs.existsSync(p));
if (!edgePath) {
  throw new Error('Microsoft Edge não encontrado no sistema!');
}
console.log(`✅ Edge detectado: ${edgePath}`);
```

### 2. Configuração Playwright
Usar configuração mínima para evitar conflitos:
```javascript
const { chromium } = require('playwright');

const browser = await chromium.launch({
  headless: false, // Importante: headless=false para Edge
  channel: 'msedge',
  executablePath: edgePath, // Caminho absoluto detectado
  viewport: { width: 1920, height: 1080 },
  locale: 'pt-BR',
  args: [
    '--no-sandbox',
    '--disable-blink-features=AutomationControlled'
  ]
});
```

### 3. Anti-Detection Cloudflare
Injeção de scripts ANTES de navegar:
```javascript
const page = await browser.newPage();

await page.addInitScript(() => {
  // Remove sinal de automação
  Object.defineProperty(navigator, 'webdriver', { get: () => false });
  
  // Simula plugins
  Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3, 4, 5] });
  
  // Simula línguas
  Object.defineProperty(navigator, 'languages', { get: () => ['pt-BR', 'pt', 'en-US', 'en'] });
  
  // Cria objeto chrome falso
  window.chrome = { runtime: {} };
});
```

### 4. Navegação com Tratamento de Erros
```javascript
try {
  await page.goto(url, {
    waitUntil: 'load', // Usa 'load' em vez de 'commit'
    timeout: 60000
  });
  console.log('✅ Página carregada');
} catch (error) {
  console.log(`⚠️ Erro na navegação: ${error.message}`);
  // Continua mesmo com erro
}
```

### 5. Loop de Espera Cloudflare
```javascript
// Aguarda até Cloudflare resolver (max 60s)
for (let i = 0; i < 60; i++) {
  await new Promise(r => setTimeout(r, 1000));
  
  const title = await page.title();
  const url = page.url();
  
  // Verifica se passou do Cloudflare
  if (!title.includes('Just a moment') &&
      !title.includes('Cloudflare') &&
      !url.includes('__cf_chl')) {
    console.log(`✅ Cloudflare resolvido! Título: ${title}`);
    break;
  }
  
  if (i % 10 === 0 && i > 0) {
    console.log(`   ⏳ ${i}s esperando Cloudflare...`);
  }
}
```

### 6. Extração de Conteúdo
```javascript
// Aguarda React/Next.js hidratar
await new Promise(r => setTimeout(r, 3000));

// Scroll para carregar mais conteúdo
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 2000));

// Extrai HTML e texto
const html = await page.content();
const text = await page.innerText('body');

console.log(`📊 HTML: ${html.length} bytes`);
console.log(`📊 Texto: ${text.length} chars`);
```

## Debug e Logs

### Adicionar logs em cada etapa:
1. ✅ Detecção Edge
2. ✅ Browser launch
3. ✅ Navegação
4. ✅ Cloudflare resolved
5. ✅ Conteúdo extraído
6. ✅ Arquivos salvos

### Tratamento de erros:
- Timeout: log + continua
- Browser crash: log + relaunch
- Empty content: log + salva HTML raw

## Workflow Completo

```javascript
async function scrapeWithEdge(url) {
  // 1. Detecta Edge
  const edgePath = detectEdge();
  
  // 2. Inicia browser
  const browser = await chromium.launch({
    channel: 'msedge',
    executablePath: edgePath,
    headless: false
  });
  
  // 3. Configura anti-detection
  const page = await browser.newPage();
  await setupAntiDetection(page);
  
  // 4. Navega e aguarda Cloudflare
  await page.goto(url, { waitUntil: 'load' });
  await waitForCloudflare(page);
  
  // 5. Extrai conteúdo
  const content = await extractContent(page);
  
  // 6. Salva artefatos
  await saveArtifacts(content);
  
  // 7. Fecha browser
  await browser.close();
}
```

## Comandos de Teste

```bash
# Teste simples de detecção
bun test-edge-detect.js

# Teste de navegação básica
bun test-edge-nav.js

# Teste de scraping completo
bun scrape-edge.js <URL>
```

## Checklist

- [ ] Edge detectado automaticamente
- [ ] Browser abre com sucesso
- [ ] Anti-detection configurado
- [ ] Cloudflare resolvido automaticamente
- [ ] Conteúdo extraído corretamente
- [ ] Arquivos salvos (HTML, TXT, JSON, PNG)
- [ ] Logs claros em cada etapa

---

**Versão:** 1.0
**Status:** Playwright + Edge funcional
**Autor:** Deivison Santana

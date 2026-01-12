# 📝 scrape.js - Bloco a Bloco Comentado

Este documento explica cada seção do scrape.js linha por linha.

---

## 1️⃣ IMPORTAÇÕES (Linhas 11-13)

```javascript
const fs = require('fs');
const path = require('path');
const { URL } = require('url');
```

**OBJETIVO:** Importar módulos nativos do Node.js para manipulação de arquivos e URLs.
- `fs` - Manipulação de arquivos (ler/escrever)
- `path` - Manipulação de caminhos (Windows/Unix)
- `URL` - Parse e validação de URLs

---

## 2️⃣ DETECÇÃO DE ENGINES (Linhas 15-42)

### canUsePlaywright() (Linhas 20-29)
```javascript
function canUsePlaywright() {
  try {
    playwrightChromium = require('playwright-core').chromium;
    return true;
  } catch (_) {
    return false;
  }
}
```

**ATIVA QUANDO:** 
- Playwright-core está instalado
- Script precisa usar Chromium

**LINHA CHAVE:** `playwrightChromium = require('playwright-core').chromium`
- Carrega módulo Playwright Core
- Exporta Chromium engine

### canUsePuppeteer() (Linhas 31-42)
```javascript
function canUsePuppeteer() {
  try {
    puppeteer = require('puppeteer-extra');
    StealthPlugin = require('puppeteer-extra-plugin-stealth');
    return true;
  } catch (e) {
    console.log('⚠️ puppeteer-extra não disponível:', e.message);
    return false;
  }
}
```

**ATIVA QUANDO:**
- puppeteer-extra está instalado
- puppeteer-extra-plugin-stealth está instalado

**LINHA CHAVE:** `puppeteer.use(StealthPlugin())`
- Aplica plugin anti-detectação
- Bypass Cloudflare/Turnstile

---

## 3️⃣ DETECÇÃO DE AMBIENTE (Linhas 44-46)

```javascript
const TERMUX_CHROMIUM_PATH = '/data/data/com.termux/files/usr/bin/chromium-browser';
const IS_TERMUX = fs.existsSync(TERMUX_CHROMIUM_PATH);
```

**OBJETIVO:** Detectar se está rodando no Android (Termux) ou Desktop (Windows/Linux)
- Termux: Usa Chromium nativo
- Desktop: Usa Edge/Chrome instalado

**LINHA CHAVE:** `IS_TERMUX = fs.existsSync(TERMUX_CHROMIUM_PATH)`
- Verifica se arquivo existe
- Define comportamento todo o script

---

## 4️⃣ CONFIGURAÇÃO (Linhas 48-87)

### CONFIG geral (Linhas 49-53)
```javascript
const CONFIG = {
  targetUrl: process.argv[2],
  outputDir: path.resolve(process.cwd(), 'captures'),
  scroll: { enabled: true, delay: 1500, maxScrolls: 50 },
  engine: process.env.SCRAPE_ENGINE || 'auto',
```

**EXPLICAÇÃO:**
- `targetUrl` - URL para scrape (passa como argumento)
- `outputDir` - Diretório `captures/` onde salvar
- `scroll.enabled` - Ativa scroll automático
- `scroll.delay` - 1.5s entre scrolls (esperar JS carregar)
- `scroll.maxScrolls` - Máximo 50 scrolls
- `engine` - Engine escolhida (auto/playwright/puppeteer)

### launchOptions (Linhas 56-73)
```javascript
launchOptions: {
  headless: false,  // ← IMPORTANTE: abre janela visível
  executablePath: IS_TERMUX ? TERMUX_CHROMIUM_PATH : 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  channel: 'msedge',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-blink-features=AutomationControlled',  // ← REMOVE sinal de automação
    '--disable-features=IsolateOrigins,site-per-process',
    '--disable-site-isolation-trials',
    '--disable-web-security',
    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...'
  ]
}
```

**LINHAS CHAVE PARA ATIVAR/DESATIVAR:**
1. `headless: false` → `true` (modo invisível)
2. `executablePath` → `null` (usar browser padrão)
3. `args` → `[]` (sem flags especiais)

### selectors (Linhas 76-86)
```javascript
selectors: {
  containers: [
    '[data-testid^="message-"]', 
    '[role="article"]', 
    '.message-row', 
    '.message', 
    'div[class*="message"]'
  ],
  codeBlocks: ['pre', 'code', 'div[class*="code-block"]'],
  timestamp: 'time'
}
```

**OBJETIVO:** Definir CSS selectors para extrair conteúdo
- `containers` - Onde estão as mensagens
- `codeBlocks` - Onde estão blocos de código
- `timestamp` - Onde está a data/hora

**PARA ADAPTAR:**
- Adicionar novos selectors ao array `containers`
- Modificar `codeBlocks` para diferentes sintaxes

---

## 5️⃣ HELPERS (Linhas 89-110)

### getMetadata() (Linhas 91-110)
```javascript
function getMetadata(url) {
  const timestamp = new Date().toISOString();
  let uuid = `capture_${Date.now()}`;
  
  if (url) {
    try {
      const urlObj = new URL(url);
      const parts = urlObj.pathname.split('/').filter(p => p.length > 0);
      if (parts.length > 0) uuid = parts[parts.length - 1];
    } catch (e) {}
  }
  
  return {
    uuid,
    sourceUrl: url,
    capturedAt: timestamp,
    environment: IS_TERMUX ? 'Termux' : 'Desktop',
    engine: null
  };
}
```

**OBJETIVO:** Gerar UUID único e metadados da captura
- Se URL tem ID na pathname, usa como UUID
- Se não, usa timestamp como UUID
- Ambiente: Termux ou Desktop

---

## 6️⃣ EXTRAÇÃO (Linhas 112-158)

### identifySpeaker() (Linhas 118-135)
```javascript
function identifySpeaker(text, elementHTML, prevSpeaker) {
  const lowerText = text.toLowerCase();
  const html = elementHTML.toLowerCase();
  
  // 1. Sinais Visuais
  if (html.includes('user') || html.includes('human')) return 'User';
  if (html.includes('ai-') || html.includes('bot')) return 'AI';
  
  // 2. Heurística Conteúdo
  if (lowerText.startsWith('olá') || lowerText.includes('crie um código')) return 'User';
  if (lowerText.includes('claro, aqui está')) return 'AI';
  
  // 3. Alternância
  if (prevSpeaker === 'AI') return 'User';
  if (prevSpeaker === 'User') return 'AI';
  
  return 'Unknown';
}
```

**OBJETIVO:** Identificar quem está falando (User/AI/System)
- Prioridade 1: Classes HTML (mais confiável)
- Prioridade 2: Padrões de texto
- Prioridade 3: Alternância User/AI

### extractIntents() (Linhas 140-158)
```javascript
function extractIntents(text, author) {
  if (author !== 'User') return {};
  
  const intents = {
    files: [],
    commands: [],
    search: []
  };
  
  // Detectar criação/edição de arquivos
  const fileMatch = text.match(/(?:crie|edite|gere)\s+["']?([\w\-\.\/]+\.\w+)["']?/i);
  if (fileMatch) intents.files.push({ action: 'edit/create', path: fileMatch[1] });
  
  // Detectar comandos de terminal
  const cmdMatch = text.match(/(?:rode|execute)\s*[`"']([^`"']+)["`']/i);
  if (cmdMatch) intents.commands.push(cmdMatch[1]);
  
  return intents;
}
```

**OBJETIVO:** Identificar ações que o User quer executar
- `files` - Caminhos de arquivos para criar/alterar
- `commands` - Comandos de terminal para executar
- `search` - Buscas que usuário quer fazer

---

## 7️⃣ NÚCLEO - Salvar Artefatos (Linhas 160-239)

### saveArtifacts() (Linhas 171-211)
```javascript
const saveArtifacts = async ({ structuredData, rawMessages, htmlDump, screenshotBuffer }) => {
  if (!fs.existsSync(CONFIG.outputDir)) fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  
  // Salva JSON com metadata + conversa estruturada
  const jsonPath = path.join(CONFIG.outputDir, `${metadata.uuid}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify({...}, null, 2));
  
  // Salva Markdown legível
  let mdContent = `# 📝 Captura: ${metadata.uuid}\n\n...`;
  const mdPath = path.join(CONFIG.outputDir, `${metadata.uuid}.md`);
  fs.writeFileSync(mdPath, mdContent);
  
  // Salva HTML completo
  const htmlPath = path.join(CONFIG.outputDir, `${metadata.uuid}.html`);
  if (htmlDump) fs.writeFileSync(htmlPath, htmlDump);
  
  // Salva screenshot
  const pngPath = path.join(CONFIG.outputDir, `${metadata.uuid}.png`);
  if (screenshotBuffer) fs.writeFileSync(pngPath, screenshotBuffer);
  
  console.log(`✅ Sucesso!\n   JSON: ${jsonPath}\n   MD:   ${mdPath}`);
};
```

**OBJETIVO:** Salvar todos os formatos de captura
- `.json` - Estruturado para processamento
- `.md` - Legível para humanos
- `.html` - Completo para debug
- `.png` - Screenshot visual

**LINHAS CHAVE:**
1. `fs.writeFileSync(jsonPath, ...)` - Salva JSON
2. `fs.writeFileSync(mdPath, ...)` - Salva Markdown
3. `fs.writeFileSync(htmlPath, ...)` - Salva HTML
4. `fs.writeFileSync(pngPath, ...)` - Salva PNG

---

## 8️⃣ NÚCLEO - Extração DOM (Linhas 241-291)

### extractRawMessages() (Linhas 241-271)
```javascript
const extractRawMessages = async (page) => {
  return page.eva

# 🧪 Prompt: Continuação do Desenvolvimento - SELECOES-MIDU

## Contexto Atual

### Repositório SELECOES-MIDU
- **URL:** https://github.com/Deivisan/SELECOES-MIDU
- **Status:** Público
- **Função:** Workspace de Capturas para Desenvolvimento

### Workflow Estabelecido
1. **Captura:** Usar `scrape.js` para capturar conversas/interações IA
2. **Análise:** IA lê a captura e entende contexto
3. **Desenvolvimento:** Criar/modificar scripts baseado na captura
4. **Documentação:** Commitar com referência à captura

### Link Inicial (Grok)
- **URL:** https://grok.com/share/c2hhcmQtMg_6dd55899-b70b-4eee-93b4-8266010f646d
- **Status:** ⏳ Captura pendente
- **Problema:** Microsoft Edge detectado, mas não responde ao Playwright

---

## 🎯 Sua Tarefa

### Prioridade 1: Resolver Edge + Playwright

**Problema Atual:**
```javascript
// Edge é detectado corretamente
✅ Edge: C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe

// Mas ao iniciar Playwright
🚀 Iniciando Playwright...
[TRAVA - SEM RESPOSTA]
```

**Possíveis Causas:**
1. Perfil do Edge em uso (janela aberta)
2. Conflito entre `channel: 'msedge'` e `executablePath`
3. Playwright não consegue comunicar com Edge instalado

**Soluções a Testar:**

#### Opção A: Usar Perfil Separado (Recomendada)
```javascript
// Remover executablePath, usar channel apenas
const browser = await chromium.launchPersistentContext(
  path.join(process.cwd(), 'chrome-profile-scrape'),
  {
    headless: false,
    channel: 'msedge', // ← Isso usa Edge instalado
    viewport: { width: 1920, height: 1080 },
    locale: 'pt-BR',
    args: ['--no-sandbox']
  }
);
```

#### Opção B: Fechar Edge Antes de Executar
```javascript
// Executar antes de lançar Playwright
const { exec } = require('child_process');
exec('taskkill /F /IM msedge.exe', (err) => {
  if (err && !err.message.includes('not found')) {
    console.log('⚠️ Erro ao fechar Edge:', err.message);
  }
  // Continua mesmo se não encontrou processo
});

// Esperar 2 segundos
await new Promise(r => setTimeout(r, 2000));

// Depois iniciar browser
const browser = await chromium.launch({...});
```

#### Opção C: Usar Chromium Padrão
```javascript
// Não especificar channel ou executablePath
const browser = await chromium.launch({
  headless: false,
  // Playwright usa Chromium embutido
});
```

### Prioridade 2: Capturar Link do Grok

Após resolver Edge + Playwright:
1. Executar scrape.js no link do Grok
2. Salvar captura em `captures/c2hhcmQtMg_6dd55899...`
3. Analisar conteúdo da conversa
4. Criar scripts necessários baseado na análise

### Prioridade 3: Documentar scrape.js

**Objetivo:** Adicionar comentários detalhados explicando cada bloco de código

**Exemplo de comentário:**
```javascript
// ============================================================
// BLOCO 1: DETECÇÃO DE ENGINES
// ============================================================
// Verifica se Playwright ou Puppeteer estão instalados
// Playwright é priorizado no Windows + Edge
// ============================================================

function canUsePlaywright() {
  try {
    playwrightChromium = require('playwright-core').chromium;
    return true;
  } catch (_) {
    return false;
  }
}
```

**Linhas a comentar:**
1. Linha 16-29: Detecção Playwright
2. Linha 31-42: Detecção Puppeteer
3. Linha 44-46: Detecção ambiente (Termux/Windows)
4. Linha 48-73: Configuração launch options
5. Linha 75-86: Seletores de extração
6. Linha 89-110: Helper metadata
7. Linha 112-159: Helpers de extração (identifySpeaker, extractIntents)
8. Linha 160-239: Núcleo de extração
9. Linha 241-271: Extrair mensagens do DOM
10. Linha 273-291: Helper scroll
11. Linha 293-434: Puppeteer Stealth
12. Linha 436-577: Playwright
13. Linha 579-624: Puppeteer padrão
14. Linha 626-658: Lógica de seleção de engine

---

## 🔄 Workflow de Trabalho

### Quando Chegar uma Nova Tarefa

1. **Verificar se tem captura relacionada:**
   ```bash
   ls -la captures/ | grep <palavra-chave>
   ```

2. **Se NÃO tiver captura:**
   - Usar scrape.js para capturar contexto
   - Salvar em `captures/`
   - Analisar conteúdo

3. **Se JÁ tiver captura:**
   - Ler a captura (`.md` ou `.json`)
   - Entender contexto da conversa
   - Desenvolver baseado no entendimento

4. **Documentar mudanças:**
   ```bash
   git add .
   git commit -m "<ação> based on capture <ID>"
   git push
   ```

---

## 📁 Estrutura de Arquivos

### captures/ (Pasta de Capturas)
```
captures/
├── c2hhcmQtMg_<timestamp>.json  # Dados estruturados
├── c2hhcmQtMg_<timestamp>.md    # Markdown legível
├── c2hhcmQtMg_<timestamp>.html  # HTML completo
└── c2hhcmQtMg_<timestamp>.png   # Screenshot
```

### scripts/ (Scripts de Trabalho)
```
scripts/
├── scrape.js           # Script principal scraping
├── test-*.js           # Testes unitários
└── utils/              # Funções auxiliares
```

### docs/ (Documentação)
```
docs/
├── playwright-edge-prompt.md    # Prompt técnico
├── STATUS-PLAYWRIGHT.md        # Status detalhado
└── <função>-PROMPT.md        # Prompts específicos
```

---

## 🎯 Objetivos

### Curto Prazo (Hoje)
- [ ] Resolver Edge + Playwright
- [ ] Capturar link do Grok
- [ ] Analisar conteúdo da conversa
- [ ] Documentar scrape.js completamente

### Médio Prazo (Esta Semana)
- [ ] Criar estrutura `utils/`
- [ ] Implementar testes automatizados
- [ ] Capturar mais conversas relevantes
- [ ] Criar script `clean-captures.js`

### Longo Prazo (Este Mês)
- [ ] Ter 10+ capturas analisadas
- [ ] Criar biblioteca de funções reutilizáveis
- [ ] Documentar todos os workflows
- [ ] Criar package.json com scripts de dev

---

## 💡 Dicas Importantes

### SEMPRE:
1. **Capturar antes de codar** - Contexto é rei
2. **Ler a captura inteira** - Não pular partes
3. **Identificar requisitos** - O que a IA pediu?
4. **Testar antes de commitar** - Validação é crucial
5. **Documentar mudanças** - Futuro você agradece

### NUNCA:
1. Criar código sem entender contexto
2. Pular etapas de análise
3. Commitar sem testar
4. Deixar código sem comentários
5. Ignorar erros no log

---

## 🔗 Links Importantes

- **SELECOES-MIDU:** https://github.com/Deivisan/SELECOES-MIDU
- **Metodologia Scrappy:** Metodologia-Scrape.md neste repo
- **Prompt Playwright:** playwright-edge-prompt.md neste repo
- **Status Edge:** STATUS-PLAYWRIGHT.md neste repo
- **Link Inicial Grok:** https://grok.com/share/c2hhcmQtMg_6dd55899-b70b-4eee-93b4-8266010f646d

---

**Versão:** 1.0
**Contexto:** Continuação do desenvolvimento SELECOES-MIDU
**Autor:** Deivison Santana (@deivisan)
**Data:** 12/01/2026

# 📐 SELECOES-MIDU - Metodologia Scrappy + Workspace de Capturas

## 🎯 Conceito

Este repositório serve como **Workspace Centralizado** para desenvolvimento via Capturas (Scrapping). Toda criação de scripts, ferramentas e documentação deve ser feita **mediante captura prévia** de conversas/interações com IA.

---

## 🔄 Workflow Principal

### Etapa 1: Captura com Metodologia Scrappy
Antes de qualquer desenvolvimento, capturar a conversa/interação:
```bash
cd SELECOES-MIDU
bun scrape.js <URL_DO_CHAT>
```

**Output gerado:**
- `captures/c2hhcmQtMg_xxx.json` - Dados estruturados
- `captures/c2hhcmQtMg_xxx.md` - Markdown formatado
- `captures/c2hhcmQtMg_xxx.html` - HTML completo
- `captures/c2hhcmQtMg_xxx.png` - Screenshot

### Etapa 2: Análise da Captura
IA (DevSan/DevSan Max) lê a captura e:
1. Identifica blocos de código
2. Detecta comandos de terminal
3. Entende o contexto completo da conversa
4. Identifica requisitos técnicos

### Etapa 3: Desenvolvimento no Workspace
APÓS análise da captura, IA cria/altera scripts:
```bash
cd SELECOES-MIDU
# Scripts criados/modificados aqui
bun run <script>
```

**Arquivos de desenvolvimento:**
- `scrape.js` - Script de scraping principal
- `test-*.js` - Testes unitários
- `utils/` - Funções auxiliares
- `playwright-edge-prompt.md` - Prompts técnicos

### Etapa 4: Documentação
Toda alteração deve ser documentada:
```bash
git add .
git commit -m "Descreve mudança baseada em captura c2hhcmQtMg_xxx"
git push
```

---

## 📋 Regras do Workspace

### ✅ SEMPRE FAZER
1. **Capturar antes de codar** - Usar scrape.js em toda URL
2. **Commitar com referência** - Incluir ID da captura no commit message
3. **Documentar** - Atualizar READMEs e STATUS-*
4. **Testar** - Scripts de teste devem ser executados antes de commitar

### ❌ NUNCA FAZER
1. Criar código sem captura prévia
2. Commitar sem documentação
3. Alterar scrape.js sem testar
4. Deixar código sem comentários

---

## 🎓 Link Inicial (Grok)

**Conversa inicial que gerou este workflow:**
- URL: https://grok.com/share/c2hhcmQtMg_6dd55899-b70b-4eee-93b4-8266010f646d
- Status: ⏳ Captura pendente (Edge travando)

---

## 📂 Estrutura do Repo

```
SELECOES-MIDU/
├── README.md                    # Este arquivo
├── STATUS-PLAYWRIGHT.md        # Status detalhado Playwright + Edge
├── playwright-edge-prompt.md     # Prompt técnico para IA
├── Metodologia-Scrape.md       # Metodologia de scraping
├── scrape.js                   # Script principal (documentado)
├── test-*.js                  # Testes unitários
├── captures/                   # 📦 Todas as capturas aqui
│   ├── c2hhcmQtMg_*.json     # Dados estruturados
│   ├── c2hhcmQtMg_*.md       # Markdowns
│   ├── c2hhcmQtMg_*.html     # HTMLs brutos
│   └── c2hhcmQtMg_*.png     # Screenshots
└── .git/                      # Controle de versão
```

---

## 🔧 Como Contribuir

### Workflow Padrão
```bash
# 1. Capturar conversa
bun scrape.js <URL>

# 2. Analisar captura
# (IA lê captures/c2hhcmQtMg_xxx.md)

# 3. Desenvolver/scriptar
# (IA cria/altera scripts baseado na captura)

# 4. Testar
bun test-*.js

# 5. Documentar e commitar
git add .
git commit -m "Implements X based on capture c2hhcmQtMg_xxx"
git push
```

### Naming Convention
- **Capturas:** `c2hhcmQtMg_<timestamp>.<ext>`
- **Testes:** `test-<funcionalidade>.js`
- **Scripts:** `<descrição>.js` (ex: `scrape-edge.js`)
- **Docs:** `<NOME>-PROMPT.md`, `<NOME>-STATUS.md`

---

## 🎯 Próximas Tarefas

### Prioridade Alta (Edge + Playwright)
- [ ] Resolver travamento Edge com Playwright
- [ ] Testar `launchPersistentContext` com perfil separado
- [ ] Implementar teste Cloudflare completo
- [ ] Capturar link inicial do Grok (c2hhcmQtMg_6dd55899...)

### Prioridade Média (Workspace)
- [ ] Criar estrutura `utils/` para funções auxiliares
- [ ] Implementar testes automatizados
- [ ] Documentar cada função do scrape.js

### Prioridade Baixa (Organização)
- [ ] Criar script `clean-captures.js` para limpeza
- [ ] Adicionar `package.json` com scripts de desenvolvimento
- [ ] Criar CONTRIBUTING.md

---

## 🔐 Segurança

### ⚠️ AVISO IMPORTANTE
- **NUNCA** commitar tokens, senhas ou dados sensíveis no SELECOES-MIDU
- Dados sensíveis vão para **DevBank** (repo privado)
- Este repo é **PÚBLICO** e não contém dados pessoais

### Dados Sensíveis (DevBank)
- Tokens de API
- Senhas de serviços
- Credenciais de banco
- Chaves privadas
- Dados pessoais

---

## 📊 Status Atual

| Componente | Status |
|------------|--------|
| Repo criado | ✅ |
| Metodologia Scrappy | ✅ |
| scrape.js | ✅ |
| Prompt Playwright | ✅ |
| Testes Edge | ⚠️ Detecção OK, execução falhando |
| Captura inicial Grok | ⏳ Pendente (Edge trava) |
| Workspace ativo | ✅ |

---

## 📝 Notas para Próxima IA

**Contexto de Desenvolvimento:**
1. Edge é detectado em `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`
2. Playwright abre Edge visivelmente, mas não executa comandos
3. Possível conflito com perfil existente em uso
4. Precisa testar `launchPersistentContext` com perfil separado em `SELECOES-MIDU/chrome-profile-scrape/`

**Solução Sugerida:**
1. Usar `chromium.launchPersistentContext()` ao invés de `launch()`
2. Criar perfil separado para scraping
3. Fechar todas instâncias Edge antes de executar
4. Testar com `channel: 'msedge'` sem `executablePath`

---

**Autor:** Deivison Santana (@deivisan)
**Repo:** https://github.com/Deivisan/SELECOES-MIDU
**Status:** Público - Workspace de Capturas para Desenvolvimento
**Última atualização:** 12/01/2026

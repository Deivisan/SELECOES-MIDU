# 📐 SELECOES-MIDU - Metodologia Scrappy

Metodologia de extração e estruturação de dados para automação com IA, baseada na captura rápida de contexto web e transformação em dados semânticos.

## 📋 Arquivos

### Metodologia-Scrape.md
Documentação completa da metodologia de scraping, incluindo:
- Princípios fundamentais (Contexto, Agnosticismo, Resiliência)
- Estrutura de dados (Schema JSON)
- Fluxo de trabalho com agentes

### scrape.js
Script universal v6.0 para extração de dados estruturados:
- Compatível com Android (Termux) e Desktop
- Suporta Playwright e Puppeteer (com stealth)
- Bypass anti-detectação Cloudflare
- Output em JSON + Markdown + HTML + Screenshots

## 🎯 Uso

```bash
# Clonar repo
git clone https://github.com/Deivisan/SELECOES-MIDU.git
cd SELECOES-MIDU

# Instalar dependências
bun install

# Executar scrape
node scrape.js <URL>
```

## 🔧 Tecnologias

- Node.js/Bun runtime
- Playwright (headless automation)
- Puppeteer-extra (stealth plugin)
- JSON estruturado para agentes IA

## 📝 Capturas

Conversas e documentações capturadas via Metodologia Scrappy são salvas neste repo para referência futura dos agentes de IA.

---

**Autor:** Deivison Santana (@deivisan)
**Baseado em:** Metodologia-Scrape

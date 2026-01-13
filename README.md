# 🎯 Midu Group - Plataforma de Recrutamento e Seleção

Plataforma web profissional para recrutamento e seleção de profissionais na Bahia, desenvolvida para **Daniel Duarte** (Midu Group).

[![Deploy to GitHub Pages](https://github.com/deivisan/SELECOES-MIDU/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/deivisan/SELECOES-MIDU/actions)

## 🚀 Demo Online

**Live Preview:** https://deivisan.github.io/SELECOES-MIDU/public.html

### URLs das Páginas:
- **Landing Page Pública:** `/public.html`
- **Portal do Candidato:** `/portal.html`
- **Dashboard Admin:** `/admin.html`

---

## 🎨 Design System

### 3 Temas Profissionais com Cores Vibrantes

| Tema | Cor Primária | Gradiente | Uso |
|------|--------------|-----------|-----|
| **Default (Azul)** | `#2563eb` | Azul profundo → Azul escuro | Confiança, profissionalismo |
| **Teal (Verde)** | `#0d9488` | Verde-água → Verde escuro | Crescimento, modernidade |
| **Purple (Roxo)** | `#7c3aed` | Roxo criativo → Roxo escuro | Inovação, criatividade |

**NOTA:** Todos os temas têm **backgrounds com gradientes coloridos** (ZERO branco puro).

---

## 🏢 Empresas Parceiras Reais (BA)

A plataforma apresenta vagas de empresas baianas de destaque:

- **Ford Motor Company** (Camaçari)
- **Braskem** (Camaçari - Polo Petroquímico)
- **Petrobras** (Salvador)
- **Suzano S.A.** (Mucuri - Papel e Celulose)
- **BRF S.A.** (Feira de Santana - Alimentos)
- **Midu Group** (Feira de Santana)

---

## 📋 Sobre a Midu Group

**Fundador:** Daniel Duarte  
**Especialização:** Recrutamento e Seleção com foco em DEI (Diversidade, Equidade e Inclusão)  
**Certificações:**
- Administrative Human Resources (LinkedIn)
- Equity First: The Path to Inclusion and Belonging
- Foundations of Diversity, Equity, Inclusion, and Belonging
- Strategic Human Resources
- HR Recruiting Communication Strategies

### Missão
Facilitar processos seletivos de alta qualidade, reduzindo tempo de contratação e aumentando a taxa de acerto no match entre empresas e profissionais.

### Diferencial
Combinamos **tecnologia moderna** com **olhar humano especializado**. Utilizamos plataformas digitais para agilidade, mas mantemos entrevistas estruturadas e avaliações comportamentais conduzidas por psicólogos e especialistas em RH.

---

## 🛠️ Stack Técnica

- **Runtime:** Bun 1.3+ (NÃO Node.js)
- **Framework:** React 19
- **Build Tool:** Vite 7.3.1
- **Styling:** CSS puro com design system + TailwindCSS 3
- **Linguagem:** TypeScript 5.8+
- **Deploy:** GitHub Pages (CI/CD automático)

---

## 🚀 Desenvolvimento Local

### Pré-requisitos
```bash
# Instalar Bun (se ainda não tiver)
curl -fsSL https://bun.sh/install | bash

# Verificar instalação
bun --version
```

### Instalar Dependências
```bash
bun install
```

### Rodar Dev Server
```bash
bun run dev
```

Acesse: `http://localhost:3000/public.html`

### Build para Produção
```bash
bun run build
```

Saída em: `dist/`

---

## 📦 Deploy no GitHub Pages

### Passo 1: Habilitar GitHub Pages
1. Vá em **Settings** do repositório
2. Navegue até **Pages** (menu lateral)
3. Em **Source**, selecione: **GitHub Actions**
4. Salve

### Passo 2: Executar Workflow
O deploy acontece automaticamente ao fazer `git push` na branch `main`.

Para verificar o status:
1. Vá na aba **Actions** do repositório
2. Aguarde o workflow **"Deploy to GitHub Pages"** concluir (⏳ ~2 minutos)
3. Acesse: `https://deivisan.github.io/SELECOES-MIDU/public.html`

---

## ⚠️ Troubleshooting - Página em branco?

**SINTOMA:** Ao acessar o site, a página fica completamente em branco.

**CAUSA:** O GitHub Pages está configurado para servir do branch errado (`main` em vez do workflow).

**SOLUÇÃO:** Siga as instruções completas em **[📄 GITHUB-PAGES-FIX.md](./GITHUB-PAGES-FIX.md)**

**RESUMO RÁPIDO:**
1. Acesse: https://github.com/Deivisan/SELECOES-MIDU/settings/pages
2. Em **Source**, mude para: **GitHub Actions**
3. Salve e aguarde 5-10 minutos

---

## 📂 Estrutura do Projeto

```
SELECOES-MIDU/
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD automático
├── src/
│   ├── client/
│   │   ├── public/
│   │   │   ├── main.tsx
│   │   │   └── PublicView.tsx  # Landing page
│   │   ├── portal/
│   │   │   ├── main.tsx
│   │   │   └── PortalView.tsx  # Portal candidato
│   │   └── admin/
│   │       ├── main.tsx
│   │       └── AdminView.tsx   # Dashboard admin
│   └── shared/
│       ├── data/
│       │   └── mockData.ts     # Vagas, empresas, categorias
│       ├── types/
│       │   └── index.ts        # TypeScript types
│       └── styles/
│           └── themes.css      # Design system completo
├── public.html
├── portal.html
├── admin.html
├── vite.config.ts
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 🎨 Animações Profissionais

- **fadeInUp:** Entrada suave de baixo para cima
- **slideInLeft/Right:** Deslizamento lateral
- **scaleIn:** Zoom suave
- **pulse:** Pulsação suave
- **float:** Flutuação contínua

Todas com delays escalonados (100ms-800ms) para efeito cascata.

---

## 🔧 Scripts Disponíveis

```bash
bun run dev        # Dev server (porta 3000)
bun run build      # Build produção
bun run preview    # Preview build local
bun run lint       # Rodar ESLint
```

---

## 📝 Changelog

### v2.0.0 (2026-01-12)
- ✅ **Cores vibrantes** em todos os temas (gradientes azul/verde/roxo)
- ✅ Removido "Miranda + Duarte" (agora só "Midu Group")
- ✅ **Seção "Sobre"** com informações reais de Daniel Duarte
- ✅ **Empresas baianas reais** (Ford, Braskem, Petrobras, Suzano, BRF)
- ✅ **Animações profissionais** (8 tipos com delays)
- ✅ **GitHub Pages** configurado (deploy automático)

### v1.0.0 (2026-01-11)
- ✅ Design system profissional (3 temas sutis)
- ✅ 3 páginas completas (Public, Portal, Admin)
- ✅ 10 vagas mock da Bahia
- ✅ Sistema de filtros e busca

---

## 📞 Contato

**Desenvolvido por:** Deivison Santana (@deivisan)  
**Cliente:** Daniel Duarte (Midu Group)  
**Região:** Bahia, Brasil  

---

## 📄 Licença

© 2026 Midu Group — Todos os direitos reservados.

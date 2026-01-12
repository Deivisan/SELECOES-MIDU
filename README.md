# 🎯 Midu Group - Plataforma de Recrutamento e Seleção

> **Conectando Talentos** - Sistema inteligente de gestão de vagas e currículos

---

## 📊 Sobre o Projeto

**Midu Group** é uma plataforma moderna de recrutamento e seleção desenvolvida para Daniel Duarte (líder RH, Bahia). O nome "Midu" representa a união de **Mi**randa + **Du**arte, simbolizando parceria e expertise em gestão de talentos.

### 🎯 Objetivo
Criar uma solução completa para:
- Empresas postarem vagas qualificadas
- Candidatos encontrarem oportunidades alinhadas ao perfil
- RH gerenciar processos seletivos com eficiência
- Banco de dados inteligente de currículos

---

## 🚀 Stack Tecnológica

### **Runtime & Build**
- ✅ **Bun** - Runtime JS/TS ultrarrápido (substitui Node.js)
- ✅ **TypeScript** - Tipagem estática para robustez
- ✅ **Vite** - Build otimizado e HMR instantâneo

### **Frontend** (A Definir)
- 🔄 **Opção 1:** React + TailwindCSS
- 🔄 **Opção 2:** Vue 3 + UnoCSS
- 🔄 **Opção 3:** Svelte + DaisyUI
- 📱 **Mobile-first** obrigatório

### **Backend**
- ✅ **Hono** - Framework web ultrarrápido pra Bun
- ✅ **MongoDB Atlas** - Banco de dados de currículos
- ✅ **JWT** - Autenticação segura
- ✅ **Firebase Storage** - Armazenamento de CVs (LGPD-compliant)

### **Deploy**
- ✅ **GitHub Pages** - Demo estática inicial
- 🔄 **Vercel/Cloudflare Pages** - Produção com backend
- 🔄 **MongoDB Atlas** - Free tier (512MB)

---

## 🎨 Visualizações Planejadas

### 1️⃣ **Público Geral** (Landing Page)
- Hero section com barra de busca central
- Cards de vagas em destaque
- Filtros: localização, área, salário
- Call-to-action: "Candidate-se" ou "Conheça o Midu"

### 2️⃣ **Candidatos** (Portal de Vagas)
- Lista completa de vagas com filtros avançados
- Detalhes da vaga em modal dinâmico
- Formulário de candidatura:
  - Dados básicos (nome, email, telefone)
  - Upload CV (PDF, max 5MB)
  - Perguntas específicas da vaga (opcional)
- Cadastro opcional (perfil persistente)

### 3️⃣ **Admin RH** (Painel Daniel)
- Dashboard analítico:
  - Vagas abertas
  - Total de candidaturas
  - Estatísticas por período
- Gerenciamento de vagas (CRUD completo)
- Visualização de candidatos:
  - Lista por vaga
  - Filtros (nome, skill, data)
  - Download CV
  - Etapas: triagem → entrevista → aprovado/reprovado
- Kanban visual (futuro)

---

## 🎨 Design System

### **Paleta de Cores** (Baseada no perfil RH)
```css
--primary: #007BFF;      /* Azul confiança */
--success: #28A745;      /* Verde crescimento */
--warning: #FD7E14;      /* Laranja energia */
--background: #F8F9FA;   /* Off-white clean */
--text: #212529;         /* Texto principal */
```

### **Princípios**
- ✅ Mobile-first (70% acesso mobile Brasil)
- ✅ Animações leves (hover, fade-in)
- ✅ Acessibilidade (WCAG 2.1 AA)
- ✅ Performance (Lighthouse 90+)

### **Inspirações**
- Gupy (IA visual, clean, cards dinâmicos)
- Vagas.com (filtros simples, mobile otimizado)
- LinkedIn Jobs (profissional, badges, clareza)

---

## 📂 Estrutura do Projeto

```
SELECOES-MIDU/
├── src/
│   ├── client/              # Frontend (3 visualizações)
│   │   ├── public/          # Landing page pública
│   │   ├── portal/          # Portal candidatos
│   │   └── admin/           # Painel RH
│   ├── server/              # Backend Bun + Hono
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # Schemas MongoDB
│   │   ├── middleware/      # Auth, CORS, etc
│   │   └── utils/           # Helpers
│   └── shared/              # Types, constants
├── public/                  # Assets estáticos
│   ├── images/              # Fotos Daniel, logos
│   └── fonts/               # Tipografia custom
├── temp/                    # Arquivos de scraping (histórico)
├── package.json             # Bun dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Build config
└── README.md                # Este arquivo
```

---

## 🔐 Compliance e Segurança

### **LGPD (Lei Geral de Proteção de Dados)**
- ✅ Consentimento explícito pra armazenar CV
- ✅ Direito de exclusão de dados (endpoint `/api/candidatos/:id/delete`)
- ✅ Criptografia em trânsito (HTTPS) e repouso (MongoDB encryption)
- ✅ Logs de acesso aos dados sensíveis

### **Autenticação**
- ✅ JWT com refresh tokens
- ✅ Senha hash (bcrypt)
- ✅ Rate limiting (prevenir brute force)

---

## 🚀 Como Começar

```bash
# Instalar Bun (se não tiver)
curl -fsSL https://bun.sh/install | bash

# Instalar dependências
bun install

# Rodar dev server
bun run dev

# Build pra produção
bun run build

# Deploy GitHub Pages
bun run deploy
```

---

## 📝 Documentação Adicional

- 📋 [**STACK-DECISION.md**](./STACK-DECISION.md) - Decisões técnicas detalhadas
- 💬 [**temp/CONVERSA-GROK-COMPLETA.md**](./temp/CONVERSA-GROK-COMPLETA.md) - Conversa original com requisitos
- 🗂️ [**temp/**](./temp/) - Histórico de scraping e metodologias

---

## 📞 Contato

**Desenvolvedor:** Deivison Santana (@deivisan)  
**Cliente:** Daniel Duarte - Midu Group  
**Repo:** https://github.com/Deivisan/SELECOES-MIDU  
**Data Início:** 12/01/2026  
**Status:** ✅ Stack consolidada - Pronto pra desenvolvimento

---

## 🎯 Próximos Passos

- [x] Estrutura de pastas planejada
- [x] Stack tecnológica definida
- [x] Documentação consolidada
- [ ] Inicializar projeto Bun + Vite + React
- [ ] Criar 3 apps básicas (public, portal, admin)
- [ ] Setup TailwindCSS + DaisyUI
- [ ] Mock 10 vagas de teste

**🚀 Aguardando confirmação para iniciar desenvolvimento!**

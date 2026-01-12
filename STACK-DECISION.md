# 🧠 Decisão de Stack Tecnológica - Midu Group

**Data:** 12/01/2026  
**Decisor:** DevSan (AGI Deivison Santana)  
**Cliente:** Daniel Duarte

---

## 🎯 Requisitos Críticos

### **Performance**
- ✅ Mobile-first (70% acesso mobile Brasil)
- ✅ Load time < 2s (Lighthouse 90+)
- ✅ GitHub Pages compatível (deploy grátis inicial)

### **Desenvolvimento**
- ✅ **Bun-only** (zero Node.js)
- ✅ TypeScript (tipagem forte)
- ✅ Hot reload rápido
- ✅ Fácil manutenção pro Daniel expandir

### **Funcionalidades**
- ✅ 3 visualizações distintas (público, candidatos, admin)
- ✅ Upload de arquivos (CVs)
- ✅ Autenticação segura
- ✅ Banco de dados persistente

---

## 🔥 Stack FINAL Escolhida

### **Runtime**
```json
{
  "runtime": "Bun 1.3.5+",
  "justificativa": "3-4x mais rápido que Node, compatível npm, TypeScript nativo"
}
```

### **Frontend Framework**
```json
{
  "escolha": "React 18 + Vite",
  "alternativas_consideradas": ["Vue 3", "Svelte", "Vanilla"],
  "motivos": [
    "Ecossistema maduro (libs de UI prontas)",
    "React Router pra 3 visualizações",
    "Vite HMR instantâneo com Bun",
    "TailwindCSS integração perfeita",
    "Fácil achar devs React no Brasil"
  ]
}
```

### **CSS Framework**
```json
{
  "escolha": "TailwindCSS 3.4+",
  "plugins": ["@tailwindcss/forms", "daisyui"],
  "motivos": [
    "Utility-first = prototipagem rápida",
    "DaisyUI = componentes prontos (cards, modals)",
    "Mobile-first nativo",
    "Purge CSS automático (bundle pequeno)"
  ]
}
```

### **Backend**
```json
{
  "framework": "Hono",
  "versao": "4.0+",
  "motivos": [
    "Feito pra Bun/Edge (ultrarrápido)",
    "Compatível Cloudflare Workers",
    "Middleware simples (JWT, CORS)",
    "TypeScript first-class"
  ]
}
```

### **Banco de Dados**
```json
{
  "principal": "MongoDB Atlas",
  "tier": "M0 (grátis 512MB)",
  "driver": "mongodb (oficial Bun-compatible)",
  "motivos": [
    "Schema flexível (CVs variados)",
    "Atlas free tier generoso",
    "Fácil escalar",
    "LGPD-compliant (encryption at rest)"
  ]
}
```

### **Storage (CVs)**
```json
{
  "escolha": "Firebase Storage",
  "tier": "Spark (grátis 5GB)",
  "motivos": [
    "Upload direto do client",
    "URLs signed (segurança)",
    "LGPD OK (localização EU disponível)",
    "SDK simples"
  ]
}
```

### **Autenticação**
```json
{
  "método": "JWT + Refresh Tokens",
  "lib": "jose (Web-standard JWT)",
  "hash": "bcrypt (via bun:crypto)",
  "motivos": [
    "Stateless (escala fácil)",
    "Refresh token = UX melhor",
    "jose = edge-compatible"
  ]
}
```

---

## 📂 Estrutura de Pastas FINAL

```
SELECOES-MIDU/
├── src/
│   ├── client/                    # Frontend React
│   │   ├── public/                # Landing page
│   │   │   ├── App.tsx
│   │   │   ├── components/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── JobCard.tsx
│   │   │   │   └── SearchBar.tsx
│   │   │   └── assets/
│   │   ├── portal/                # Portal candidatos
│   │   │   ├── App.tsx
│   │   │   ├── pages/
│   │   │   │   ├── JobList.tsx
│   │   │   │   ├── JobDetails.tsx
│   │   │   │   └── ApplicationForm.tsx
│   │   │   └── components/
│   │   └── admin/                 # Painel RH
│   │       ├── App.tsx
│   │       ├── pages/
│   │       │   ├── Dashboard.tsx
│   │       │   ├── JobManager.tsx
│   │       │   ├── Applications.tsx
│   │       │   └── Login.tsx
│   │       └── components/
│   ├── server/                    # Backend Hono
│   │   ├── index.ts               # Entry point
│   │   ├── routes/
│   │   │   ├── jobs.ts            # GET/POST/PUT/DELETE vagas
│   │   │   ├── applications.ts    # Candidaturas
│   │   │   ├── auth.ts            # Login/JWT
│   │   │   └── upload.ts          # Upload CV Firebase
│   │   ├── models/
│   │   │   ├── Job.ts
│   │   │   ├── Application.ts
│   │   │   └── User.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts            # Validate JWT
│   │   │   ├── cors.ts
│   │   │   └── rateLimit.ts
│   │   └── db/
│   │       └── mongo.ts           # MongoDB connection
│   └── shared/                    # Compartilhado
│       ├── types/
│       │   ├── Job.ts
│       │   ├── Application.ts
│       │   └── User.ts
│       └── constants.ts
├── public/                        # Assets estáticos
│   ├── images/
│   │   ├── daniel-profile.jpg     # Foto Daniel
│   │   ├── logo-midu.svg
│   │   └── hero-bg.jpg
│   └── fonts/
├── temp/                          # Scraping histórico
│   ├── scrape.js
│   ├── Metodologia-Scrape.md
│   └── CONVERSA-GROK-COMPLETA.md
├── .env.example                   # Vars ambiente
├── .gitignore
├── bun.lockb
├── package.json
├── tsconfig.json
├── vite.config.ts                 # 3 builds separados
├── tailwind.config.ts
└── README.md
```

---

## 🎨 Componentes UI Planejados

### **Shared Components**
- `<Button>` - Primary, secondary, danger
- `<Input>` - Text, email, tel com validação
- `<Select>` - Filtros (área, localização)
- `<Modal>` - Detalhes vaga, upload CV
- `<Card>` - Vagas, candidatos
- `<Badge>` - CLT, Remoto, Júnior, etc
- `<Avatar>` - Foto Daniel no header admin

### **Public (Landing)**
- `<Hero>` - Imagem + barra busca central
- `<JobCarousel>` - Vagas destaque (carrossel)
- `<Stats>` - "500+ vagas", "1000+ candidatos"
- `<Testimonials>` - Depoimentos empresas (futuro)
- `<Footer>` - Links, contato, LGPD

### **Portal (Candidatos)**
- `<JobList>` - Grid responsivo de vagas
- `<FilterSidebar>` - Filtros avançados
- `<JobDetailsModal>` - Popup com descrição completa
- `<ApplicationForm>` - Form + upload CV
- `<UploadProgress>` - Progress bar animado

### **Admin (RH)**
- `<Dashboard>` - Cards métricas
- `<JobTable>` - CRUD vagas (editar inline)
- `<ApplicationKanban>` - Drag-drop etapas (futuro)
- `<ApplicationList>` - Lista candidatos
- `<CVViewer>` - Preview PDF inline
- `<Analytics>` - Charts (Chart.js)

---

## 🔧 Configuração Bun

### **package.json**
```json
{
  "name": "midu-group",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "bun run --watch src/server/index.ts",
    "dev:client": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "bun run build && gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.28.1",
    "hono": "^4.7.10",
    "mongodb": "^6.12.0",
    "jose": "^5.9.6",
    "firebase": "^11.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "vite": "^6.0.7",
    "tailwindcss": "^3.4.18",
    "daisyui": "^4.12.24",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "typescript": "^5.7.3",
    "gh-pages": "^6.2.0"
  }
}
```

### **vite.config.ts** (Multi-page)
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        public: resolve(__dirname, 'src/client/public/index.html'),
        portal: resolve(__dirname, 'src/client/portal/index.html'),
        admin: resolve(__dirname, 'src/client/admin/index.html'),
      },
    },
  },
});
```

---

## 🔐 Variáveis de Ambiente

### **.env.example**
```bash
# MongoDB
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/midu?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-key-here
JWT_REFRESH_SECRET=your-refresh-secret-key

# Firebase
FIREBASE_API_KEY=xxx
FIREBASE_AUTH_DOMAIN=midu-group.firebaseapp.com
FIREBASE_PROJECT_ID=midu-group
FIREBASE_STORAGE_BUCKET=midu-group.appspot.com

# Server
PORT=3000
NODE_ENV=development
```

---

## 🚀 Fluxo de Deploy

### **Fase 1: GitHub Pages (Demo Estática)**
```bash
bun install
bun run build        # Build 3 apps React
bun run deploy       # gh-pages -d dist
```
**URL:** `https://deivisan.github.io/SELECOES-MIDU/public`

### **Fase 2: Cloudflare Pages (Com Backend)**
```bash
# Frontend: Cloudflare Pages (automático via Git)
# Backend: Cloudflare Workers (Hono edge-compatible)

bun run build
wrangler pages deploy dist
```

---

## ✅ Checklist Pré-Desenvolvimento

- [x] Stack decidida (React + Hono + MongoDB)
- [x] Estrutura de pastas definida
- [x] package.json planejado
- [x] Componentes mapeados
- [x] Deploy strategy clara
- [ ] **Definir cores finais** (aguardando quiz Daniel)
- [ ] **Escolher framework CSS específico** (Tailwind + DaisyUI OK)
- [ ] **Criar mockups wireframe** (opcional mas recomendado)
- [ ] **Inicializar projeto Bun** (`bun create vite`)

---

## 🎯 Próximo Passo Imediato

**CONSOLIDAR WORKSPACE:**
1. ✅ Mover arquivos scraping pra `temp/`
2. ✅ Atualizar README.md com foco Midu
3. ✅ Criar STACK-DECISION.md (este arquivo)
4. ⏳ **Inicializar projeto Bun + Vite + React**
5. ⏳ **Criar 3 apps básicas** (public, portal, admin)
6. ⏳ **Setup TailwindCSS + DaisyUI**
7. ⏳ **Mock 10 vagas de teste**

---

**Status:** ✅ STACK CONSOLIDADA - Pronto pra começar desenvolvimento  
**Aguardando:** Confirmação pra inicializar projeto Bun

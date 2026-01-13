# 🚀 Seleções Midu - Plataforma de Recrutamento Profissional

<div align="center">

![Status](https://img.shields.io/badge/status-ativo-success.svg)
![Versão](https://img.shields.io/badge/versão-3.0.0-blue.svg)
![Licença](https://img.shields.io/badge/licença-Proprietário-red.svg)
![Build](https://img.shields.io/github/actions/workflow/status/Deivisan/SELECOES-MIDU/deploy.yml?branch=main)

**Plataforma completa de Recrutamento e Seleção desenvolvida pela [DeiviTech](https://deivitech.com) para o Midu Group (Miranda + Duarte)**

[🌐 Ver Plataforma Online](https://deivisan.github.io/SELECOES-MIDU/) · [📋 Reportar Bug](https://github.com/Deivisan/SELECOES-MIDU/issues) · [✨ Solicitar Recurso](https://github.com/Deivisan/SELECOES-MIDU/issues)

</div>

---

## 📖 Sobre o Projeto

**Seleções Midu** é uma plataforma moderna e profissional de recrutamento e seleção, criada especialmente para **Daniel Duarte** do **Midu Group** (Miranda + Duarte), empresa de consultoria em gestão de pessoas e recrutamento especializado na Bahia.

A plataforma oferece **três interfaces integradas**:
- 🌐 **Página Pública**: Vitrine de vagas para candidatos
- 👤 **Portal do Candidato**: Área pessoal para gerenciar candidaturas
- 🔐 **Admin Dashboard**: Painel administrativo completo para gestão de vagas e candidatos

---

## ✨ Funcionalidades Principais

### 🌐 Página Pública
- ✅ **Hero Section** com busca inteligente de vagas
- ✅ **Filtro por Categorias**: Tecnologia, Saúde, Educação, Vendas, etc.
- ✅ **Grid de Vagas Ativas**: Cards responsivos com informações completas
- ✅ **6 Temas de Cores**: Azul, Verde, Roxo, Laranja, Rosa, Ciano
- ✅ **Página Sobre**: História do Midu Group e missão institucional
- ✅ **Página Empresas**: Showcase de parceiros estratégicos

### 👤 Portal do Candidato
- ✅ **Navegação por Tabs**: Vagas, Candidaturas, Perfil
- ✅ **Candidatura com Um Clique**: Persistência em `localStorage`
- ✅ **Histórico de Candidaturas**: Status em tempo real
- ✅ **Edição de Perfil**: Nome, email, telefone, LinkedIn, bio
- ✅ **Legibilidade Otimizada**: Contrast ratio WCAG AA/AAA
- ⚠️ **Em Desenvolvimento**: Filtros avançados de localização e salário

### 🔐 Admin Dashboard
- ✅ **Login Seguro**: Autenticação admin/admin com sessão persistente
- ✅ **Dashboard Completo**: 6 KPIs + 4 Gráficos Interativos (Recharts)
  - BarChart: Candidatos por status
  - LineChart: Aplicações mensais
  - PieChart: Vagas por categoria
  - AreaChart: Tendência de contratações
- ✅ **CRUD de Vagas**: Criar, editar, deletar, ativar/desativar
- ✅ **Gestão de Candidatos**: 
  - Filtros avançados (status, vaga, período)
  - Modal de visualização de perfil
  - Mudança de status inline
  - Exportação CSV
- ⚠️ **Em Desenvolvimento**: Seção de Relatórios

---

## 🛠️ Stack Tecnológica

### Core
- ⚡ **[Bun](https://bun.sh)** 1.3.5 - Runtime JavaScript ultra-rápido
- ⚛️ **[React](https://react.dev)** 19.2.3 - Biblioteca de interface
- 🎨 **[Vite](https://vitejs.dev)** 7.3.1 - Build tool moderna
- 📘 **[TypeScript](https://www.typescriptlang.org)** 5.9.3 - Tipagem estática

### UI/UX
- 🎨 **[Tailwind CSS](https://tailwindcss.com)** 3.x - Framework CSS utility-first
- 🌼 **[DaisyUI](https://daisyui.com)** 5.5.14 - Componentes Tailwind prontos
- 📊 **[Recharts](https://recharts.org)** 3.6.0 - Gráficos React responsivos

### Deploy
- 🚀 **[GitHub Pages](https://pages.github.com)** - Hospedagem gratuita
- ⚙️ **[GitHub Actions](https://github.com/features/actions)** - CI/CD automático

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Bun** instalado ([Instalar Bun](https://bun.sh))
- **Git** instalado

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Deivisan/SELECOES-MIDU.git

# Entre no diretório
cd SELECOES-MIDU

# Instale as dependências
bun install

# Inicie o servidor de desenvolvimento
bun run dev
```

A aplicação estará rodando em `http://localhost:3000/SELECOES-MIDU/`

### Build para Produção

```bash
# Gerar build otimizado
bun run build

# Visualizar build localmente
bun run preview
```

O build será gerado na pasta `dist/` pronto para deploy.

---

## 📂 Estrutura do Projeto

```
SELECOES-MIDU/
├── public/                  # Arquivos estáticos
├── src/
│   ├── client/
│   │   ├── admin/          # AdminView.tsx - Dashboard administrativo
│   │   ├── portal/         # PortalView.tsx - Portal do candidato
│   │   ├── public/         # PublicView.tsx - Página pública
│   │   ├── sobre/          # SobreView.tsx - Página institucional
│   │   └── empresas/       # EmpresasView.tsx - Empresas parceiras
│   └── shared/
│       ├── components/     # Componentes reutilizáveis
│       │   ├── ViewSelector.tsx    # Navegação + temas
│       │   ├── VagasTable.tsx      # Tabela CRUD de vagas
│       │   └── VagaForm.tsx        # Modal criar/editar vaga
│       ├── data/
│       │   └── mockData.ts         # 25 vagas mock + categorias
│       ├── styles/
│       │   ├── global.css          # Reset + utility classes
│       │   └── themes.css          # 6 temas de cores
│       └── types/
│           └── index.ts            # TypeScript interfaces
├── *.html                   # Entry points HTML (6 páginas)
├── vite.config.ts          # Configuração Vite Multi-Page App
├── tailwind.config.js      # Configuração Tailwind + DaisyUI
└── .github/workflows/
    └── deploy.yml          # Deploy automático GitHub Pages
```

---

## 🎨 Temas de Cores

A plataforma oferece **6 temas vibrantes** acessíveis via botão flutuante ⚙️:

| Tema | Cor Principal | Uso Recomendado |
|------|--------------|-----------------|
| 🔵 Azul (default) | #2563eb | Tecnologia, Corporativo |
| 🟢 Verde (teal) | #0d9488 | Saúde, Sustentabilidade |
| 🟣 Roxo (purple) | #7c3aed | Criatividade, Design |
| 🟠 Laranja (orange) | #f97316 | Energia, Vendas |
| 🌸 Rosa (pink) | #ec4899 | Diversidade, Inclusão |
| 🔷 Ciano (cyan) | #06b6d4 | Inovação, Modernidade |

**Como usar:** Clique no botão flutuante ⚙️ no canto inferior direito e selecione o tema desejado.

---

## 🔐 Acesso Admin

**URL:** [https://deivisan.github.io/SELECOES-MIDU/admin.html](https://deivisan.github.io/SELECOES-MIDU/admin.html)

**Credenciais de Demonstração:**
- **Usuário:** `admin`
- **Senha:** `admin`

⚠️ **Importante:** Estas são credenciais de demonstração. Em produção, implemente autenticação segura com backend.

---

## 📊 Dados Mock

A plataforma utiliza **dados simulados** (mock) para demonstração:

- ✅ **25 Vagas Fictícias**: Distribuídas em 8 categorias
- ✅ **3 Candidatos Mock**: Com perfis completos para testes
- ✅ **8 Empresas Parceiras**: Fictional (baseadas em cidades da Bahia)
- ✅ **Aplicações**: Armazenadas em `localStorage` (navegador)

**Persistência:** Todos os dados são salvos no navegador e **não são compartilhados** entre dispositivos.

---

## 🚢 Deploy Automático

O projeto utiliza **GitHub Actions** para deploy automático:

### Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Como Funciona

1. **Push para `main`** → Dispara workflow
2. **Build com Bun** → Gera `dist/`
3. **Deploy para `gh-pages`** → Publica automaticamente
4. **Online em ~30s** ⚡

---

## 🤝 Criado Por

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Deivisan">
        <img src="https://github.com/Deivisan.png" width="100px;" alt="Deivison Santana"/><br />
        <sub><b>Deivison Santana</b></sub>
      </a><br />
      <sub>CEO & Full Stack Developer</sub><br />
      <sub><a href="https://deivitech.com">🌐 DeiviTech</a></sub>
    </td>
    <td align="center">
      <b>Cliente</b><br />
      <sub>Daniel Duarte</sub><br />
      <sub>Midu Group</sub><br />
      <sub>(Miranda + Duarte)</sub>
    </td>
  </tr>
</table>

### 🏢 DeiviTech
**Soluções Tecnológicas Inteligentes**

- 🌐 **Website:** [deivitech.com](https://deivitech.com)
- 📧 **Email:** contato@deivitech.com
- 📱 **WhatsApp:** +55 (71) 99999-9999
- 📍 **Localização:** Feira de Santana, Bahia - Brasil

---

## 📅 Histórico de Versões

### v3.0.0 (13 Janeiro 2026)
- ✅ Admin Dashboard completo com gráficos Recharts
- ✅ Gestão de candidatos com filtros avançados
- ✅ Seção Empresas separada
- ✅ 6 temas de cores vibrantes
- ✅ Deploy automático GitHub Actions

### v2.0.0 (12 Janeiro 2026)
- ✅ Portal do candidato com candidaturas reais
- ✅ Página Sobre institucional
- ✅ CRUD completo de vagas
- ✅ Login admin funcional

### v1.0.0 (10 Janeiro 2026)
- ✅ Página pública com grid de vagas
- ✅ Busca e filtros por categoria
- ✅ Arquitetura Multi-Page App (Vite)

---

## 🛣️ Roadmap - Próximas Funcionalidades

As funcionalidades a seguir estão em desenvolvimento e serão implementadas nas próximas versões:

### 🔜 Alta Prioridade

#### Portal do Candidato
- [ ] **Filtros Avançados de Vagas**
  - Filtro por localização (cidades da Bahia)
  - Filtro por faixa salarial (slider)
  - Ordenação (data, relevância)
  - Paginação (10 vagas por página)
- [ ] **Upload de Currículo** (mock)
- [ ] **Adicionar Experiências Profissionais**
- [ ] **Adicionar Formação Acadêmica**
- [ ] **Sistema de Habilidades** (tags)

#### Admin Dashboard
- [ ] **Seção de Relatórios Completa**
  - Gráfico de desempenho mensal (LineChart)
  - Relatório por vaga (BarChart)
  - Métricas: Tempo médio de contratação
  - Download de relatórios (CSV/PDF mock)
- [ ] **Alertas Inteligentes**
  - Vagas sem candidatos há > 7 dias
  - Candidatos pendentes > 14 dias
  - Entrevistas agendadas (calendário)

### 📊 Média Prioridade

#### Melhorias de UX
- [ ] **Skeleton Loaders** (carregamento visual)
- [ ] **Animações de Transição** (Framer Motion)
- [ ] **Tooltips Informativos**
- [ ] **Toast Notifications** (success/error)
- [ ] **Empty States Elegantes**

#### Performance
- [ ] **Lighthouse Score > 90** (todas as páginas)
- [ ] **Code Splitting** otimizado
- [ ] **Lazy Loading** de imagens
- [ ] **Service Worker** (PWA)

### 🔮 Baixa Prioridade (Futuro)

#### Backend Real
- [ ] **API REST** com Node.js/Bun
- [ ] **Banco de Dados** (PostgreSQL/MongoDB)
- [ ] **Autenticação JWT**
- [ ] **Upload real de arquivos** (S3/Cloudflare R2)
- [ ] **Envio de emails** (Resend/SendGrid)

#### Features Avançadas
- [ ] **Notificações Push**
- [ ] **Chat em Tempo Real** (candidato ↔ recrutador)
- [ ] **Vídeo Entrevistas** (WebRTC)
- [ ] **Testes de Aptidão** online
- [ ] **Integração com LinkedIn**
- [ ] **Dashboard de Analytics** (Google Analytics/Plausible)

---

## 📝 Licença

Este projeto é **proprietário** e foi desenvolvido exclusivamente para o **Midu Group (Miranda + Duarte)** pela **DeiviTech**.

**Todos os direitos reservados © 2026 DeiviTech**

Uso, cópia, modificação ou distribuição sem autorização expressa é **estritamente proibido**.

---

## 🙏 Agradecimentos

- **Daniel Duarte** - Pela confiança no projeto
- **Midu Group** - Pela parceria estratégica
- **Comunidade Open Source** - React, Vite, Tailwind, Recharts

---

<div align="center">

**Desenvolvido com ❤️ pela [DeiviTech](https://deivitech.com)**

[![GitHub](https://img.shields.io/badge/GitHub-Deivisan-black?style=flat&logo=github)](https://github.com/Deivisan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Deivison%20Santana-blue?style=flat&logo=linkedin)](https://linkedin.com/in/deivisansantana)
[![Website](https://img.shields.io/badge/Website-DeiviTech-orange?style=flat&logo=google-chrome)](https://deivitech.com)

</div>

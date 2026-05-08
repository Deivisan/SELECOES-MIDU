# 🚀 Midu Group — Landing Page + Portal de Vagas

<div align="center">

![Status](https://img.shields.io/badge/status-ativo-success.svg)
![Versão](https://img.shields.io/badge/versão-4.0.0-blue.svg)
![Licença](https://img.shields.io/badge/licença-Proprietário-red.svg)
![Build](https://img.shields.io/github/actions/workflow/status/Deivisan/SELECOES-MIDU/deploy.yml?branch=main)

**Landing page institucional + Portal de recrutamento profissional para o Midu Group (Miranda + Duarte)**

[🌐 Ver Plataforma Online](https://deivisan.github.io/SELECOES-MIDU/) · [📋 Reportar Bug](https://github.com/Deivisan/SELECOES-MIDU/issues) · [✨ Solicitar Recurso](https://github.com/Deivisan/SELECOES-MIDU/issues)

</div>

---

## 📖 Sobre o Projeto

**Midu Group** é a landing page institucional + portal de recrutamento do Midu Group (Miranda + Duarte), empresa de consultoria em gestão de pessoas e recrutamento especializado na Bahia.

A plataforma oferece:

- 🌐 **Landing Page**: Apresentação do Midu Group (Hero, Sobre, Serviços, Time)
- 📋 **Portal de Vagas**: Vagas abertas com candidatura online
- 👤 **Portal do Candidato**: Área pessoal para gerenciar candidaturas
- 🔐 **Admin Dashboard**: Painel administrativo para gestão de vagas e candidatos

---

## ✨ Funcionalidades

### 🌐 Landing Page
- ✅ **Hero Section**: "Conectando Talentos às Oportunidades"
- ✅ **Seção Sobre**: Missão, visão, valores
- ✅ **Seção Serviços**: Consultoria, recrutamento, treinamento
- ✅ **Seção Time**: Apresentação da equipe
- ✅ **CTA**: "Ver Vagas Abertas"
- ✅ **Footer**: Contato e redes sociais

### 📋 Portal de Vagas
- ✅ **Grid de Vagas**: Cards responsivos com informações completas
- ✅ **Busca e Filtros**: Por categoria, localização, salário
- ✅ **Detalhes da Vaga**: Descrição, requisitos, benefícios
- ✅ **Candidatura Online**: Formulário + upload de currículo PDF
- ✅ **Redirecionamento**: WhatsApp/Email configurável

### 👤 Portal do Candidato
- ✅ **Cadastro/Login**: Autenticação segura
- ✅ **Minhas Candidaturas**: Acompanhar status
- ✅ **Meu Perfil**: Editar dados e currículo
- ✅ **Upload de Currículo**: PDF com até 5MB

### 🔐 Admin Dashboard
- ✅ **Dashboard com Métricas**: Total de vagas, candidatos, candidaturas
- ✅ **Gráficos Interativos**: Recharts
- ✅ **CRUD de Vagas**: Criar, editar, ativar/desativar, deletar
- ✅ **Gestão de Candidatos**: Ver currículos, mudar status, filtros

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

### Backend
- 🗄️ **[Supabase](https://supabase.com)** - Banco de dados + Auth + Storage (Free Tier)

### Deploy
- 🚀 **[GitHub Pages](https://pages.github.com)** - Hospedagem gratuita
- ⚙️ **[GitHub Actions](https://github.com/features/actions)** - CI/CD automático

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Bun** instalado ([Instalar Bun](https://bun.sh))
- **Git** instalado
- **Conta Supabase** (para usar com banco de dados real)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Deivisan/SELECOES-MIDU.git

# Entre no diretório
cd SELECOES-MIDU

# Instale as dependências
bun install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas chaves do Supabase

# Inicie o servidor de desenvolvimento
bun run dev
```

A aplicação estará rodando em `http://localhost:3000/SELECOES-MIDU/`

### Variáveis de Ambiente

```env
VITE_SUPABASE_URL=sua-url-do-supabase
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

---

## 🔐 Acesso Admin

**URL:** [https://deivisan.github.io/SELECOES-MIDU/vagas/admin.html](https://deivisan.github.io/SELECOES-MIDU/vagas/admin.html)

**Credenciais de Demonstração:**
- **Usuário:** `admin`
- **Senha:** `admin`

⚠️ **Importante:** Em produção, usar autenticação real do Supabase.

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

---

## 🚢 Deploy Automático

O projeto utiliza **GitHub Actions** para deploy automático:

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

### v4.0.0 (08 Maio 2026)
- ✅ **Rebrand:** "Seleções Midu" → "Midu Group"
- ✅ **Landing Page:** Nova estrutura institucional
- ✅ **Portal de Vagas:** Funcional com Supabase
- ✅ **Candidatura:** Upload PDF + redirecionamento WhatsApp/Email
- ✅ **Portal Candidato:** Cadastro, login, gestão de candidaturas
- ✅ **Admin Dashboard:** Métricas reais do banco

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

### 🔜 Alta Prioridade

#### Portal de Vagas
- [ ] Filtros avançados (localização, salário)
- [ ] Paginação (10 vagas por página)
- [ ] Busca por texto completo

#### Portal Candidato
- [ ] Perfil completo (experiências, formação)
- [ ] Sistema de habilidades (tags)
- [ ] Histórico de candidaturas detalhado

#### Admin Dashboard
- [ ] Tracker de etapas do processo seletivo
- [ ] Notificações por email
- [ ] Relatórios em PDF

### 📊 Média Prioridade

#### Landing Page
- [ ] Animações de scroll
- [ ] Testemunhos de clientes
- [ ] Cases de sucesso

#### Melhorias de UX
- [ ] Skeleton loaders
- [ ] Toast notifications
- [ ] Empty states elegantes

### 🔮 Baixa Prioridade (Futuro)

#### Banco de Talentos
- [ ] Pipeline de talentos
- [ ] Busca por habilidades
- [ ] Contato direto com candidates

#### Features Avançadas
- [ ] Testes de aptidão online
- [ ] Chat em tempo real
- [ ] Vídeo entrevista integrada
- [ ] Integração LinkedIn

---

## 📝 Licença

Este projeto é **proprietário** e foi desenvolvido exclusivamente para o **Midu Group (Miranda + Duarte)** pela **DeiviTech**.

**Todos os direitos reservados © 2026 DeiviTech**

Uso, cópia, modificação ou distribuição sem autorização expressa é **estritamente proibido**.

---

## 🙏 Agradecimentos

- **Daniel Duarte** - Pela confiança no projeto
- **Midu Group** - Pela parceria estratégica
- **Comunidade Open Source** - React, Vite, Tailwind, Supabase

---

<div align="center">

**Desenvolvido com ❤️ pela [DeiviTech](https://deivitech.com)**

[![GitHub](https://img.shields.io/badge/GitHub-Deivisan-black?style=flat&logo=github)](https://github.com/Deivisan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Deivison%20Santana-blue?style=flat&logo=linkedin)](https://linkedin.com/in/deivisansantana)
[![Website](https://img.shields.io/badge/Website-DeiviTech-orange?style=flat&logo=google-chrome)](https://deivitech.com)

</div>

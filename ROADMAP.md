# 🗺️ ROADMAP MIDU GROUP v4.0.0
**Cliente:** Daniel Duarte - Midu Group (Miranda + Duarte)  
**Nome do Projeto:** Midu Group — Landing Page + Portal de Vagas  
**Data Início:** 08 Maio 2026  
**Objetivo:** Landing page institucional + Portal de recrutamento

---

## 📌 CONTEXTO DO PROJETO

**Estrutura Solicitada:**
1. **Landing Page** (`/`) — Apresentação do Midu Group
   - Hero, Sobre, Serviços, Time
   - CTA: "Ver Vagas Abertas"
2. **Portal de Vagas** (`/vagas`) — Grid de vagas abertas
   - Filtros, busca, detalhes
   - Candidatura com upload PDF
3. **Portal Candidato** (`/vagas/portal`) — Área do candidato
4. **Admin** (`/vagas/admin`) — Painel do recrutador

**Visão do Daniel:**
1. **Agora (Fase 1):** Landing page + Portal básico com candidatura redirecionada pro WhatsApp/Email
2. **Futuro (Fase 2):** Tracker de etapas do processo seletivo na plataforma
3. **Longo prazo (Fase 3):** Banco de talentos interno para filtrar candidatos sem abrir vaga

**Restrições:**
- TCC apresentação: dia 4 ou 6 de Maio 2026
- Não quer lotar caixa de email com currículos
- Quer mover candidatos DENTRO da plataforma futuramente
- Volume esperado: 500-5.000 candidatos/mês

---

## 🎯 FASE 1: LANDING PAGE + PORTAL BÁSICO (TCC)

### Task 1.1: Landing Page do Midu Group
- [ ] **Hero Section:**
  - Título: "Conectando Talentos às Oportunidades"
  - Subtítulo: Apresentação do Midu Group
  - CTA: "Ver Vagas Abertas" → `/vagas`
  - Background/imagem profissional
- [ ] **Seção Sobre:**
  - Missão do Midu Group
  - Visão
  - Valores
  - História breve
- [ ] **Seção Serviços:**
  - O que o Midu Group faz
  - Consultoria em gestão de pessoas
  - Recrutamento e seleção
  - Treinamento e desenvolvimento
- [ ] **Seção Time:**
  - Foto e bio do Daniel (e outros se tiver)
  - Credenciais
- [ ] **Footer:**
  - Contato (WhatsApp, email)
  - Redes sociais
  - Copyright

### Task 1.2: Portal de Vagas (/vagas)
- [ ] **Header/Navbar** (comum a todas páginas):
  - Logo Midu Group
  - Links: Início, Vagas, Sobre, Contato
  - Botão Admin (secreto ou discreto)
- [ ] **Grid de Vagas:**
  - Vagas vindas do banco Supabase
  - Cards com: título, empresa, localização, salário, categoria
  - Thumbnail/ícone
- [ ] **Busca e Filtros:**
  - Campo de busca por texto
  - Filtro por categoria
  - Filtro por localização
  - Filtro por salário
- [ ] **Detalhes da Vaga:**
  - Título, empresa, descrição completa
  - Requisitos
  - Benefícios
  - Localização
  - Salário
  - Botão "Candidatar-se"
- [ ] **Candidatura:**
  - Formulário: Nome, Email, Telefone, LinkedIn (opcional)
  - Upload de currículo (PDF, máx 5MB)
  - Ao candidatar: salva no banco + redireciona WhatsApp/Email
  - Confirmação visual

### Task 1.3: Supabase Setup
- [ ] Criar projeto Supabase
- [ ] Configurar Auth (email/senha)
- [ ] Criar tabelas:
  - `vagas` — id, título, empresa, descrição, requisitos, benefícios, localização, salário, categoria, status,created_at
  - `candidatos` — id, nome, email, telefone, linkedin, created_at
  - `candidaturas` — id, vaga_id, candidato_id, curriculum_url, status, created_at
- [ ] Configurar Storage pra PDFs (bucket "curriculos")
- [ ] Configurar RLS (Row Level Security)
- [ ] Obter API keys

### Task 1.4: Portal Candidato (/vagas/portal)
- [ ] Login/Cadastro do candidato
- [ ] Tab "Meus Dados":
  - Ver/editar perfil
  - Upload currículo
- [ ] Tab "Minhas Candidaturas":
  - Lista de vagas que se candidatou
  - Status (Pendente, Em Análise, etc.)
- [ ] Tab "Currículo":
  - Upload/visualizar PDF

### Task 1.5: Admin Dashboard (/vagas/admin)
- [ ] Login com Supabase Auth (admin/admin)
- [ ] Dashboard:
  - Total de vagas
  - Total de candidatos
  - Total de candidaturas
  - Gráficos (Recharts)
- [ ] CRUD de Vagas:
  - Criar vaga
  - Editar vaga
  - Ativar/Desativar vaga
  - Deletar vaga
- [ ] Gestão de Candidatos:
  - Lista de candidatos
  - Ver currículo (PDF)
  - Mudar status da candidatura
  - Filtros e busca

### Task 1.6: Deploy e TCC
- [ ] Build otimizado
- [ ] Deploy GitHub Pages
- [ ] Testar fluxo completo
- [ ] Preparar apresentação TCC

---

## 👤 FASE 2: PORTAL DE VERDADE (PÓS-TCC)

> "Quero que as pessoas se movimentem dentro da plataforma"

### Task 2.1: Tracker de Etapas
- [ ] Definir etapas: Análise → Entrevista → Case/Teste → Final → Contratado/Reprovado
- [ ] Admin pode mudar status
- [ ] Candidato vê status em tempo real
- [ ] Histórico de mudanças

### Task 2.2: Notificações por Email
- [ ] Configurar Resend
- [ ] Email quando candidatura é recebida
- [ ] Email quando status muda

### Task 2.3: Perfil Completo do Candidato
- [ ] Dados pessoais
- [ ] Experiências profissionais
- [ ] Formação acadêmica
- [ ] Habilidades (tags)

---

## 💎 FASE 3: BANCO DE TALENTOS (QUANDO PRECISAR)

> "Quando estiver recebendo 200 currículos por semana, aí penso no banco"

### Task 3.1: Banco de Candidatos
- [ ] Candidatos ficam salvos mesmo sem vaga aberta
- [ ] Perfis completos
- [ ] Busca por habilidades
- [ ] Pipeline de talentos

### Task 3.2: Dashboard Analytics
- [ ] Métricas de tempo de contratação
- [ ] Taxa de conversão
- [ ] Skills mais demandadas

---

## 📊 CRITÉRIOS DE SUCESSO

### Fase 1 (TCC):
- [ ] Landing page do Midu Group beautiful
- [ ] Portal de vagas com dados reais
- [ ] Candidatos consegue se cadastrar e fazer candidatura
- [ ] Upload de PDF funcionando
- [ ] Redirecionamento WhatsApp/Email
- [ ] Admin vê candidatos no painel
- [ ] Deploy no ar

### Fase 2:
- [ ] Tracker de etapas funcionando
- [ ] Notificações por email
- [ ] Perfil completo do candidato

### Fase 3:
- [ ] Banco de candidatos pesquisável
- [ ] Busca sem necessidade de vaga aberta

---

## 💰 CUSTOS OPERACIONAIS

| Fase | Serviço | Custo |
|------|---------|-------|
| Todas | Supabase Free | **$0** |
| Todas | GitHub Pages | **$0** |
| Todas | Domínio .com.br | **R$ 40/ano** |
| Fase 2+ | Resend | **$0 (3K/mês)** |
| Fase 4 | Supabase Pro | **$25/mês** |

**Resumo:** Fase 1-3 rodando **de graça** (só domínio R$ 40/ano)

---

## 📅 PRAZO ESTIMADO

| Fase | Estimativa |
|------|------------|
| Fase 1 (TCC) | 1-2 semanas |
| Fase 2 | 2-4 semanas |
| Fase 3 | Quando precisar |

---

**Status:** 🚀 EM PLANEJAMENTO  
**Última Atualização:** 08 Maio 2026

---

## 🎯 FASE 1: BASICÃO PRA APRESENTAÇÃO TCC (PRIORIDADE MÁXIMA)

### ✅ Task 1.1: Supabase Setup ✅ EM PROGRESSO
- [ ] Criar projeto Supabase
- [ ] Configurar Auth (email/senha)
- [ ] Criar tabelas: vagas, candidatos, aplicações, uploads
- [ ] Configurar Storage pra PDFs (1GB grátis)
- [ ] Configurar RLS (Row Level Security)
- [ ] Obter API keys e configurar no projeto

### Task 1.2: Backend com Supabase
- [ ] Integrar Supabase Client no projeto
- [ ] CRUD de vagas (admin)
- [ ] CRUD de candidatos (cadastro/login)
- [ ] Candidatura com upload de PDF
- [ ] Redirecionamento WhatsApp/Email (configurável)
- [ ] Admin Dashboard conectado no banco real

### Task 1.3: Candidatura Funcional
- [ ] Formulário candidacy com campos:
  - Nome completo
  - Email
  - Telefone
  - LinkedIn (opcional)
  - Upload de currículo (PDF, máx 5MB)
- [ ] Ao candidatar: guarda no banco + redireciona pra WhatsApp/Email
- [ ] Confirmação visual de candidatura enviada

### Task 1.4: Upload de Currículo
- [ ] Supabase Storage bucket "currículos"
- [ ] Validação de arquivo (PDF, máx 5MB)
- [ ] Upload com progress indicator
- [ ] Link do PDF salvo no banco

### Task 1.5: Admin Dashboard Real
- [ ] Login com Supabase Auth (admin/admin)
- [ ] Listar vagas reais do banco
- [ ] Listar candidatos reais do banco
- [ ] Visualizar currículos (link/embed PDF)
- [ ] CRUD completo de vagas
- [ ] Dashboard com métricas reais

### Task 1.6: Deploy e TCC
- [ ] Build otimizado com dados reais
- [ ] Deploy GitHub Pages
- [ ] Testar fluxo completo candidacy → admin
- [ ] Preparar apresentação TCC

---

## 👤 FASE 2: TRACKER DE ETAPAS (PÓS-TCC)

> "Quero que as pessoas se movimentem dentro da plataforma"

### Task 2.1: Status do Processo Seletivo
- [ ] Definir etapas: Análise → Entrevista → Case/Teste → Final → Contratado/Reprovado
- [ ] Admin pode mudar status do candidato
- [ ] Candidato vê seu status em tempo real
- [ ] Histórico de mudanças de status

### Task 2.2: Notificações por Email
- [ ] Configurar Resend (free tier 3K/mês)
- [ ] Email quando candidacy é recebida
- [ ] Email quando status muda (Análise → Entrevista, etc.)
- [ ] Email quando é aprovado/reprovado

### Task 2.3: Perfil Completo do Candidato
- [ ] Dados pessoais (nome, email, telefone, cidade)
- [ ] Experiências profissionais
- [ ] Formação acadêmica
- [ ] Habilidades (tags)
- [ ] Currículo PDF (já incluso na Fase 1)

### Task 2.4: Filtros Avançados Admin
- [ ] Buscar por nome, email, skills
- [ ] Filtrar por status de candidacy
- [ ] Filtrar por vaga
- [ ] Filtrar por data de candidacy
- [ ] Exportar lista (CSV)

---

## 💎 FASE 3: BANCO DE TALENTOS (QUANDO PRECISAR)

> "Quando estiver recebendo 200 currículos por semana, aí penso no banco"

### Task 3.1: Banco de Candidatos
- [ ] Candidatos ficam salvos mesmo sem vaga aberta
- [ ] Perfis completos com skills e experiências
- [ ] Busca por habilidades específicas
- [ ] Filtro por localização, experiência, formação

### Task 3.2: Pipeline de Talentos
- [ ] Tag "em potencial" para candidates interesantes
- [ ] Contato direto via plataforma (sem vaga)
- [ ] Histórico de contactado
- [ ] Status: Disponível, Contactado, Entrevistando, Contratado

### Task 3.3: Dashboard Analytics
- [ ] Métricas de tempo de contratação
- [ ] Taxa de conversão (candidatos → contratados)
- [ ] Origem dos candidatos (qual vaga veio)
- [ ] Skills mais demandadas
- [ ] NPS de candidates

---

## 🌟 FASE 4: SISTEMA COMPLETO (SONHO)

> "Quero o sistema completo, tipo Gupy/Pontogyn"

- [ ] Testes de aptidão online
- [ ] Chat em tempo real (candidato ↔ recrutador)
- [ ] Vídeo entrevista integrada
- [ ] Matching automático com IA
- [ ] Integração LinkedIn
- [ ] App mobile

---

## 📊 CRITÉRIOS DE SUCESSO

### Fase 1 (TCC):
- [ ] Supabase conectado e funcionando
- [ ] Candidatos consegue se cadastrar e fazer candidacy
- [ ] Admin vê candidates no painel
- [ ] Upload de PDF funcionando
- [ ] Redirecionamento WhatsApp/Email configurável
- [ ] Deploy no ar funcionando

### Fase 2:
- [ ] Tracker de etapas funcionando
- [ ] Candidato vê status em tempo real
- [ ] Notificações por email ativas
- [ ] Perfil completo do candidato

### Fase 3:
- [ ] Banco de candidatos pesquisável
- [ ] Pipeline de talentos
- [ ] Busca sem necessidade de vaga aberta

---

## 💰 CUSTOS OPERACIONAIS

| Fase | Serviço | Custo |
|------|---------|-------|
| Todas | Supabase Free | **$0** |
| Todas | GitHub Pages | **$0** |
| Todas | Domínio .com.br | **R$ 40/ano** |
| Fase 2+ | Resend | **$0 (3K/mês)** |
| Fase 4 | Supabase Pro | **$25/mês** |

**Resumo:** Fase 1-3 rodando **de graça** (só domínio R$ 40/ano)

---

## 📅 PRAZO ESTIMADO

| Fase | Estimativa |
|------|------------|
| Fase 1 (TCC) | 1-2 semanas |
| Fase 2 | 2-4 semanas |
| Fase 3 | Quando precisar |
| Fase 4 | Longo prazo |

---

**Status:** 🚀 EM PLANEJAMENTO  
**Última Atualização:** 08 Maio 2026

# 🗺️ ROADMAP SELECOES-MIDU v3.0.0
**Cliente:** Daniel Duarte - Midu Group  
**Data Início:** 12 Janeiro 2026  
**Objetivo:** Plataforma completa e funcional de Recrutamento e Seleção

---

## 🎯 FASE 1: ADMIN DASHBOARD (PRIORIDADE MÁXIMA)

### ✅ Task 1.1: Sistema de Login Funcional ✅ COMPLETO
- [x] Implementar autenticação real (admin/admin)
- [x] Validação de credenciais
- [x] Feedback visual de erro/sucesso
- [x] Redirect para dashboard após login
- [x] Botão "Sair" funcional
- [x] Persistência de sessão (localStorage)

### ✅ Task 1.2: Dashboard Completo com Gráficos ✅ COMPLETO
**Biblioteca:** Recharts (instalada v3.6.0)

**Métricas Implementadas:**
- [x] Total de vagas ativas/inativas
- [x] Candidatos por status (Pendente/Em Análise/Entrevista/Contratado/Rejeitado)
- [x] Aplicações por mês (gráfico de linha)
- [x] Vagas por categoria (gráfico de pizza)
- [x] Top 5 vagas com mais candidatos
- [x] Empresas parceiras ativas

**Gráficos Implementados:**
- [x] BarChart: Candidatos por status
- [x] LineChart: Aplicações nos últimos 6 meses
- [x] PieChart: Vagas por categoria
- [x] AreaChart: Tendência de contratações

### 🔧 Task 1.3: Seções Funcionais (PARCIAL - 50% COMPLETO)
- [x] **Dashboard:** Visão geral com 6 KPI cards + 4 gráficos interativos
- [x] **Vagas:** CRUD 100% COMPLETO ✅ (Commit c158bc3)
  - [x] Formulário "Nova Vaga" funcional com validação TypeScript
  - [x] Tabela responsiva com hover effects
  - [x] Edição via modal (VagaForm)
  - [x] Deletar com confirmação (window.confirm)
  - [x] Ativar/Desativar vaga (toggle status)
  - [x] Stats cards (Total/Ativas/Inativas)
  - [x] 2 vagas de exemplo (Ford Brasil + Midu Group)
- [ ] **Candidatos:** Gestão completa
  - [ ] Lista com filtros avançados
  - [ ] Visualizar currículo (modal)
  - [ ] Mudar status do candidato
  - [ ] Agendar entrevista
  - [ ] Adicionar notas
  - [ ] Exportar lista (CSV mock)
- [ ] **Relatórios:** 
  - [ ] Relatório de performance mensal
  - [ ] Relatório por vaga
  - [ ] Relatório por recrutador
  - [ ] Download PDF (mock)

---

## 👤 FASE 2: PORTAL CANDIDATO

### 🎨 Task 2.1: Legibilidade e Acessibilidade
- [ ] Aumentar font-size mínimo para 16px (mobile) / 18px (desktop)
- [ ] Line-height: 1.6-1.8 (parágrafos)
- [ ] Contrast ratio: mínimo 4.5:1 (WCAG AA)
- [ ] Garantir todas as palavras visíveis (overflow handling)
- [ ] Melhorar espaçamento entre elementos (padding/margin)

### ⚙️ Task 2.2: Funcionalidades Completas
- [ ] **Tab Vagas:** Busca e filtros funcionais
  - [ ] Filtrar por categoria, localização, salário
  - [ ] Ordenar por data, relevância
  - [ ] Paginação
  - [ ] Detalhes da vaga (modal ou página)
  - [ ] Botão "Candidatar" funcional
- [ ] **Tab Candidaturas:** Histórico completo
  - [ ] Lista de vagas aplicadas
  - [ ] Status em tempo real
  - [ ] Cancelar candidatura
  - [ ] Ver feedback (se disponível)
- [ ] **Tab Perfil:** Edição completa
  - [ ] Upload de foto (mock)
  - [ ] Editar dados pessoais
  - [ ] Upload currículo (mock)
  - [ ] Adicionar experiências
  - [ ] Adicionar formação
  - [ ] Habilidades (tags)
  - [ ] Preferências de vaga

---

## 🌐 FASE 3: PÁGINA PÚBLICA

### 📄 Task 3.1: Seção Sobre (Página Separada)
- [ ] Criar `/sobre.html` dedicado
- [ ] Layout profissional com seções:
  - [ ] Missão e Visão
  - [ ] História da empresa
  - [ ] Time (fotos + bios)
  - [ ] Certificações
  - [ ] Parceiros/Clientes
  - [ ] Contato
- [ ] Hyperlink funcional na navbar (todas as páginas)
- [ ] Breadcrumb para navegação

### 🎨 Task 3.2: Melhorar Cores Gerais
**Problema:** "Tudo está muito branco"

**Soluções:**
- [ ] Backgrounds coloridos sutis:
  - Cards: gradiente leve (3-8% opacidade)
  - Seções alternadas: cinza claro / cor primária 5%
- [ ] Headers com gradientes fortes
- [ ] Badges coloridos (status, categorias)
- [ ] Ícones SVG coloridos (cada categoria)
- [ ] Fotos de stock (equipe, escritórios)
- [ ] Ilustrações SVG (hero, CTAs)

### 🎭 Task 3.3: Adicionar Mais Temas
**Temas Atuais:** 3 (Azul, Verde, Roxo)

**Novos Temas (mínimo 6 total):**
- [ ] Laranja Energia (#f97316)
- [ ] Rosa Moderno (#ec4899)
- [ ] Ciano Tecnologia (#06b6d4)
- [ ] Indigo Corporativo (#6366f1)
- [ ] Vermelho Dinâmico (#ef4444)
- [ ] Amarelo Criativo (#eab308)

**Cada tema:**
- Primary, Primary Dark, Primary Light
- Gradientes únicos
- Preview no ViewSelector

### 🔗 Task 3.4: Todos os Links Funcionais
- [ ] Navbar: Vagas, Sobre, Empresas, Contato
- [ ] Botões CTA: "Candidate-se", "Ver Vaga", "Saiba Mais"
- [ ] Footer: Links sociais, políticas, sitemap
- [ ] Categorias: Filtrar vagas ao clicar
- [ ] Empresas: Ver vagas da empresa

---

## 🔧 FASE 4: INFRAESTRUTURA

### 📦 Task 4.1: Atualizar Dependências
**Verificar Latest Versions:**
- [ ] React (atual: 19.x → latest stable)
- [ ] Vite (atual: 7.3.1 → latest)
- [ ] TypeScript (verificar latest)
- [ ] TailwindCSS (se houver)
- [ ] Recharts (adicionar)

**Comandos:**
```bash
bun outdated
bun update
```

### 🐛 Task 4.2: Resolver Incompatibilidades
- [ ] Testar build após updates
- [ ] Corrigir breaking changes
- [ ] Verificar tipos TypeScript
- [ ] Atualizar imports (se necessário)

### 🌐 Task 4.3: Verificar GitHub Pages
- [ ] Acessar https://deivisan.github.io/SELECOES-MIDU/
- [ ] Testar redirect index.html → public.html
- [ ] Verificar todas as rotas (public, portal, admin, sobre)
- [ ] Testar ViewSelector em produção
- [ ] Validar assets (CSS, JS, imagens)
- [ ] Lighthouse score (Performance, Accessibility, Best Practices, SEO)

### 🧹 Task 4.4: Limpar Workspace
**Arquivos a Remover:**
- [ ] `/temp/` (se existir)
- [ ] Arquivos de teste (`*.test.ts`, `*.spec.ts` não usados)
- [ ] Logs desnecessários
- [ ] `.DS_Store`, `Thumbs.db`
- [ ] Comentários de código morto

**Arquivos a Organizar:**
- [ ] Consolidar mocks em `/src/shared/data/`
- [ ] Criar `/docs/` para documentação
- [ ] Mover PROMPTS-NANO-BANANA.md para `/docs/`

---

## 📊 FASE 5: AGREGAÇÃO DE VALOR

### 💎 Task 5.1: Dashboard Admin - Insights Avançados
- [ ] **KPIs Dinâmicos:**
  - Taxa de aceitação de vagas
  - Custo por contratação (mock)
  - Diversidade (gênero, idade, localização)
  - NPS de candidatos (mock)
- [ ] **Alertas Inteligentes:**
  - Vagas sem candidatos há > 7 dias
  - Candidatos pendentes > 14 dias
  - Entrevistas agendadas hoje/semana
- [ ] **Comparações:**
  - Mês atual vs mês anterior
  - Tendências (↑↓ com %)
- [ ] **Filtros Avançados:**
  - Por período (hoje, semana, mês, trimestre, ano)
  - Por recrutador (se implementar multi-user)
  - Por localização (cidades da Bahia)

### 🎨 Task 5.2: Melhorias Visuais
- [ ] Skeleton loaders (carregamento)
- [ ] Animações de transição (Framer Motion?)
- [ ] Tooltips informativos
- [ ] Modais polidos (confirmações, formulários)
- [ ] Empty states elegantes ("Nenhuma vaga encontrada")
- [ ] Success/Error toasts (notificações)

### 📱 Task 5.3: Responsividade Total
- [ ] Mobile First (320px+)
- [ ] Tablet (768px+)
- [ ] Desktop (1024px+)
- [ ] Wide (1440px+)
- [ ] Testar em Chrome, Firefox, Safari, Edge

---

## 🚀 ORDEM DE EXECUÇÃO AGENTICA

### Sprint 1: Admin Login + Dashboard Base (1-2h)
1. Task 1.1: Login funcional
2. Task 1.2: Dashboard com gráficos básicos
3. Task 4.3: Verificar Pages online
4. Commit: "feat: admin login funcional + dashboard com gráficos"

### Sprint 2: Admin CRUD + Portal Legibilidade (1-2h)
5. Task 1.3: CRUD de vagas
6. Task 2.1: Melhorar legibilidade Portal
7. Task 2.2: Funcionalidades Portal
8. Commit: "feat: CRUD admin + portal candidato melhorado"

### Sprint 3: Sobre + Cores + Temas (1h)
9. Task 3.1: Página Sobre separada
10. Task 3.2: Melhorar cores gerais
11. Task 3.3: Adicionar 3 novos temas
12. Commit: "feat: página sobre + 6 temas + cores vibrantes"

### Sprint 4: Links Funcionais + Infra (1h)
13. Task 3.4: Todos os links funcionais
14. Task 4.1: Atualizar dependências
15. Task 4.2: Resolver incompatibilidades
16. Task 4.4: Limpar workspace
17. Commit: "refactor: links funcionais + deps atualizadas + workspace limpo"

### Sprint 5: Agregação de Valor + Polish (1h)
18. Task 5.1: Insights avançados dashboard
19. Task 5.2: Melhorias visuais
20. Task 5.3: Responsividade total
21. Task 4.3: Lighthouse + testes finais
22. Commit: "feat: v3.0.0 - plataforma completa e profissional"

---

## ✅ CRITÉRIOS DE SUCESSO

### Admin Dashboard:
- [x] Login com admin/admin funciona
- [ ] Dashboard mostra 6+ gráficos diferentes
- [ ] Todas as seções (Dashboard, Vagas, Candidatos, Relatórios) clicáveis
- [ ] CRUD de vagas 100% funcional
- [ ] Gestão de candidatos completa

### Portal Candidato:
- [ ] Todas as palavras legíveis (nenhuma cortada)
- [ ] Contrast ratio > 4.5:1
- [ ] 3 tabs funcionais (Vagas, Candidaturas, Perfil)
- [ ] Edição de perfil completa

### Página Pública:
- [ ] Seção Sobre em `/sobre.html`
- [ ] 6+ temas de cores
- [ ] Cores vibrantes (redução de 80% do branco)
- [ ] Todos os links/botões funcionais

### Infraestrutura:
- [ ] Dependências atualizadas (latest stable)
- [ ] Build sem erros
- [ ] GitHub Pages funcionando 100%
- [ ] Workspace limpo (sem arquivos de teste)

### Valor Agregado:
- [ ] Dashboard com 10+ KPIs
- [ ] Gráficos interativos
- [ ] Responsividade total (mobile → desktop)
- [ ] Performance Lighthouse > 90

---

## 📅 PRAZO ESTIMADO
**Total:** 6-8 horas de desenvolvimento agentico  
**Entrega Final:** 13 Janeiro 2026

---

**Status:** 🚀 EM EXECUÇÃO  
**Última Atualização:** 12 Janeiro 2026 20:30

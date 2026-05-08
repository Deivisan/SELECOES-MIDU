# 🎨 OpenDesign Prompt — Midu Group (Landing Page + Portal de Vagas)

## Contexto do Projeto

**Cliente:** Daniel Duarte - Midu Group (Miranda + Duarte)  
**Empresa:** Consultoria em gestão de pessoas e recrutamento especializado na Bahia  
**Data:** Maio 2026  
**Objetivo do TCC:** Apresentar a landing page + portal de vagas funcional  

---

## Estrutura do Site

O Midu Group terá 4 seções principais:

### 1. Landing Page (`/`)
Página institucional do Midu Group que apresenta a empresa.

**Seções obrigatórias:**
- **Hero:**
  - Título: "Conectando Talentos às Oportunidades"
  - Subtítulo: "Consultoria em gestão de pessoas e recrutamento especializado na Bahia"
  - CTA Principal: "Ver Vagas Abertas" (botão grande, cor primária)
  - CTA Secundário: "Conheça o Midu Group" (link)
  - Background: imagem profissional ou gradient sofisticado
  - Logo Midu Group no topo

- **Sobre:**
  - Título: "Sobre o Midu Group"
  - Missão: "Conectamos pessoas e empresas para construir carreiras de sucesso"
  - Visão: "Ser referência em recrutamento e seleção na Bahia"
  - Valores: Inovação, Comprometimento, Transparência, Diversidade
  - História breve (empresa jovem, focada em conectarpessoas)
  - 3 cards com ícones: Consultoria, Recrutamento, Treinamento

- **Serviços:**
  - Título: "Nossos Serviços"
  - 4 cards com:
    1. Recrutamento e Seleção - "Encontramos o profissional ideal para sua vaga"
    2. Consultoria em RH - "Assessoria especializada para sua empresa"
    3. Treinamento e Desenvolvimento - "Capacitação profissional"
    4. Banco de Talentos - "Candidatos qualificados para quando você precisar"
  - Cada card: ícone, título, descrição curta, CTA "Saiba mais"

- **Time:**
  - Título: "Nossa Equipe"
  - Cards com foto, nome, cargo, breve bio
  - Daniel Duarte - Fundador e Consultor de Recrutamento
  - Campo pra adicionar mais membros no futuro
  - Mini bio sobre experiência

- **CTA Final:**
  - Título: "Pronto para encontrar seu próximo talento?"
  - Subtítulo: "Cadastre-se gratuitamente e acompanhe suas candidaturas"
  - Botão: "Ver Vagas Abertas"
  - Background destacado (cor primária escura)

- **Footer:**
  - Logo Midu Group
  - Links: Início, Vagas, Sobre, Contato, Admin
  - Contato: WhatsApp, Email
  - Redes sociais (LinkedIn, Instagram)
  - Copyright: "© 2026 Midu Group - Todos os direitos reservados"

---

### 2. Portal de Vagas (`/vagas`)
Página pública que lista todas as vagas abertas.

**Elementos:**
- **Header/Navbar:**
  - Logo Midu Group (esquerda)
  - Links: Início, Vagas (ativo), Sobre, Contato
  - Botão: "Portal do Candidato" (entrar/cadastrar)
  - Botão Admin discreto (canto direito)

- **Hero interno:**
  - Título: "Vagas Abertas"
  - Subtítulo: "Encontre a oportunidade ideal para sua carreira"
  - Breadcrumb: Home > Vagas

- **Busca e Filtros:**
  - Campo de busca com ícone de lupa
  - Placeholder: "Buscar por título, empresa ou palavra-chave..."
  - Filtros em dropdown/botões:
    - Categoria: Todos, Tecnologia, Saúde, Educação, Vendas, Administração, Outros
    - Localização: Todos, Salvador, Feira de Santana, Remoto
    - Salário: Todos, A combinar, Até R$2.000, R$2.000-R$5.000, R$5.000+
  - Botão "Limpar Filtros"

- **Grid de Vagas:**
  - Layout: 3 colunas em desktop, 2 tablet, 1 mobile
  - Cards de vaga com:
    - Badge de categoria (cor por categoria)
    - Título da vaga (bold)
    - Nome da empresa contratante
    - Localização + ícone
    - Salário + ícone
    - Data de publicação: "há X dias"
    - Botão "Ver Detalhes" → abre modal ou vai pra página de detalhes

- **Pagination:**
  - Números de página: 1 2 3 ... 10
  - Botão "Anterior" / "Próxima"
  - Info: "Mostrando 1-10 de 47 vagas"

- **Empty State:**
  - Ícone de pasta vazia
  - Título: "Nenhuma vaga encontrada"
  - Subtítulo: "Tente ajustar seus filtros ou volte mais tarde"
  - Botão: "Limpar Filtros"

---

### 3. Detalhes da Vaga (modal ou página `/vagas/[id]`)
Página individual de cada vaga aberta.

**Elementos:**
- **Breadcrumb:** Home > Vagas > [Nome da Vaga]

- **Header da vaga:**
  - Badge de categoria
  - Título: "Analista de Recursos Humanos"
  - Empresa: "Empresa XPTO"
  - Localização: "Salvador, BA"
  - Salário: "R$ 3.500,00"
  - Data: "Publicada há 3 dias"
  - Badge status: "Ativa"

- **Seção Descrição:**
  - Título: "Sobre a vaga"
  - Texto completo da descrição
  - Quebras de parágrafo legíveis

- **Seção Requisitos:**
  - Título: "Requisitos"
  - Lista com bullets ou checkmarks
  - Ex: "Ensino superior completo em RH ou administração"
  - Ex: "Experiência mínima de 2 anos na área"
  - Ex: "Conhecimento em Excel avançado"

- **Seção Benefícios:**
  - Título: "Benefícios"
  - Lista de benefícios
  - Ex: "Vale-transporte"
  - Ex: "Vale-refeição"
  - Ex: "Plano de saúde"
  - Ex: "Auxílio home office"

- **Seção Informações:**
  - Tipo de contrato: CLT
  - Carga horária: 40h semanais
  - Nível: Pleno
  - Quantidade de vagas: 1

- **CTA de Candidatura:**
  - Botão grande: "Candidatar-se"
  - Subtexto: "Você será redirecionado para se cadastrar e enviar seu currículo"
  - Ícone de seta ou WhatsApp

- **Sidebar (desktop):**
  - Resumo rápido da vaga
  - Botão "Candidatar-se" (fixo)
  - Compartilhar: LinkedIn, WhatsApp, Email
  - Botão "Voltar às vagas"

---

### 4. Formulário de Candidatura (`/vagas/candidatar/[id]`)
Página/formulário para o candidato se cadastrar e enviar candidacy.

**Elementos:**
- **Header:**
  - Título: "Candidatar-se"
  - Subtítulo: "Vaga: [Nome da Vaga]"
  - Breadcrumb: Home > Vagas > [Vaga] > Candidatar-se

- **Formulário:**
  - Campo: Nome completo (obrigatório)
  - Campo: Email (obrigatório, validação)
  - Campo: Telefone (obrigatório, máscara)
  - Campo: LinkedIn (opcional)
  - Campo: Cidade (obrigatório)
  - Campo: Currículo (obrigatório, upload PDF, máx 5MB)
    - Área de drop zone
    - Ícone de documento
    - Texto: "Arraste seu currículo aqui ou clique para selecionar"
    - Texto: "Formato: PDF, máximo 5MB"
    - Preview do arquivo selecionado
    - Botão "Remover" se já selecionado

- **Checkbox Termos:**
  - Checkbox: "Li e aceito os termos de privacidade"
  - Link: "Ver termos" (abre modal)

- **Botão Submeter:**
  - Texto: "Enviar Candidatura"
  - Loading state: "Enviando..."
  - Disabled se campos obrigatórios vazios

- **Mensagem de Sucesso (depois de enviar):**
  - Confetti ou ícone de check verde
  - Título: "Candidatura Enviada!"
  - Subtítulo: "Sua candidatura foi recebida com sucesso."
  - Info: "Você será redirecionado para o WhatsApp do recrutador para dar continuidade."
  - Botão: "Conversar no WhatsApp"
  - Botão: "Voltar às Vagas"

- **Mensagem de Erro:**
  - Ícone de X vermelho
  - Título: "Ops! Algo deu errado"
  - Subtítulo: "[Mensagem de erro específica]"
  - Botão: "Tentar novamente"

---

### 5. Portal do Candidato (`/vagas/portal`)
Área logada do candidato para gerenciar seus dados e candidaturas.

**Elementos:**

#### 5.1 Header/Navbar:
- Logo Midu Group
- Links: Início, Vagas
- Avatar do candidato + Nome + Menu dropdown
  - Meu Perfil
  - Minhas Candidaturas
  - Sair

#### 5.2 Tabs:
- Tab 1: "Minhas Candidaturas" (default)
- Tab 2: "Meu Perfil"
- Tab 3: "Meu Currículo"

#### 5.3 Tab Minhas Candidaturas:
- Título: "Minhas Candidaturas"
- Subtítulo: "Acompanhe o status das suas candidaturas"

**Lista de candidaturas:**
- Card de candidatura com:
  - Nome da vaga
  - Nome da empresa
  - Data de candidacy: "Candidatou-se em [data]"
  - Status badge:
    - Pendente (amarelo)
    - Em Análise (azul)
    - Entrevista (roxo)
    - Teste/Case (laranja)
    - Final (verde claro)
    - Aprovado (verde)
    - Reprovado (vermelho)
  - Botão "Ver Detalhes"
  - Timeline/track de etapas (visual)

**Empty State (se nenhuma candidatura):**
- Ícone de documento
- Título: "Você ainda não se candidatou a nenhuma vaga"
- Subtítulo: "Explore nossas vagas abertas e dê o primeiro passo"
- Botão: "Ver Vagas Abertas"

#### 5.4 Tab Meu Perfil:
- Título: "Meu Perfil"
- Subtítulo: "Mantenha seus dados atualizados"

**Formulário de edição:**
- Campo: Nome completo (editável)
- Campo: Email (editável)
- Campo: Telefone (editável)
- Campo: LinkedIn (editável)
- Campo: Cidade (editável)
- Botão: "Salvar Alterações"
- Botão: "Cancelar"

#### 5.5 Tab Meu Currículo:
- Título: "Meu Currículo"
- Subtítulo: "Gerencie seu currículo PDF"

**Área de upload:**
- Se não tem currículo:
  - Drop zone
  - Texto: "Arraste seu currículo aqui ou clique para selecionar"
  - Botão: "Selecionar Arquivo"
- Se tem currículo:
  - Preview do PDF (embed ou ícone)
  - Nome do arquivo
  - Tamanho do arquivo
  - Data de upload
  - Botão: "Atualizar Currículo"
  - Botão: "Baixar Currículo"

---

### 6. Admin Dashboard (`/vagas/admin`)
Painel administrativo do recrutador para gerenciar vagas e candidatos.

**Elementos:**

#### 6.1 Login (`/vagas/admin/login`):
- Card centralizado
- Logo Midu Group
- Título: "Acesso Restrito"
- Campo: Usuário
- Campo: Senha (com show/hide)
- Botão: "Entrar"
- Checkbox: "Lembrar-me"
- Link: "Esqueceu a senha?"
- Mensagem de erro (se inválido)

#### 6.2 Dashboard (após login):
- **Sidebar:**
  - Logo Midu Group
  - Avatar + Nome do admin
  - Links:
    - Dashboard (com ícone)
    - Vagas (com ícone)
    - Candidatos (com ícone)
    - Relatórios (com ícone)
  - Botão: "Nova Vaga" (CTA destacado)
  - Botão: "Sair" (footer da sidebar)

- **Header:**
  - Título da página atual
  - Data/hora atual
  - Notificações (ícone com badge)
  - Avatar admin

- **Dashboard KPIs:**
  - Card 1: Total de Vagas (número grande)
  - Card 2: Vagas Ativas
  - Card 3: Total de Candidatos
  - Card 4: Candidaturas este mês
  - Card 5: Candidaturas pendentes
  - Card 6: Entrevistas agendadas

- **Gráficos:**
  - Gráfico 1: Candidatos por Status (BarChart)
  - Gráfico 2: Candidaturas nos Últimos 6 Meses (LineChart)
  - Gráfico 3: Vagas por Categoria (PieChart)
  - Gráfico 4: Tendência de Contratações (AreaChart)

- **Tabela Recent Candidatos:**
  - Colunas: Nome, Vaga, Status, Data
  - Rows com dados mock
  - Botão "Ver todos" → página de candidatos

#### 6.3 Gestão de Vagas:
- **Header:**
  - Título: "Gerenciar Vagas"
  - Botão: "Nova Vaga"

- **Tabela de Vagas:**
  - Colunas: Título, Empresa, Categoria, Status, Candidatos, Ações
  - Status badges: Ativa (verde), Inativa (cinza)
  - Ações: Editar, Ativar/Desativar, Deletar
  - Filtros: Buscar, por status, por categoria
  - Paginação

- **Modal Nova Vaga / Editar Vaga:**
  - Campo: Título da vaga
  - Campo: Empresa contratante
  - Campo: Descrição (textarea)
  - Campo: Requisitos (textarea ou lista)
  - Campo: Benefícios (textarea ou lista)
  - Campo: Localização (dropdown ou texto)
  - Campo: Salário (texto ou range)
  - Campo: Categoria (dropdown)
  - Campo: Tipo de contrato (CLT, PJ, Estágio)
  - Campo: Status (Ativo/Inativo)
  - Botão: "Salvar Vaga"
  - Botão: "Cancelar"

#### 6.4 Gestão de Candidatos:
- **Header:**
  - Título: "Candidatos"
  - Contador: "47 candidatos"

- **Filtros:**
  - Busca por nome/email
  - Filtro por status (Pendente, Em Análise, etc.)
  - Filtro por vaga
  - Filtro por data

- **Tabela de Candidatos:**
  - Colunas: Nome, Email, Telefone, Vaga, Status, Currículo, Data, Ações
  - Status badge colorido
  - Ícone para ver currículo (PDF)
  - Botão: "Ver Detalhes"
  - Botão: "Mudar Status" (dropdown)
  - Botão: "Exportar CSV"

- **Modal Ver Candidato:**
  - Header: Nome do candidato
  - Tabs: Dados Pessoais, Currículo, Histórico
  - Dados: Nome, Email, Telefone, LinkedIn, Cidade
  - Currículo: Preview ou download
  - Status atual com dropdown pra mudar
  - Timeline de status (Análise → Entrevista → etc.)
  - Botão: "Salvar"
  - Botão: "Fechar"

#### 6.5 Relatórios:
- Título: "Relatórios"
- Cards de relatório:
  - Relatório Mensal
  - Relatório por Vaga
  - Relatório de Performance
- Botão: "Gerar Relatório" (gera PDF ou abre modal)

---

## Design System

### Paleta de Cores (Proposta):
```
Primária:     #2563eb (Azul profissional)
Primária Escura: #1d4ed8
Secundária:   #0d9488 (Teal)
Accent:       #f59e0b (Amarelo/Laranja)
Sucesso:      #10b981 (Verde)
Erro:         #ef4444 (Vermelho)
Alerta:       #f59e0b (Amarelo)
Fundo:        #ffffff
Fundo Sec:    #f8fafc
Texto:        #1e293b (gray-800)
Texto Sec:    #64748b (gray-500)
Bordas:       #e2e8f0 (gray-200)
```

### Tipografia:
- Font Family: Inter (Google Fonts)
- Headings: font-weight 700
- Body: font-weight 400, line-height 1.7
- Sizes: 14px (mobile), 16px (desktop)

### Espaçamento:
- Padding cards: 24px
- Gap sections: 64px (desktop), 48px (mobile)
- Border-radius: 8px (cards), 6px (buttons), 12px (modals)

### Responsividade:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Componentes:
- Botões primários, secundários, outline
- Cards com shadow sutil
- Inputs com focus states
- Badges coloridos por categoria/status
- Modais com overlay
- Toasts para notificações
- Loading spinners
- Skeleton loaders
- Empty states

---

## Requisitos Técnicos

### Estrutura de Páginas:
```
/                          → Landing Page
/vagas                     → Grid de Vagas
/vagas/[id]                → Detalhes da Vaga
/vagas/candidatar/[id]     → Formulário de Candidatura
/vagas/portal              → Portal do Candidato (logado)
/vagas/portal/candidaturas → Minhas Candidaturas
/vagas/portal/perfil       → Meu Perfil
/vagas/portal/curriculo    → Meu Currículo
/vagas/admin               → Admin Dashboard
/vagas/admin/login        → Login Admin
/vagas/admin/vagas         → Gestão de Vagas
/vagas/admin/candidatos    → Gestão de Candidatos
/vagas/admin/relatorios    → Relatórios
```

### Fluxo de Usuário:

**Candidato:**
1. Acessa landing page → clica "Ver Vagas"
2. Navega/vaga/filtra vagas
3. Clica em vaga → vê detalhes
4. Clica "Candidatar-se" → formulário
5. Preenche dados + upload currículo
6. Envia → confirmação + redirecionamento WhatsApp
7. Cadastra-se no portal (futuro)

**Admin:**
1. Acessa /vagas/admin → login
2. Dashboard com métricas
3. Gerencia vagas (CRUD)
4. Gerencia candidatos (ver currículos, mudar status)
5. Gera relatórios

### Funcionalidades Chave:
- Candidatura: salvar no banco + redirecionamento WhatsApp/Email
- Upload de currículo: PDF, máx 5MB, storage no Supabase
- Status tracking: Análise → Entrevista → Case → Final → Aprovado/Reprovado
- Notificações por email (futuro)
- Dashboard com gráficos Recharts

---

## Output Esperado

Gerar TODAS as interfaces como:
1. **HTML individual** para cada página (protótipo navegável)
2. **Design system** configurado (cores, tipografia, componentes)
3. **Responsivo** (mobile-first)
4. **Interativo** (hover states, modais, formulários funcionais)
5. **Preview em iframe** para visualização imediata
6. **Export** em HTML/PDF

---

## Constraints

- Usar design system consistente em todas as páginas
- Manter acessibilidade WCAG AA
- Semantic HTML
- Mobile-first
- Performance otimizada
- Sem dependências externas pesadas
- Semantic versioning
- Comments explicativos no código

---

**IMPORTANTE:** Gerar TODAS as páginas listadas acima, com qualidade de produção, não de wireframe.

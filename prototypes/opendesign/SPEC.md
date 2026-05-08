# Midu Group - Especificação do Projeto

## Visão Geral
Sistema completo de portal de vagas e recrutamento para Midu Group (Daniel Duarte) - Consultoria em gestão de pessoas e recrutamento especializado na Bahia.

## Estrutura de Arquivos

### Landing Page e Público
- `index.html` - Landing page principal com Hero, Sobre, Serviços, Time, CTA e Footer
- `vagas.html` - Portal de vagas público (grid de vagas, busca, filtros, paginação)
- `vaga-detalhes.html` - Detalhes da vaga com descrição, requisitos, benefícios
- `candidatar-se.html` - Formulário de candidatura com upload de currículo

### Portal do Candidato (`portal/`)
- `portal.html` - Portal principal com tabs (Minhas Candidaturas, Meu Perfil, Meu Currículo)
- `portal/candidaturas.html` - Lista de candidaturas do candidato
- `portal/perfil.html` - Edição de dados pessoais
- `portal/curriculo.html` - Gerenciamento de currículo PDF

### Admin Dashboard (`admin/`)
- `admin/login.html` - Login administrativo (usuário: admin, senha: admin123)
- `admin/index.html` - Dashboard com KPIs e gráficos funcionais (Canvas)
- `admin/vagas.html` - Gestão de vagas (CRUD completo)
- `admin/vagas-nova.html` - Cadastro de nova vaga
- `admin/vagas-editar.html` - Edição de vaga existente
- `admin/candidatos.html` - Gestão de candidatos (filtros, ações)
- `admin/candidato-detalhes.html` - Detalhes do candidato com timeline e status
- `admin/relatorios.html` - Relatórios disponíveis

### Estilos e Configuração
- `styles.css` - Design system completo com variáveis CSS, componentes, utilitários e responsividade

## Funcionalidades Implementadas

### Público
1. **Landing Page** - Apresentação da empresa com seções: Hero, Sobre (missão/visão/valores), Serviços (4 cards), Time, CTA e Footer
2. **Portal de Vagas** - Lista em grid, busca por texto, filtros por categoria/localização/salário, paginação
3. **Detalhes da Vaga** - Informações completas, descrição, requisitos, benefícios, botão de candidatura
4. **Candidatura** - Formulário completo, upload de PDF (drag & drop), validação, termos de privacidade, redirecionamento WhatsApp

### Portal do Candidato
1. **Autenticação** - Login persistido (localStorage)
2. **Minhas Candidaturas** - Lista com status, timeline visual, histórico
3. **Meu Perfil** - Edição de dados pessoais
4. **Meu Currículo** - Upload, visualização, atualização e exclusão de PDF

### Admin Dashboard
1. **Login** - Acesso restrito (admin/admin123), togggle de senha, "Lembrar-me"
2. **Dashboard** - 6 KPIs, 4 gráficos funcionais em Canvas (Barras, Linha, Pizza, Área)
3. **Gestão de Vagas** - CRUD completo, busca, filtros, ativar/desativar, excluir
4. **Gestão de Candidatos** - Lista completa, mudança de status, timeline, export CSV
5. **Relatórios** - 3 tipos de relatórios, geração por período/formato
6. **Detalhes do Candidato** - Timeline completa, mudança de status, WhatsApp integration

## Design System

### Cores
- Primary: #2563eb (Azul profissional)
- Primary Dark: #1d4ed8
- Secondary: #0d9488 (Teal)
- Accent: #f59e0b (Amarelo/Laranja)
- Success: #10b981 (Verde)
- Error: #ef4444 (Vermelho)
- Warning: #f59e0b (Amarelo)
- Background: #ffffff
- Background Secondary: #f8fafc
- Text: #1e293b
- Text Muted: #64748b
- Border: #e2e8f0

### Tipografia
- Font Family: Inter (Google Fonts)
- Headings: font-weight 700
- Body: font-weight 400, line-height 1.6
- Sizes: 12px (mobile), 16px (desktop)

### Componentes
- Botões: primary, secondary, outline, ghost (vários tamanhos)
- Cards com hover effects e shadows
- Badges coloridos por categoria/status
- Formulários com focus states
- Tabelas com hover states
- Modais com overlay
- Dropdowns com animações
- Tabs funcionais
- Toast notifications (alerts)

## Tecnologias
- HTML5 semântico
- CSS3 com variáveis (Custom Properties)
- JavaScript Vanilla (ES6+)
- Canvas API para gráficos
- LocalStorage para persistência
- Design responsivo (Mobile First)
- Sem dependências externas pesadas

## Status do Projeto
✅ Landing Page (index.html) - Completo
✅ Portal de Vagas (vagas.html) - Completo
✅ Detalhes da Vaga (vaga-detalhes.html) - Completo
✅ Candidatura (candidatar-se.html) - Completo com upload
✅ Portal do Candidato (portal.html) - Completo com tabs
✅ Perfil (portal/perfil.html) - Completo
✅ Currículo (portal/curriculo.html) - Completo
✅ Candidaturas (portal/candidaturas.html) - Completo
✅ Login Admin (admin/login.html) - Completo
✅ Dashboard (admin/index.html) - Completo com gráficos Canvas
✅ Gestão Vagas (admin/vagas.html) - Completo
✅ Nova Vaga (admin/vagas-nova.html) - Completo
✅ Editar Vaga (admin/vagas-editar.html) - Completo
✅ Gestão Candidatos (admin/candidatos.html) - Completo
✅ Detalhes Candidato (admin/candidato-detalhes.html) - Completo
✅ Relatórios (admin/relatorios.html) - Completo
✅ Styles.css - Design system completo

## Próximos Passos (Sugestões)
1. Integração com backend real (Supabase/PostgreSQL)
2. Sistema de autenticação JWT real
3. Upload de currículos para storage (Supabase Storage)
4. Envio de notificações por email/WhatsApp
5. Geração real de relatórios em PDF
6. Testes automatizados (Cypress/Playwright)
7. Deploy em produção (Vercel/Netlify)

## Deploy
Todas as páginas são arquivos HTML estáticos navegáveis.
Abra qualquer arquivo no navegador para visualizar.
O `admin/login.html` é o ponto de entrada para o admin (admin/admin123).
# Midu Group - Sistema Completo de Recrutamento

## 📋 Estrutura do Projeto

### Landing Page e Público
- `index.html` - Landing page principal (Hero, Sobre, Serviços, Time, CTA, Footer)
- `vagas.html` - Portal de vagas público (grid, busca, filtros, paginação)
- `vaga-detalhes.html` - Detalhes da vaga com descrição, requisitos, benefícios
- `candidatar-se.html` - Formulário de candidatura com upload de currículo

### Portal do Candidato (`portal/`)
- `portal.html` - Portal principal com tabs (Minhas Candidaturas, Meu Perfil, Meu Currículo)
- `portal/candidaturas.html` - Lista de candidaturas do candidato
- `portal/perfil.html` - Edição de dados pessoais
- `portal/curriculo.html` - Gerenciamento de currículo PDF

### Admin Dashboard (`admin/`)
- `admin/login.html` - Login administrativo (admin/admin123)
- `admin/index.html` - Dashboard com KPIs e gráficos Canvas funcionais
- `admin/vagas.html` - Gestão de vagas (CRUD completo)
- `admin/vagas-nova.html` - Cadastro de nova vaga
- `admin/vagas-editar.html` - Edição de vaga existente
- `admin/candidatos.html` - Gestão de candidatos (filtros, ações)
- `admin/candidato-detalhes.html` - Detalhes do candidato com timeline
- `admin/relatorios.html` - Relatórios disponíveis

### Estilos
- `styles.css` - Design system completo com variáveis CSS, componentes, utilitários

## 🎨 Funcionalidades

### Público
✅ Landing page responsiva com animações
✅ Portal de vagas com busca e filtros
✅ Detalhes da vaga com seções completas
✅ Formulário de candidatura com upload drag & drop
✅ Validação de PDF (tamanho máximo 5MB)

### Portal do Candidato
✅ Sistema de login simulado
✅ Acompanhamento de candidaturas
✅ Edição de perfil
✅ Upload/atualização de currículo
✅ Timeline de status

### Admin
✅ Dashboard com 6 KPIs
✅ 4 gráficos funcionais em Canvas (Barras, Linha, Pizza, Área)
✅ CRUD completo de vagas
✅ Gestão de candidatos com mudança de status
✅ Timeline visual do candidato
✅ Geração de relatórios
✅ Navegação entre todas as telas

## 🚀 Tecnologias
- HTML5 semântico
- CSS3 com Custom Properties
- JavaScript Vanilla (ES6+)
- Canvas API para gráficos
- Design responsivo (Mobile First)
- Sem dependências externas pesadas

## 📂 Como Navegar

1. **Landing Page**: Abra `index.html`
2. **Portal de Vagas**: Clique em "Ver Vagas Abertas" ou acesse `vagas.html`
3. **Candidatura**: Na página da vaga, clique em "Candidatar-se"
4. **Portal do Candidato**: Acesse `portal.html` (simula login automático)
5. **Admin**: Acesse `admin/login.html` (usuário: admin, senha: admin123)

## ✅ Status
TODAS as 14+ páginas foram criadas e estão funcionais!

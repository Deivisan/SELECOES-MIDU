# Seleções Midu - Versão Next.js 16

Plataforma moderna de recrutamento e seleção desenvolvida com Next.js 16, TypeScript e tecnologias de ponta.

## 🚀 Tecnologias Utilizadas

- **Next.js 16** - Framework React full-stack com App Router
- **TypeScript** - Tipagem segura para o desenvolvimento
- **Tailwind CSS 4** - Framework CSS utilitário moderno
- **Bun** - Runtime JavaScript ultra-rápido
- **Server Components** - Renderização no servidor para performance
- **API Routes** - Backend integrado na aplicação

## 📁 Estrutura do Projeto

```
selecoes-midu/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── api/              # Rotas da API
│   │   │   ├── jobs/         # Endpoint para vagas
│   │   │   └── forms/        # Formulários diversos
│   │   ├── vagas/            # Página de vagas
│   │   ├── portal/           # Portal do candidato
│   │   ├── empresas/         # Página de empresas
│   │   ├── sobre/            # Sobre a empresa
│   │   └── admin/            # Painel administrativo
│   ├── components/           # Componentes reutilizáveis
│   ├── types/               # Definições TypeScript
│   └── data/               # Dados mockados
```

## 🎯 Funcionalidades

### 🏠 Página Principal
- Busca inteligente de vagas com filtros avançados
- Destaque para oportunidades exclusivas
- Estatísticas em tempo real
- Design responsivo e moderno

### 💼 Portal do Candidato
- Dashboard personalizado com estatísticas
- Gerenciamento de candidaturas
- Perfil completo com currículo
- Vagas salvas e favoritas

### 🏢 Página de Empresas
- Catálogo de empresas parceiras
- Informações detalhadas sobre cada empresa
- Avaliações e reputação
- Vagas por empresa

### 👨‍💼 Painel Administrativo
- Gestão completa de vagas (CRUD)
- Análise de candidaturas
- Estatísticas avançadas
- Exportação de dados

### 📖 Sobre a Empresa
- História e valores
- Linha do tempo interativa
- Diferenciais competitivos
- Formas de contato

## 🔧 Instalação e Execução

```bash
# Instalar dependências
bun install

# Executar em modo desenvolvimento
bun run dev

# Build para produção
bun run build

# Iniciar servidor de produção
bun run start
```

## 📊 APIs Disponíveis

### `/api/jobs`
- `GET` - Listar todas as vagas com filtros
- `POST` - Criar nova vaga

### `/api/jobs/[id]`
- `GET` - Detalhes de uma vaga específica
- `PUT` - Atualizar vaga
- `DELETE` - Remover vaga

### `/api/forms`
- `POST` - Processar diferentes tipos de formulários

## 🎨 Design e UX

- **Design System**: Cores gradientes azul/roxo
- **Acessibilidade**: WCAG AA compliance
- **Responsividade**: Mobile-first design
- **Performance**: Server Components e otimização
- **Animações**: Transições suaves com CSS

## 🚀 Recursos Inovadores

1. **Server Components**: Renderização no servidor para performance máxima
2. **API Routes**: Backend integrado sem necessidade de servidor separado
3. **Type Safety**: TypeScript em todo o projeto
4. **Modern Bundler**: Turbopack para desenvolvimento ultra-rápido
5. **Component Architecture**: Componentes reutilizáveis e tipados

## 📱 Páginas Implementadas

- ✅ `/` - Página inicial com busca
- ✅ `/vagas` - Lista completa de vagas com filtros
- ✅ `/portal` - Área do candidato
- ✅ `/empresas` - Catálogo de empresas
- ✅ `/sobre` - Informações sobre a empresa
- ✅ `/admin` - Painel administrativo (login)

## 🔮 Roadmap Futuro

- [ ] Integração com banco de dados real (PostgreSQL/MongoDB)
- [ ] Sistema de autenticação completo
- [ ] Upload de currículos
- [ ] Sistema de notificações
- [ ] Chat entre candidatos e empresas
- [ ] Integração com LinkedIn
- [ ] IA para matching de vagas

## 🤝 Contribuição

Este é um projeto demonstrativo de capacidades modernas de desenvolvimento web com Next.js 16.

---

**Desenvolvido com ❤️ por Seleções Midu**

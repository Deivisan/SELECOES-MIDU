# 🚀 Guia de Desenvolvimento - Midu Group

## **Quick Start**

```bash
# Instalar dependências
bun install

# Iniciar servidor de desenvolvimento
bun run dev

# Build para produção
bun run build

# Preview do build
bun run preview
```

## **URLs Locais**

- **Landing Pública**: http://localhost:3000/public.html
- **Portal do Candidato**: http://localhost:3000/portal.html
- **Painel Admin**: http://localhost:3000/admin.html

## **Estrutura do Projeto**

```
SELECOES-MIDU/
├── src/
│   ├── client/
│   │   ├── public/         # Landing page pública
│   │   │   ├── main.tsx
│   │   │   └── PublicView.tsx
│   │   ├── portal/         # Portal do candidato
│   │   │   ├── main.tsx
│   │   │   └── PortalView.tsx
│   │   └── admin/          # Painel administrativo
│   │       ├── main.tsx
│   │       └── AdminView.tsx
│   └── shared/
│       ├── types/          # TypeScript interfaces
│       ├── data/           # Mock data (10 vagas)
│       └── styles/         # CSS global + TailwindCSS
├── public.html             # Entry point landing
├── portal.html             # Entry point portal
├── admin.html              # Entry point admin
├── vite.config.ts          # Multi-page config
├── tailwind.config.js      # Design system Midu
└── package.json
```

## **Stack Atual**

### **Frontend**
- ✅ React 19 + TypeScript
- ✅ Vite (build otimizado)
- ✅ TailwindCSS 3 + DaisyUI
- ✅ React Router DOM (quando necessário)

### **Design System**
- **Cores principais**:
  - `midu-blue`: #007BFF (confiança)
  - `midu-green`: #28A745 (crescimento)
  - `midu-orange`: #FD7E14 (energia)
- **Componentes**: DaisyUI + custom classes
- **Mobile-first**: Layout responsivo

### **Data**
- 10 vagas mock (Bahia)
- Perfil admin: Daniel Duarte
- Categorias: RH, TI, Admin, Comercial, Marketing, etc.

## **Features Implementadas ✅**

### **Landing Pública**
- ✅ Hero com busca
- ✅ Filtros (categoria, modalidade)
- ✅ Grid de vagas responsivo
- ✅ Cards com hover animations
- ✅ 10 vagas reais da Bahia

### **Portal do Candidato**
- ✅ Página "Em construção" com preview
- ⏳ Login/cadastro (próximo)
- ⏳ Detalhes de vaga (próximo)
- ⏳ Upload CV (próximo)

### **Painel Admin**
- ✅ Login demo (qualquer e-mail/senha)
- ✅ Dashboard com stats
- ✅ Tabela de vagas
- ⏳ CRUD completo de vagas (próximo)
- ⏳ Gestão de candidatos (próximo)

## **Próximos Steps**

### **Fase 2 - Funcionalidades**
1. **Portal do Candidato**:
   - [ ] Detalhes completos da vaga
   - [ ] Formulário de candidatura
   - [ ] Upload de CV (Firebase Storage)
   - [ ] Sistema de login JWT

2. **Painel Admin**:
   - [ ] CRUD de vagas (criar, editar, deletar)
   - [ ] Visualizar candidaturas
   - [ ] Kanban de processos seletivos
   - [ ] Filtros avançados

3. **Backend (Hono)**:
   - [ ] API REST em Bun
   - [ ] MongoDB Atlas connection
   - [ ] Autenticação JWT
   - [ ] Upload de arquivos

### **Fase 3 - Deploy**
- [ ] Build otimizado
- [ ] GitHub Pages (demo inicial)
- [ ] Cloudflare Pages (produção)
- [ ] LGPD compliance (cookies, termos)

## **Comandos Úteis**

```bash
# Limpar cache
rm -rf node_modules .vite dist
bun install

# Build otimizado
bun run build

# Preview local do build
bun run preview

# Type checking
bunx tsc --noEmit
```

## **Mock Data**

### **Vagas Disponíveis (10)**
1. Analista de RH - Midu Group (Feira de Santana)
2. Desenvolvedor Full Stack - TechBahia (Salvador, Remoto)
3. Assistente Administrativo - Comercial Nordeste (Feira de Santana)
4. Gerente Comercial - AutoPeças Bahia (Salvador)
5. Estagiário Marketing - Agência Criativa BA (Salvador, Híbrido)
6. Contador Sênior - Contabilize (Feira de Santana)
7. Engenheiro de Produção - Indústria Alimentos (Camaçari)
8. Professor de Inglês - Escola Global (Feira de Santana, PJ)
9. Designer Gráfico - Studio Criativo (Salvador, Remoto)
10. Auxiliar de Logística - Distribuidora Rapidez (Lauro de Freitas)

### **Admin**
- **Nome**: Daniel Duarte
- **E-mail**: daniel@midugroup.com.br
- **Perfil**: Super Admin

## **Troubleshooting**

### **Erro: TailwindCSS não carrega**
```bash
# Reinstalar TailwindCSS v3
bun remove tailwindcss
bun add -D tailwindcss@3
```

### **Erro: Aliases não funcionam**
Verificar `tsconfig.json` e `vite.config.ts` com paths corretos.

### **Erro: Port 3000 em uso**
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9
```

---

**📅 Última Atualização**: 12 Janeiro 2026  
**👨‍💻 Desenvolvedor**: Deivison Santana (@deivisan)  
**🎯 Cliente**: Daniel Duarte (Midu Group)

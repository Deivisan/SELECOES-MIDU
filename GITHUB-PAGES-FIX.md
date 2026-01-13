# 🔧 CORRIGIR GITHUB PAGES - PASSO A PASSO

## 🚨 PROBLEMA ATUAL
O site https://deivisan.github.io/SELECOES-MIDU/ está servindo do branch `main` (código fonte) em vez do build de produção do GitHub Actions workflow.

**Sintoma:** Página em branco pois tenta carregar `/src/client/public/main.tsx` que não existe em produção.

## ✅ SOLUÇÃO DEFINITIVA (2 MINUTOS)

### PASSO 1: Abrir Configurações de Pages
1. Acesse: https://github.com/Deivisan/SELECOES-MIDU/settings/pages
2. Se pedir login, entre com suas credenciais

### PASSO 2: Mudar Source para GitHub Actions
Em "Build and deployment":

**SE ESTIVER ASSIM:**
```
Source: Deploy from a branch
Branch: main / (root)
```

**MUDAR PARA:**
```
Source: GitHub Actions
```

### PASSO 3: Salvar e Aguardar
1. Clique em "Save"
2. Aguardar 2-3 minutos
3. O workflow `.github/workflows/deploy.yml` será acionado automaticamente
4. Aguardar 5-10 minutos para o build + deploy completar

### PASSO 4: Verificar Deploy
Abra: https://github.com/Deivisan/SELECOES-MIDU/actions
- Procure o workflow "Deploy to GitHub Pages"
- Deve mostrar status ✅ verde (success)
- Clique no workflow e veja o log

### PASSO 5: Testar o Site
Após workflow sucesso (5-10 min):
```bash
curl -sI https://deivisan.github.io/SELECOES-MIDU/public.html | grep Content-Length
# Deve mostrar: Content-Length: 666 (não 299)
```

Ou abra no browser:
- https://deivisan.github.io/SELECOES-MIDU/public.html
- https://deivisan.github.io/SELECOES-MIDU/portal.html
- https://deivisan.github.io/SELECOES-MIDU/admin.html

**O site deve funcionar perfeitamente!** 🎉

---

## 📋 DETALHES TÉCNICOS

### Workflow que vai executar
O arquivo `.github/workflows/deploy.yml` está configurado para:

1. **Build Job:**
   - Checkout do código (main branch)
   - Setup Bun runtime
   - Instalar dependências
   - Executar `bun run build` (cria dist/)
   - Upload do artifact `dist/`

2. **Deploy Job:**
   - Download do artifact
   - Deploy automático para GitHub Pages
   - URL disponível em `${{ steps.deployment.outputs.page_url }}`

### Por que agora vai funcionar?
- ✅ Build errors corrigidos (HTMLs recriados, clsx adicionado)
- ✅ `.nojekyll` incluído no build
- ✅ Workflow deploy.yml está correto
- ✅ GitHub Pages configurado para usar Actions (não branch direto)

---

## 🚀 DEPOIS DA CORREÇÃO

### Deploy automático
Qualquer push para `main` branch vai acionar automaticamente:
```
git push origin main
→ GitHub Actions workflow executa
→ Build do projeto
→ Deploy automático para GitHub Pages
→ Site atualizado em 5-10 minutos
```

### Deploy manual (se precisar)
```bash
bun run deploy
# Isso deploya diretamente para gh-pages branch
# Mas workflow Actions é o método oficial
```

---

## 🔧 TROUBLESHOOTING

### Se workflow falhar:
1. Abra o workflow em https://github.com/Deivisan/SELECOES-MIDU/actions
2. Clique no workflow vermelho (failed)
3. Leia os logs de erro
4. Corrija o problema e push novamente

### Se site ainda ficar em branco:
1. Limpe cache do browser (Ctrl+Shift+Delete)
2. Use modo incógnito
3. Aguarde 10 minutos para CDN propagation

### Se não encontrar opção "GitHub Actions":
- Sua conta do GitHub pode estar usando versão antiga
- Atualize as configurações de Pages para "Deploy from branch: gh-pages"
- Isso também funciona (mas workflow Actions é mais moderno)

---

**📅 Criado:** 12 Jan 2026  
**👤 Para:** Daniel Duarte (Midu Group)  
**🎯 Objetivo:** Corrigir GitHub Pages para usar GitHub Actions workflow

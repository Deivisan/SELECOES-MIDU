# 🚀 Site das Vagas — Midu Group

> **De:** Deivison (DeiviTech)
> **Pra:** Daniel (Midu Group) — aquele abraço 🤝
> **Data:** Maio 2026

---

> **Fala Daniel, beleza?**
>
> Essa é a visão geral do que o site **pode se tornar**. O bagulho já existe como um protótipo bonito (frontend), mas ainda não tem banco de dados, cadastro de gente, nem backend.
>
> Aqui vou te mostrar **o quão longe esse trem pode ir** — desde o básão funcionando até uma plataforma completa. Você escolhe até onde quer chegar AGORA, e a gente vai subindo de nível conforme precisar.
>
> Lembrando: **vou focar em serviços gratuitos** (ou muito baratos) pra não encarecer o projeto. Free tier é o caminho.
>
> No final tem um **questionário** pra gente preencher junto e decidir o rumo certo.
>
> 👍

---

## 📋 Sumário

1. [O que já existe](#-o-que-já-existe)
2. [Nível 1 — O Básico Funcionando](#-nível-1--o-básico-funcionando)
3. [Nível 2 — Plataforma de Verdade](#-nível-2--plataforma-de-verdade)
4. [Nível 3 — Profissional](#-nível-3--profissional)
5. [Nível 4 — O Sonho](#-nível-4--o-sonho)
6. [Tecnologias e Serviços (Free Tier First)](#-tecnologias-e-serviços-free-tier-first)
7. [O Que Fica de Custo (quase nada)](#-o-que-fica-de-custo-quase-nada)
8. [Questionário (preencher juntos)](#-questionário-preencher-juntos)

---

## ✅ O que já existe

O site já tá no ar com:

- ✅ Página pública bonita com as vagas
- ✅ Busca e filtro por categoria
- ✅ 6 cores diferentes pra escolher (tema)
- ✅ Portal que o candidato mexe
- ✅ Painel admin com dashboard e gráficos
- ✅ Design que funciona no celular

**Mas tá tudo "mockado"** — os dados são de mentira, salvos só no navegador. Se mudar de celular, perde tudo.

---

## 🌱 Nível 1 — O Básico Funcionando

> **"Só quero que o site funcione de verdade"**

Aqui o site sai do "faz de conta" e passa a ter vida real.

### O que entra:
- 🔲 **Banco de dados de verdade** (Supabase grátis — 500MB)
- 🔲 **Cadastro de candidatos** (nome, email, senha)
- 🔲 **Login seguro** (esqueceu senha, sessão, etc.)
- 🔲 **Candidatura real** (clica e já salva no banco)
- 🔲 **Admin conectado no banco** (vagas e candidatos reais)
- 🔲 **Deploy arrumado** (sem risco de perder dados)

### Como fica:
```
Candidato → entra no site → vê vagas reais → se cadastra → 
se candidata → cai no painel do admin → admin gerencia tudo
```

### Serviços usados (tudo grátis):
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase | Banco + API + Login | **Free $0** |
| GitHub Pages / Vercel | Hospedar o site | **Free $0** |
| Resend | Email de confirmação | **Free (3K/mês)** |
| Let's Encrypt | SSL (cadeado verde) | **Free $0** |

> ⏱ **Tempo estimado:** Alguns dias  
> 🎯 **É o suficiente pra maioria dos casos**

---

## 🏗️ Nível 2 — Plataforma de Verdade

> **"Quero algo mais completo, tipo os sites grandes"**

Tudo do Nível 1 + melhorias que fazem diferença.

### O que entra a mais:
- 🔲 **PWA** — instala o site como app no celular
- 🔲 **Funciona offline** (vê as vagas mesmo sem internet)
- 🔲 **Perfil completo do candidato** (currículo, experiências, formação)
- 🔲 **Upload de currículo** (PDF no Supabase Storage — 1GB grátis)
- 🔲 **Filtros avançados** (localização, salário, tipo de vaga)
- 🔲 **Painel admin mais robusto** (relatórios, exportar CSV, status)
- 🔲 **Email automático** (candidatura confirmada, senha nova)

### Diferencial:
O candidato consegue **montar um perfil completo** igual no LinkedIn, e você consegue **ver quem é a pessoa** antes de contratar.

### Serviços usados:
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase | Banco + Storage + Auth | **Free (até 1GB)** |
| Vercel/Cloudflare | Site + PWA | **Free $0** |
| Resend | E-mails | **Free (3K/mês)** |
| OneSignal | Notificação push (opcional) | **Free** |

> ⏱ **Algumas semanas**  
> 🎯 **Já compete com site de vaga médio**

---

## 🚀 Nível 3 — Profissional

> **"Quero que as empresas também publiquem vagas"**

Agora vira um **marketplace de vagas** — empresas se cadastram e publicam direto.

### O que entra a mais:
- 🔲 **Cadastro de empresas** (com painel próprio)
- 🔲 **Empresas publicam vagas** (com moderação do admin)
- 🔲 **Ranking de candidatos** (compatibilidade por habilidades)
- 🔲 **Notificações push** (empresa avisa candidato compatível)
- 🔲 **Estatísticas avançadas** (quantos candidataram, tempo médio)
- 🔲 **Área de empresas separada** (login + dashboard próprios)

### Diferencial:
Vira um **Indeed da Bahia** — você só modera e ganha visibilidade.

### Serviços usados:
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase Pro | Banco maior + Storage | **$25/mês** ⬆️ |
| Vercel/Cloudflare | Site | **Free** |
| SendGrid/Amazon SES | Mais emails | **~$10-20/mês** ⬆️ |

> ⏱ **Algumas semanas a alguns meses**  
> 🎯 **Plataforma profissional de verdade**

---

## 🌟 Nível 4 — O Sonho

> **"Quero o sistema completo, igual Gupy/Pontogyn"**

Tudo que uma plataforma de recrutamento pode ter.

### O que entra a mais:
- 🔲 **Testes de aptidão online** (questionários dentro do site)
- 🔲 **Chat em tempo real** (candidato ↔ recrutador)
- 🔲 **Vídeo entrevista** (integrado com Google Meet/Zoom)
- 🔲 **Matching automático** (IA sugere candidatos pra vaga)
- 🔲 **Integração com LinkedIn** (importar perfil)
- 🔲 **Dashboard de analytics** (gráficos pesados)
- 🔲 **Aplicativo mobile** (React Native, se realmente precisar)

### Serviços usados:
Aqui já escala pra serviços pagos de verdade, mas **só quando tiver tração**.

> ⏱ **Projeto longo, feito em fases**  
> 🎯 **Sistema enterprise**

---

## 🧰 Tecnologias e Serviços (Free Tier First)

| Tecnologia | Pra que | Free Tier | Quando pagar |
|------------|---------|-----------|-------------|
| **Supabase** | Banco + API + Auth + Storage | 500MB DB, 50K usuários, 1GB arquivos | Só depois de 50K usuários |
| **Vercel** | Hospedar o site + PWA | 100GB banda, builds infinitos | Só site muito grande |
| **Cloudflare Pages** | Hospedar alternativo | Banda ilimitada | Quase nunca |
| **Resend** | Email automático | 3.000 emails/mês | Depois de 3K/mês |
| **Amazon SES** | Email em escala | 3.000/mês 1º ano | $0,10/1.000 emails |
| **OneSignal** | Notificação push | 10K subscribers | Depois de 10K |
| **Let's Encrypt** | SSL grátis | Ilimitado | Nunca |
| **Registro.br** | Domínio .com.br | — | **R$ 40/ano** (único custo fixo) |
| **Railway** | Servidor opcional | $5 crédito grátis | Se precisar de backend próprio |
| **Render** | Servidor opcional | 750h/mês grátis | Se precisar de backend próprio |

### Estratégia:
1. **Começa tudo no free tier** — zero de custo operacional
2. **Só paga quando crescer** — Supabase Pro ($25/mês) quando tiver >50K usuários
3. **Único custo fixo: domínio** — R$ 40/ano no Registro.br
4. **Se precisar de VPS**: Hostinger VPS ~R$ 30-50/mês, ou Oracle Cloud **grátis** (tem VPC grátis)

---

## 💸 O Que Fica de Custo (quase nada)

### Fixo (paga uma vez por ano):
| Item | Onde | Preço |
|------|------|-------|
| Domínio .com.br | Registro.br | **R$ 40/ano** |
| **Total fixo/ano** | | **R$ 40** |

### Operacional (só se crescer):
| Item | Quando | Preço |
|------|--------|-------|
| Supabase Pro | Depois de 50 mil usuários | $25/mês |
| VPS (se precisar) | Se quiser servidor próprio | ~R$ 30/mês |
| Email pago | Acima de 3.000 emails/mês | ~R$ 10-20/mês |

> **Resumo:** Dá pra rodar o site **de 1 a 2 anos de graça** (só pagando o domínio de R$ 40).

---

## ❓ Questionário (preencher juntos)

> Rafael, preenche isso com o Daniel pra eu saber exatamente o que ele quer.
> Depois me manda as respostas que eu bolo o orçamento real — com preço justo de amigo. 🤙

---

### 1. Qual o objetivo do site?

```
[ ] A — Só mostrar as vagas que existem (institucional)
[ ] B — Candidatos se cadastrarem e candidatarem
[ ] C — Empresas também publicarem vagas
[ ] D — Sistema completo (testes, matching, etc.)
[ ] E — Ainda não sei, me ajuda a decidir
```

### 2. Quem vai cadastrar as vagas?

```
[ ] Só você (admin)
[ ] Você + empresas parceiras
[ ] Qualquer empresa se cadastrar e publicar
```

### 3. Quantas vagas ativas por mês?

```
[ ] Até 10 vagas
[ ] 10-50 vagas
[ ] 50-200 vagas
[ ] Mais de 200
```

### 4. Quantos candidatos espera por mês?

```
[ ] Até 100
[ ] 100-500
[ ] 500-5.000
[ ] 5.000+
```

### 5. PWA — instalar como app no celular?

```
[ ] Sim, quero que instale como app
[ ] Sim, e quero notificação push
[ ] Não precisa agora
```

### 6. Upload de currículo?

```
[ ] Sim, candidato pode enviar PDF
[ ] Não, só preenche os dados
```

### 7. Empresas parceiras aparecerem?

```
[ ] Sim, quero uma página mostrando as empresas
[ ] Não
```

### 8. Quando quer lançar?

```
[ ] Já pra ontem kkkk
[ ] Esse mês
[ ] Nos próximos 2-3 meses
[ ] Sem pressa, tô entendendo ainda
```

### 9. Quanto quer gastar POR MÊS (hospedagem/serviços)?

```
[ ] R$ 0 — só free tier
[ ] Até R$ 50/mês
[ ] Até R$ 100/mês
[ ] Até R$ 200/mês
[ ] Tanto faz, o importante é funcionar
```

### 10. Vai ter grana pra investir no desenvolvimento?

```
[ ] Sim, posso pagar um valor justo
[ ] Pouca grana, mas quero algo funcional
[ ] Tô sem grana agora, faz o básico e a gente vê depois
```

### 11. Observações / ideias extras:

```
________________________________________________________
________________________________________________________
________________________________________________________
```

---

## 🎯 Próximos passos

1. Preenche o questionário com o Daniel
2. Me manda as respostas (pode ser print, áudio, tanto faz)
3. Eu bolo o orçamento **real** com preço justo de amigo
4. A gente marca de codar e botar no ar

> Sem stress, sem pressão. O bagulho é seu, eu só vou dar a forma. 🦞

---

<div align="center">

**É nóis, Daniel!**

*DeiviTech — Soluções Tecnológicas Inteligentes*

</div>

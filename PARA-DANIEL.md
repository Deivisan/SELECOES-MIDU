# 🚀 Midu Group — Landing Page + Portal de Vagas

> **De:** Deivison (DeiviTech)
> **Pra:** Daniel (Midu Group) — aquele abraço 🤝
> **Data:** Maio 2026

---

> **Fala Daniel, beleza?**
>
> Aqui está a versão **atualizada do documento** com base nas suas respostas do questionário e no áudio que me mandou. Bati um papo com o Rafael e entendi direitinho o que você precisa.
>
> Resumindo a estrutura que você quer:
> - **Midu Group** = Landing page institucional + Portal de vagas
> - A landing page fala sobre a empresa, missão, quem é o Midu Group
> - O portal de vagas é a parte de recrutamento que a gente vai construir
>
> Vou ser direto: **vou focar em serviços gratuitos** (ou muito baratos) pra não encarecer. Free tier é o caminho.
>
> No final tem uma **proposta revisada** baseada no que você me falou.

---

## 📋 Sumário

1. [Estrutura do Site](#-estrutura-do-site)
2. [O que já existe](#-o-que-já-existe)
3. [Fase 1 — Landing Page + Portal Básico (Apresentação TCC)](#-fase-1--landing-page--portal-básico-apresentação-tcc)
4. [Fase 2 — Portal de Verdade](#-fase-2--portal-de-verdade)
5. [Fase 3 — Banco de Talentos](#-fase-3--banco-de-talentos)
6. [Fase 4 — O Sonho](#-fase-4--o-sonho)
7. [Tecnologias e Serviços (Free Tier First)](#-tecnologias-e-serviços-free-tier-first)
8. [O Que Fica de Custo (quase nada)](#-o-que-fica-de-custo-quase-nada)
9. [Proposta Revisada](#-proposta-revisada)

---

## 🌐 Estrutura do Site

```
Midu Group (mirandagroup.com.br ou midugroup.com.br)
│
├── Landing Page (/)
│   ├── Hero — Apresentação do Midu Group
│   ├── Sobre — Missão, visão, valores
│   ├── Serviços — O que vocês fazem
│   ├── Time — Quem é a equipe
│   └── CTA — "Ver Vagas" → Portal de Vagas
│
└── Portal de Vagas (/vagas)
    ├── Grid de Vagas
    ├── Filtros e Busca
    ├── Detalhes da Vaga
    ├── Candidatura (WhatsApp/Email)
    └── Portal Candidato (/vagas/portal)
        ├── Meus Dados
        ├── Minhas Candidaturas
        └── Upload Currículo
```

### Páginas:

| Página | URL | Descrição |
|--------|-----|-----------|
| **Landing Page** | `/` | Institucional do Midu Group |
| **Portal Vagas** | `/vagas` | Grid de vagas abertas |
| **Portal Candidato** | `/vagas/portal` | Área do candidato logado |
| **Admin** | `/vagas/admin` | Painel do recrutador |

---

## ✅ O que já existe

O site atual (SELECOES-MIDU) já tem:

- ✅ Landing page com hero, vagas, sobre, empresas
- ✅ Portal de vagas com grid e filtros
- ✅ Portal do candidato com tabs (Vagas, Candidaturas, Perfil)
- ✅ Painel admin com dashboard e gráficos
- ✅ 6 temas de cores
- ✅ Design responsivo (mobile-friendly)

**Mas tá tudo "mockado"** — os dados são de mentira, salvos só no navegador. Se mudar de celular, perde tudo.

**O que precisa mudar:**
- Renomear de "Seleções Midu" pra **Midu Group**
- Reestruturar como landing page + portal de vagas
- Colocar banco de dados de verdade

---

## 🌱 Fase 1 — Landing Page + Portal Básico (Apresentação do TCC)

> **"Quero uma landing page do Midu Group + portal de vagas básico pra apresentar no TCC"**

Você foi claro: de início, é só uma página institucional mostrando o Midu Group, com a parte de vagas funcionando de forma simples (redireciona pro WhatsApp ou Email).

### O que entra:
- ✅ **Landing Page do Midu Group** — nova estrutura:
  - Hero: "Conectando Talentos às Oportunidades"
  - Sobre: Missão, visão, valores
  - Serviços: O que o Midu Group faz
  - Time: Quem é a equipe
  - CTA: "Ver Vagas Abertas"
- ✅ **Portal de Vagas** funcional:
  - Vagas reais vindas do banco
  - Filtros por categoria
  - Detalhes da vaga
  - Botão "Candidatar" → redireciona pro WhatsApp/Email configurado
- ✅ **Banco de dados** (Supabase grátis — 500MB)
- ✅ **Cadastro/Login de candidatos** (nome, email, senha)
- ✅ **Upload de currículo** (PDF, 1GB Storage grátis)
- ✅ **Admin Dashboard** conectado no banco real
- ✅ **Deploy arrumado** (GitHub Pages)

### Fluxo que você quer:
```
Candidato → acessa landing page → clica "Ver Vagas" → 
vê vagas reais → se cadastra → se candidata → 
redireciona pro WhatsApp/Email → você gerencia
```

### Por que é assim?
Você não quer lotar sua caixa de email com currículos. O redirecionamento pro WhatsApp mantém o controle sem complicar o sistema agora. Quando começar a receber muitos currículos (200+/semana), aí a gente evolui pro banco de dados interno.

### Serviços usados (tudo grátis):
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase | Banco + API + Login + Storage | **Free $0** |
| GitHub Pages / Vercel | Hospedar o site | **Free $0** |
| Let's Encrypt | SSL (cadeado verde) | **Free $0** |

> ⏱ **Tempo estimado:** 2-3 dias  
> 🎯 **É o suficiente pra apresentação do TCC + uso real**

---

## 🏗️ Fase 2 — Portal de Verdade

> **"Quero que o candidato se mova dentro da plataforma"**

Você mencionou algo muito importante: **etapas do processo seletivo**. Análise → Entrevista → Case/Teste → Final. Isso é o que separa um site de vagas de uma plataforma de verdade.

### O que entra a mais:
- ✅ **Tracker de Etapas** — o candidato vê onde está no processo
- ✅ **Status em tempo real** — Análise, Entrevista, Case, Aprovado, Reprovado
- ✅ **Painel admin robusto** — filtros, busca, exportação
- ✅ **Notificações por email** — avisa quando muda status
- ✅ **Perfil completo do candidato** (currículo, experiências, formação)
- ✅ **Histórico de candidaturas** — o candidato acompanha

### Diferencial:
O candidato acompanha o próprio processo. Você não perde candidate no email. Tudo fica na plataforma.

### Serviços usados:
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase | Banco + Storage + Auth | **Free (até 1GB)** |
| Resend | E-mails | **Free (3K/mês)** |

> ⏱ **Algumas semanas**  
> 🎯 **Portal com etapas de seleção**

---

## 💎 Fase 3 — Banco de Talentos

> **"Quando estiver recebendo 200 currículos por semana, aí eu penso no banco"**

Essa é a visão de longo prazo. Você quer um banco de dados interno pra:
- Filtrar candidatos rapidamente (não precisa abrir vaga)
- Entrar em contato direto com perfis interessantes
- Não depender de email, LinkedIn, etc.

### O que entra a mais:
- ✅ **Banco de dados interno de candidatos**
- ✅ **Filtros avançados** (habilidades, experiência, localização)
- ✅ **Busca inteligente** — encontra perfil sem precisar de vaga aberta
- ✅ **Pipeline de talentos** — candidatesходят em potencial
- ✅ **Dashboard analytics** — métricas de recrutamento

### Diferencial:
Você vai ter um banco de profissionais que pode contatar **a qualquer momento**, sem precisar abrir vaga. Às vezes você nem vai precisar publicar — já vai ter o perfil no banco.

### Serviços usados:
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase Pro | Banco maior | **$25/mês** ⬆️ |
| Resend | Mais emails | **~$10-20/mês** ⬆️ |

> ⏱ **Quando precisar (quando tiver volume)**  
> 🎯 **Banco de talentos completo**

---

## 🌟 Fase 4 — O Sonho

> **"Quero o sistema completo, tipo Gupy/Pontogyn"**

Tudo que uma plataforma de recrutamento pode ter.

### O que entra a mais:
- 🔲 **Testes de aptidão online** (questionários dentro do site)
- 🔲 **Chat em tempo real** (candidato ↔ recrutador)
- 🔲 **Vídeo entrevista** (integrado com Google Meet/Zoom)
- 🔲 **Matching automático** (IA sugere candidatos pra vaga)
- 🔲 **Integração com LinkedIn** (importar perfil)
- 🔲 **Dashboard de analytics** (gráficos pesados)
- 🔲 **Aplicativo mobile** (React Native, se realmente precisar)

> ⏱ **Projeto longo, feito em fases**  
> 🎯 **Sistema enterprise**

---

## 🧰 Tecnologias e Serviços (Free Tier First)

| Tecnologia | Pra que | Free Tier | Quando pagar |
|------------|---------|-----------|-------------|
| **Supabase** | Banco + API + Auth + Storage | 500MB DB, 50K usuários, 1GB arquivos | Só depois de 50K usuários |
| **Vercel** | Hospedar o site | 100GB banda, builds infinitos | Só site muito grande |
| **Cloudflare Pages** | Hospedar alternativo | Banda ilimitada | Quase nunca |
| **Resend** | Email automático | 3.000 emails/mês | Depois de 3K/mês |
| **Let's Encrypt** | SSL grátis | Ilimitado | Nunca |
| **Registro.br** | Domínio .com.br | — | **R$ 40/ano** (único custo fixo) |

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
| Email pago | Acima de 3.000 emails/mês | ~R$ 10-20/mês |

> **Resumo:** Dá pra rodar o site **de 1 a 2 anos de graça** (só pagando o domínio de R$ 40).

---

## 📊 Proposta Revisada

Com base nas suas respostas do questionário e no áudio:

| Pergunta | Sua Resposta | Impacto |
|----------|--------------|--------|
| 1. Objetivo do site | **B** — Plataforma de vagas | Landing + Portal |
| 2. Quem cadastra vagas | **Só você** (por enquanto) | Admin único |
| 3. Vagas por mês | **10 a 50** | Volume gerenciável |
| 4. Candidatos por mês | **500 a 5.000** | Volume médio-alto |
| 5. PWA | **Não precisa agora** | Sem PWA na Fase 1 |
| 6. Upload currículo | **Sim, PDF** | Supabase Storage |
| 7. Landing page | **Sim, essencial** | Nova estrutura |
| 8. Quando lançar | **2-3 meses (TCC dia 4 ou 6)** | Prioridade máxima |
| 9. Quanto gastar | **Não sabe** kkkk | Free tier por padrão |
| 10. Investir no dev? | **Sim** | Pode pagar valor justo |
| 11. Estrutura | Landing + Portal Midu Group | Renomear projeto |

### Plano Recomendado:

**Fase 1 (TCC)** — Fazer agora:
- Landing page do Midu Group (nova estrutura)
- Portal de vagas funcional
- Cadastro/login de candidatos
- Candidatura com upload PDF + redirecionamento WhatsApp/Email
- Admin Dashboard completo
- Deploy no ar

**Fase 2 (Depois do TCC)** — Evoluir:
- Tracker de etapas (Análise → Entrevista → etc.)
- Status em tempo real pro candidato
- Notificações por email
- Perfil completo do candidato

**Fase 3 (Quando precisar)** — Banco de dados:
- Banco interno de candidatos
- Filtros avançados
- Busca inteligente sem vaga aberta
- Pipeline de talentos

---

## ❓ Questionário (respondido)

> Baseado nas respostas que o Rafael me mandou:

### 1. Qual o objetivo do site?
```
[x] B — Landing page do Midu Group + Portal de vagas
```

### 2. Quem vai cadastrar as vagas?
```
[x] Só você (admin) — por enquanto
```

### 3. Quantas vagas ativas por mês?
```
[x] 10-50 vagas
```

### 4. Quantos candidatos espera por mês?
```
[x] 500-5.000
```

### 5. PWA — instalar como app no celular?
```
[x] Não precisa agora
```

### 6. Upload de currículo?
```
[x] Sim, candidato pode enviar PDF
```

### 7. Landing page / página sobre?
```
[x] Sim, é essencial — apresentar o Midu Group
```

### 8. Quando quer lançar?
```
[x] Nos próximos 2-3 meses (TCC dia 4 ou 6 de Maio)
```

### 9. Quanto quer gastar POR MÊS (hospedagem/serviços)?
```
[x] Não sei kkkk (free tier por padrão)
```

### 10. Vai ter grana pra investir no desenvolvimento?
```
[x] Sim, posso pagar um valor justo
```

### 11. Observações / ideias extras:
```
"Ele quer uma landing page do Midu Group + portal de vagas.
A landing page fala sobre a empresa.
O portal de vagas é a parte de recrutamento.
Inicialmente candidatura redireciona pro WhatsApp/Email.
Futuramente quer banco de talentos interno."
```

---

## 🎯 Próximos passos

1. A gente conversa sobre o escopo exato da Fase 1
2. Eu bolo o orçamento **real** com preço justo de amigo
3. A gente marca de codar e botar no ar
4. Você apresenta no TCC ✨

> Sem stress, sem pressão. O bagulho é seu, eu só vou dar a forma. 🦞

---

<div align="center">

**É nóis, Daniel!**

*DeiviTech — Soluções Tecnológicas Inteligentes*

</div>

---

## 📋 Sumário

1. [O que já existe](#-o-que-já-existe)
2. [Fase 1 — O Básico (Apresentação TCC)](#-fase-1--o-básico-apresentação-tcc)
3. [Fase 2 — Plataforma de Verdade](#-fase-2--plataforma-de-verdade)
4. [Fase 3 — Banco de Talentos](#-fase-3--banco-de-talentos)
5. [Fase 4 — O Sonho](#-fase-4--o-sonho)
6. [Tecnologias e Serviços (Free Tier First)](#-tecnologias-e-serviços-free-tier-first)
7. [O Que Fica de Custo (quase nada)](#-o-que-fica-de-custo-quase-nada)
8. [Proposta Revisada](#-proposta-revisada)

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

## 🌱 Fase 1 — O Básico (Apresentação do TCC)

> **"Quero algo básico pra apresentar no TCC, dia 4 ou 6"**

Você foi claro: de início, é só direcionar pro email ou WhatsApp. Simples assim.

### O que entra:
- ✅ **Banco de dados de verdade** (Supabase grátis — 500MB)
- ✅ **Cadastro de candidatos** (nome, email, senha)
- ✅ **Login seguro** (esqueceu senha, sessão, etc.)
- ✅ **Candidatura real** — redireciona pro WhatsApp ou email
- ✅ **Admin conectado no banco** (vagas e candidatos reais)
- ✅ **Deploy arrumado** (sem risco de perder dados)
- ✅ **PDF do currículo** (upload pro Supabase Storage — 1GB grátis)

### Fluxo que você quer:
```
Candidato → entra no site → vê vagas reais → se cadastra → 
se candidata → cai no WhatsApp/Email → você gerencia
```

### Por que é assim?
Você não quer lotar sua caixa de email com currículos. O redirecionamento pro WhatsApp mantém o controle sem complicar o sistema agora. Quando começar a receber muitos currículos (200+/semana), aí a gente evolui pro banco de dados interno.

### Serviços usados (tudo grátis):
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase | Banco + API + Login + Storage | **Free $0** |
| GitHub Pages / Vercel | Hospedar o site | **Free $0** |
| Resend | Email de confirmação | **Free (3K/mês)** |
| Let's Encrypt | SSL (cadeado verde) | **Free $0** |

> ⏱ **Tempo estimado:** 2-3 dias  
> 🎯 **É o suficiente pra apresentação do TCC + uso real**

---

## 🏗️ Fase 2 — Plataforma de Verdade

> **"Quero que o candidato se mova dentro da plataforma"**

Você mencionou algo muito importante: **etapas do processo seletivo**. Análise → Entrevista → Case/Teste → Final. Isso é o que separa um site de vagas de uma plataforma de verdade.

### O que entra a mais:
- ✅ **Tracker de Etapas** — o candidato vê onde está no processo
- ✅ **Status em tempo real** — Análise, Entrevista, Case, Aprovado, Reprovado
- ✅ **Painel admin robusto** — filtros, busca, exportação
- ✅ **Notificações por email** — avisa quando muda status
- ✅ **Perfil completo do candidato** (currículo, experiências, formação)

### Diferencial:
O candidato acompanha o próprio processo. Você não perde candidate no email. Tudo fica na plataforma.

### Serviços usados:
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase | Banco + Storage + Auth | **Free (até 1GB)** |
| Vercel/Cloudflare | Site | **Free $0** |
| Resend | E-mails | **Free (3K/mês)** |

> ⏱ **Algumas semanas**  
> 🎯 **Plataforma com etapas de seleção**

---

## 💎 Fase 3 — Banco de Talentos

> **"Quando estiver recebendo 200 currículos por semana, aí eu penso no banco"**

Essa é a visão de longo prazo. Você quer um banco de dados interno pra:
- Filtrar candidatos rapidamente (não precisa abrir vaga)
- Entrar em contato direto com perfis interessantes
- Não depender de email, LinkedIn, etc.

### O que entra a mais:
- ✅ **Banco de dados interno de candidatos**
- ✅ **Filtros avançados** (habilidades, experiência, localização)
- ✅ **Busca inteligente** — encontra perfil sem precisar de vaga aberta
- ✅ **Pipeline de talentos** — candidatesходят em potencial
- ✅ **Dashboard analytics** — métricas de recrutamento

### Diferencial:
Você vai ter um banco de profissionais que pode contatar **a qualquer momento**, sem precisar abrir vaga. Às vezes você nem vai precisar publicar — já vai ter o perfil no banco.

### Serviços usados:
| Serviço | Pra que | Custo |
|---------|---------|-------|
| Supabase Pro | Banco maior | **$25/mês** ⬆️ |
| Vercel/Cloudflare | Site | **Free** |
| Resend | Mais emails | **~$10-20/mês** ⬆️ |

> ⏱ **Quando precisar (quando tiver volume)**  
> 🎯 **Banco de talentos completo**

---

## 🌟 Fase 4 — O Sonho

> **"Quero o sistema completo, tipo Gupy/Pontogyn"**

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
| **Vercel** | Hospedar o site | 100GB banda, builds infinitos | Só site muito grande |
| **Cloudflare Pages** | Hospedar alternativo | Banda ilimitada | Quase nunca |
| **Resend** | Email automático | 3.000 emails/mês | Depois de 3K/mês |
| **Amazon SES** | Email em escala | 3.000/mês 1º ano | $0,10/1.000 emails |
| **Let's Encrypt** | SSL grátis | Ilimitado | Nunca |
| **Registro.br** | Domínio .com.br | — | **R$ 40/ano** (único custo fixo) |

### Estratégia:
1. **Começa tudo no free tier** — zero de custo operacional
2. **Só paga quando crescer** — Supabase Pro ($25/mês) quando tiver >50K usuários
3. **Único custo fixo: domínio** — R$ 40/ano no Registro.br

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
| Email pago | Acima de 3.000 emails/mês | ~R$ 10-20/mês |

> **Resumo:** Dá pra rodar o site **de 1 a 2 anos de graça** (só pagando o domínio de R$ 40).

---

## 📊 Proposta Revisada

Com base nas suas respostas do questionário:

| Pergunta | Sua Resposta | Impacto |
|----------|--------------|--------|
| 1. Objetivo do site | **B** — Candidatos se cadastrarem e candidatarem | Foco em plataforma funcional |
| 2. Quem cadastra vagas | **Só você** (por enquanto) | Admin único no início |
| 3. Vagas por mês | **10 a 50** | Volume gerenciável |
| 4. Candidatos por mês | **500 a 5.000** | Volume médio-alto, precisa de banco |
| 5. PWA | **Não precisa agora** | Sem PWA na Fase 1 |
| 6. Upload currículo | **Sim, PDF** | Supabase Storage |
| 7. Página empresas | **Agora não precisa** | Não incluir agora |
| 8. Quando lançar | **2-3 meses** | Prioridade média-alta |
| 9. Quanto gastar | **Não sabe** kkkk | Free tier por padrão |
| 10. Investir no dev? | **Sim** | Pode pagar valor justo |
| 11. Observações | Plataforma de vagas simples | Foco em candidatar |

### Plano Recomendado:

**Fase 1 (TCC)** — Fazer agora:
- Cadastro de candidatos
- Login com Supabase Auth
- Vagas reais no banco
- Candidatura com redirecionamento WhatsApp/Email
- Upload de PDF
- Painel admin completo
- Deploy no ar

**Fase 2 (Depois do TCC)** — Evoluir:
- Tracker de etapas (Análise → Entrevista → etc.)
- Status em tempo real pro candidato
- Notificações por email
- Perfil completo do candidato

**Fase 3 (Quando precisar)** — Banco de dados:
- Banco interno de candidatos
- Filtros avançados
- Busca inteligente sem vaga aberta
- Pipeline de talentos

---

## ❓ Questionário (respondido)

> Baseado nas respostas que o Rafael me mandou:

### 1. Qual o objetivo do site?
```
[x] B — Candidatos se cadastrarem e candidatarem
```

### 2. Quem vai cadastrar as vagas?
```
[x] Só você (admin) — por enquanto
```

### 3. Quantas vagas ativas por mês?
```
[x] 10-50 vagas
```

### 4. Quantos candidatos espera por mês?
```
[x] 500-5.000
```

### 5. PWA — instalar como app no celular?
```
[x] Não precisa agora
```

### 6. Upload de currículo?
```
[x] Sim, candidato pode enviar PDF
```

### 7. Empresas parceiras aparecerem?
```
[x] Agora não precisa
```

### 8. Quando quer lançar?
```
[x] Nos próximos 2-3 meses
```

### 9. Quanto quer gastar POR MÊS (hospedagem/serviços)?
```
[x] Não sei kkkk (free tier por padrão)
```

### 10. Vai ter grana pra investir no desenvolvimento?
```
[x] Sim, posso pagar um valor justo
```

### 11. Observações / ideias extras:
```
"Ele quer uma plataforma de vagas onde candidatando se redireciona pro WhatsApp ou email. 
Futuramente quer banco de talentos interno pra filtrar candidatos sem precisar abrir vaga."
```

---

## 🎯 Próximos passos

1. A gente conversa sobre o escopo exato da Fase 1
2. Eu bolo o orçamento **real** com preço justo de amigo
3. A gente marca de codar e botar no ar
4. Você apresenta no TCC ✨

> Sem stress, sem pressão. O bagulho é seu, eu só vou dar a forma. 🦞

---

<div align="center">

**É nóis, Daniel!**

*DeiviTech — Soluções Tecnológicas Inteligentes*

</div>

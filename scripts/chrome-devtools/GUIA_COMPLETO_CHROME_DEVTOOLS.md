# 📋 GUIA COMPLETO - Chrome DevTools Android + Arch Linux Chroot

**Data:** 16/02/2026  
**Autor:** DevSan (AGI)  
**Objetivo:** Configurar Chrome DevTools via TCP persistente no Android para debug remoto via Playwright/MCP

---

## 🎯 RESUMO DO OBJETIVO

Expor o Chrome DevTools Protocol do celular numa porta TCP fixa (9222/9999) para que ferramentas externas (Playwright, Chrome DevTools MCP, etc) possam conectar e:
- Tirar screenshots
- Debugar páginas
- Executar JavaScript
- Automatizar interações
- Testar sites locais (ex: Bun em localhost:3000)

---

## 📱 AMBIENTE ATUAL - ANÁLISE COMPLETA

### Dispositivo
- **Modelo:** Poco X5 5G
- **SoC:** Snapdragon 695 (8 cores, ARM64)
- **RAM:** 7.3GB total (~2GB disponível para compute)
- **GPU:** Adreno 619 (até 840 MHz)
- **Storage:** 223GB total, 44GB usado

### Sistema Operacional
- **Android:** Custom ROM com KernelSU (root camuflado)
- **Kernel:** 5.4.302-qgki-LordKarbiter (custom)
- **Arch Linux ARM:** Chroot rodando sobre o Android

### Rede
- **IP Local:** `192.168.25.155` (via WiFi)
- **Gateway:** `192.168.25.1`
- **Interface:** `wlan0`

---

## 🔧 ARQUITETURA ATUAL

### Estrutura de Diretórios

```
/data/                              ← Android Root (inacessível do chroot)
├── arch/                           ← Arch Linux Chroot
│   ├── etc/                        ← Configurações
│   ├── root/                       ← Root do Arch
│   ├── home/deivi/                 ← Usuário principal
│   │   ├── projects/               → /data/media/0/Projetos (bind mount)
│   │   ├── sdcard/                 → /data/media/0 (bind mount)
│   │   ├── scripts/                ← Scripts do usuário
│   │   └── .bun/                   ← Bun runtime
│   ├── usr/                       ← Binários sistema
│   └── var/                       ← Arquivos variáveis
│
├── media/0/                        ← Storage principal Android
│   └── Projetos/                   ← Workspace principal
│       ├── repos/                 ← Repositórios Git
│       ├── workspace/              ← Workspace agentes
│       ├── downloads/
│       └── backup/
│
└── local/tmp/                     ← Temporary files (acessível)
    └── start-arch-godmode.sh      ← Script de entrada principal
```

### Scripts Existentes (em `~/scripts/`)

| Script | Função | Status |
|--------|--------|--------|
| `start-arch-godmode.sh` | Entrada no Arch com mounts | ✅ Funcional |
| `setup-ssh-termux.sh` | SSH entre Termux ↔ Arch | ✅ Criado |
| `setup-projetos-structure.sh` | Cria estrutura Projetos | ✅ Criado |
| `install-build-deps.sh` | Instala deps de build | ✅ Criado |
| `build-turnip-driver.sh` | Compila driver GPU | ✅ Criado |
| `setup-adb-chrome-debug.sh` | Configura ADB/Debug | ⚠️ Testar |

---

## 🚀 STACK ATUAL DO AMBIENTE

### Runtimes/Linguagens

| Tecnologia | Versão | Caminho |
|------------|--------|---------|
| **Bun** | 1.3.9 | `/home/deivi/.bun/bin/bun` |
| **Go** | 1.25.7 | `/usr/bin/go` |
| **Python** | 3.14.2 | `/usr/bin/python` |
| **Java** | OpenJDK 25.0.2 | `/usr/bin/java` |
| **Zig** | 0.15.2 | `/usr/bin/zig` |
| **Rust** | ❌ Não instalado | - |

### Servidor de Desenvolvimento

- **Bun:** ✅ Rodando (PID visível)
- **Vite:** ✅ http://localhost:3000
- **SELECOES-MIDU:** ✅ Servindo em `/SELECOES-MIDU/`

### MCPs Ativos (10 servidores)

| MCP | Comando | Status |
|-----|---------|--------|
| mem0 | `bun x @mem0/mcp-server` | ✅ Rodando |
| tavily | `bun x tavily-mcp` | ✅ Rodando |
| exa | `bun x exa-mcp-server` | ✅ Rodando |
| github | `bun x @cyanheads/git-mcp-server` | ✅ Rodando |
| yt-dlp | `bun x @kevinwatt/yt-dlp-mcp` | ✅ Rodando |
| grok-scraper | `bun run .../mcp-grok-scraper/index.ts` | ✅ Rodando |
| docker | `bun x mcp-server-docker` | ❌ Não iniciado |
| playwright | `bun x @playwright/mcp` | ❌ Não iniciado |
| chrome-devtools | `bun x chrome-devtools-mcp` | ⚠️ Problema (travou) |
| context7 | Remote MCP | ✅ Conectado |

---

## 📦 INSTALAÇÕES NECESSÁRIAS

### 1. ADB (Android Debug Bridge)
- **Status:** ✅ Instalado via `pacman -S android-tools`
- **Comando:** `adb`
- **Versão:** Android 15 (SDK 35)

### 2. Socat (Socket Cat)
- **O que faz:** Bridge entre socket abstrato do Chrome e porta TCP
- **Status:** ❌ Não instalado
- **Instalar:** `pkg install socat` (Termux) ou compilar para ARM64

### 3. Chrome com Remote Debugging
- **Pacote:** `com.android.chrome`
- **Socket:** `/dev/socket/chrome_devtools_remote`
- **Ativar:** `chrome://flags` → `enable-remote-debugging`

---

## 🔌 COMO FUNCIONA O CHROME DEVTOOLS

### Fluxo Normal (USB)
```
PC (ADB) → USB → Android → Chrome DevTools Socket
```

### Fluxo via Rede (Objetivo)
```
Ferramenta Externa → TCP:9222 → socat → Chrome DevTools Socket → Chrome
```

### O Chrome cria um socket abstrato em:
```
/dev/socket/chrome_devtools_remote
```

### O socat faz bridge:
```
TCP-LISTEN:9222 ←→ UNIX-CONNECT:/dev/socket/chrome_devtools_remote
```

---

## 🎯 PROCEDIMENTO DE INSTALAÇÃO

### Fase 1: Preparar o Android (executar NO ANDROID, fora do chroot)

#### Opção A: Via Termux (推荐)
```bash
# Instalar ferramentas
pkg update
pkg install android-tools socat curl

# Dar permissões
termux-setup-storage

# Iniciar Chrome em modo debug
am start -n com.android.chrome/com.google.android.apps.chrome.Main \
    -a android.intent.action.VIEW \
    -d about:debug \
    --user 0
```

#### Opção B: Via ADB (do PC)
```bash
# Conectar ao celular
adb connect 192.168.25.155:5555

# Instalar socat no Android (se possível)
adb push socat-arm64 /data/local/tmp/socat
adb shell "chmod +x /data/local/tmp/socat"

# Ativar Chrome em modo debug
adb shell am start -n com.android.chrome/com.google.android.apps.chrome.Main \
    -a android.intent.action.VIEW \
    -d about:debug \
    --user 0
```

### Fase 2: Configurar Socat Bridge (executar NO ANDROID ROOT)

```bash
# Criar script de inicialização
cat > /data/local/tmp/chrome-devtools-bridge.sh << 'EOF'
#!/system/bin/sh
LOG=/data/local/tmp/chrome-devtools.log
PORT=9222
SOCKET=chrome_devtools_remote

log() {
    echo "[$(date)] $1" | tee -a $LOG
}

# Esperar Chrome estar pronto
sleep 3

# Verificar se Chrome está rodando
if ! pidof chrome &>/dev/null; then
    log "Iniciando Chrome em modo debug..."
    am start -n com.android.chrome/com.google.android.apps.chrome.Main \
        -a android.intent.action.VIEW \
        -d about:debug --user 0
    sleep 2
fi

# Verificar socket
if [ -e "/dev/socket/$SOCKET" ]; then
    log "Socket encontrado: $SOCKET"
else
    log "Socket NÃO encontrado - Chrome pode não estar em modo debug"
    exit 1
fi

# Iniciar socat
pkill socat 2>/dev/null

nohup socat -d -d \
    TCP-LISTEN:$PORT,bind=127.0.0.1,reuseaddr,fork \
    UNIX-CONNECT:/dev/socket/$SOCKET \
    > /data/local/tmp/socat.log 2>&1 &

log "Socat iniciado na porta $PORT"
log "Acesse: curl http://127.0.0.1:$PORT/json"
EOF

chmod +x /data/local/tmp/chrome-devtools-bridge.sh

# Executar
su -c /data/local/tmp/chrome-devtools-bridge.sh
```

### Fase 3: Configurar Auto-start (opcional)

#### Via Magisk (recomendado)
1. Criar módulo em `/data/adb/modules/ChromeDevToolsBridge/`
2. Colocar script em `system/xbin/`
3. Adicionar em `service.sh`

#### Via init.d
```bash
# Se o kernel suportar
cat > /data/local/user/init.d/99-chrome-devtools.sh << 'EOF'
#!/system/bin/sh
/data/local/tmp/chrome-devtools-bridge.sh
EOF
chmod +x /data/local/user/init.d/99-chrome-devtools.sh
```

### Fase 4: Testar Conexão

```bash
# Do PC ou de dentro do chroot
curl http://192.168.25.155:9222/json

# Resposta esperada:
# [
#   {
#     "id": "...",
#     "type": "page",
#     "title": "...",
#     "url": "...",
#     "webSocketDebuggerUrl": "ws://192.168.25.155:9222/devtools/page/..."
#   }
# ]
```

---

## 🔧 CONEXÃO VIA PLAYWRIGHT

### Python
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.connect(ws_endpoint='ws://192.168.25.155:9222')
    page = browser.new_page()
    page.goto('http://localhost:3000')
    page.screenshot(path='screenshot.png')
    browser.close()
```

### JavaScript/TypeScript
```javascript
import { chromium } from 'playwright';

const browser = await chromium.connect({
    wsEndpoint: 'ws://192.168.25.155:9222'
});

const page = await browser.newPage();
await page.goto('http://localhost:3000');
await page.screenshot({ path: 'screenshot.png' });
await browser.close();
```

### Via MCP (Chrome DevTools MCP)
```bash
# Configurar o MCP para conectar ao Android
bunx chrome-devtools-mcp --ws-endpoint "ws://192.168.25.155:9222"
```

---

## 🔍 DEBUGGING E TROUBLESHOOTING

### Verificar se Chrome está em modo debug
```bash
# No Android
curl http://127.0.0.1:9222/json
```

### Ver logs do socat
```bash
cat /data/local/tmp/socat.log
cat /data/local/tmp/chrome-devtools.log
```

### Reiniciar bridge
```bash
pkill socat
su -c /data/local/tmp/chrome-devtools-bridge.sh
```

### Ver processos
```bash
ps aux | grep -E "chrome|socat"
```

---

## 📋 CHECKLIST FINAL

| Item | Comando | Responsável |
|------|---------|-------------|
| ✅ Android com root | KernelSU ativo | Usuário |
| ✅ Chrome instalado | `which chrome` | Android |
| ✅ Chrome em modo debug | `curl localhost:9222/json` | Script |
| ✅ Socat instalado | `which socat` | Android |
| ✅ Socat rodando | `pgrep socat` | Script |
| ✅ Porta 9222 aberta | `netstat -tlnp \| 9222` | Android |
| ✅ Rede acessível | `ping 192.168.25.155` | PC/Chroot |
| ✅ Teste JSON | `curl 192.168.25.155:9222/json` | Qualquer um |

---

## 🎉 RESULTADO ESPERADO

Após configuração completa:

1. **Chrome do Android** roda em modo debug
2. **socat** faz bridge socket → TCP porta 9222
3. **Rede local** acessível (mesmo WiFi)
4. **Playwright/MCP** conecta via WebSocket
5. **Debug/Screenshots** funcionam perfeitamente
6. **Persistência** survives reboot (via Magisk module ou init.d)

---

## 📞 TESTES DE CONECTIVIDADE

### Do PC Windows para Android:
```powershell
# Ping
ping 192.168.25.155

# Verificar porta
Test-NetConnection -ComputerName 192.168.25.155 -Port 9222

# curl JSON
curl http://192.168.25.155:9222/json
```

### Do Arch Linux Chroot para Android:
```bash
curl http://192.168.25.155:9222/json
```

---

## 🚨 PROBLEMAS CONHECIDOS

1. **ADB travou o sistema:** O comando `sudo pacman` invocou algo que travou. Provavelmente por tentar acessar `/data` ou por algum lock.
   - **Solução:** Não usar ADB diretamente de dentro do chroot para operações complexas

2. **Rede:** Celular e PC podem estar em redes diferentes
   - **Solução:** Garantir mesmo WiFi ou usar VPN/tunnel

3. **Permissões:** Alguns sockets precisam de root
   - **Solução:** Executar scripts com `su -c`

---

## 📝 SCRIPTS FORNECIDOS

Este documento acompaña os seguintes arquivos:

| Arquivo | Localização | Descrição |
|---------|-------------|-----------|
| `chrome-devtools-android.sh` | `~/scripts/chrome-devtools/` | Script principal completo |
| `test-connection.sh` | `~/scripts/chrome-devtools/` | Script de teste |
| `module.prop` | `~/scripts/chrome-devtools/` | Config Magisk |
| `service.sh` | `~/scripts/chrome-devtools/` | Auto-start |

Copie esses arquivos para o Android antes de executar.

---

**Documento criado por:** DevSan AGI  
**Para:** Agente no PC Windows  
**Data:** 16/02/2026

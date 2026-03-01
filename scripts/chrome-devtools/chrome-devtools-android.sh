#!/system/bin/sh
# =============================================================================
# ChromeDevToolsAndroid - Módulo Magisk/KernelSU
# Expose Chrome DevTools Protocol via TCP persistente
# =============================================================================

# Configurações
MODULE_DIR="/data/adb/modules/ChromeDevToolsAndroid"
LOG_FILE="/data/local/tmp/chrome_devtools.log"
Socat_PORT=9222
ADB_PORT=9999
CHROME_SOCKET="chrome_devtools_remote"

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[$(date '+%Y-%m-%d %H:%M:%S')] AVISO:${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ERRO:${NC} $1" | tee -a "$LOG_FILE"
}

# =============================================================================
# FUNÇÃO PRINCIPAL
# =============================================================================

setup_chrome_devtools() {
    log "🚀 Iniciando ChromeDevToolsAndroid..."
    
    # Criar diretório do módulo
    mkdir -p "$MODULE_DIR"
    
    # Criar log
    mkdir -p /data/local/tmp
    touch "$LOG_FILE"
    
    # 1. Configurar ADB over TCP persistente
    setup_adb_tcp
    
    # 2. Verificar/instalar socat
    setup_socat
    
    # 3. Configurar Chrome debug
    setup_chrome_debug
    
    # 4. Iniciar socat bridge
    start_socat_bridge
    
    # 5. Mostrar informações de conexão
    show_connection_info
}

# =============================================================================
# 1. ADB over TCP Persistente
# =============================================================================

setup_adb_tcp() {
    log "📡 Configurando ADB over TCP..."
    
    # Parar ADB server existente
    adb kill-server 2>/dev/null
    
    # Configurar ADB via USB primeiro
    adb usb 2>/dev/null
    
    # Reiniciar em modo TCPIP na porta especificada
    adb tcpip $ADB_PORT 2>/dev/null
    
    if [ $? -eq 0 ]; then
        log "✅ ADB TCPIP configurado na porta $ADB_PORT"
    else
        warn "⚠️  ADB TCPIP falhou - tentando reiniciar..."
        adb start-server
        adb tcpip $ADB_PORT 2>/dev/null
    fi
    
    # Configurar propriedades persistentes (sobrevive reboot)
    setprop persist.adb.tcp.port $ADB_PORT
    setprop service.adb.tcp.port $ADB_PORT
    
    log "✅ ADB configurado: porta $ADB_PORT"
}

# =============================================================================
# 2. Socat - Bridge socket abstrato -> TCP
# =============================================================================

setup_socat() {
    log "🔌 Verificando socat..."
    
    # Verificar se socat existe
    if ! command -v socat &> /dev/null; then
        warn "⚠️  Socat não encontrado. Tentando instalar..."
        
        # Tentar várias formas de instalar
        if command -v pkg &> /dev/null; then
            pkg install -y socat 2>/dev/null
        elif command -v apt &> /dev/null; then
            apt install -y socat 2>/dev/null
        elif command -v magisk &> /dev/null; then
            warn "⚠️  Instale socat manualmente via Termux ou Magisk"
        fi
    fi
    
    if command -v socat &> /dev/null; then
        log "✅ Socat disponível"
    else
        error "❌ Socat não disponível - continuing sem bridge"
    fi
}

# =============================================================================
# 3. Chrome Debug Mode
# =============================================================================

setup_chrome_debug() {
    log "🌐 Configurando Chrome Debug..."
    
    # Verificar se Chrome está instalado
    CHROME_PATHS="
        /system/app/Chrome/Chrome.apk
        /data/app/com.android.chrome
        /system/product/app/Chrome
    "
    
    # Propriedades para Chrome debug persistente
    setprop debug.chrome.launcher 1
    setprop chromeflag:enable-webapp --enable-remote-debugging
    
    # Verificar se há processo Chrome
    CHROME_PID=$(pidof chrome 2>/dev/null || pidof com.android.chrome 2>/dev/null)
    
    if [ -z "$CHROME_PID" ]; then
        warn "⚠️  Chrome não está rodando"
        log "💡 Para iniciar Chrome em modo debug, execute:"
        log "   am start -n com.android.chrome/com.google.android.apps.chrome.Main -a android.intent.action.VIEW -d about:debug"
    else
        log "✅ Chrome está rodando (PID: $CHROME_PID)"
    fi
}

# =============================================================================
# 4. Socat Bridge - Socket abstrato -> porta TCP
# =============================================================================

start_socat_bridge() {
    log "🔗 Iniciando socat bridge..."
    
    # Parar bridge anterior se existir
    pkill -f "socat.*$Socat_PORT.*chrome" 2>/dev/null
    
    # Verificar se socket do Chrome existe
    if [ -e "/dev/socket/$CHROME_SOCKET" ] || [ -S "/dev/socket/$CHROME_SOCKET" ]; then
        log "✅ Socket Chrome encontrado: /dev/socket/$CHROME_SOCKET"
    else
        warn "⚠️  Socket Chrome não encontrado"
        log "💡 Inicie o Chrome com debug primeiro, ou use o comando Chrome acima"
    fi
    
    # Iniciar socat em background
    # Bridging: socket abstrato do Chrome -> porta TCP local
    nohup socat -d -d \
        TCP-LISTEN:$Socat_PORT,bind=127.0.0.1,reuseaddr,fork \
        UNIX-CONNECT:/dev/socket/$CHROME_SOCKET \
        > /data/local/tmp/socat.log 2>&1 &
    
    SOCAT_PID=$!
    
    if [ -n "$SOCAT_PID" ]; then
        log "✅ Socat bridge iniciado (PID: $SOCAT_PID) na porta $Socat_PORT"
        log "📝 Logs em: /data/local/tmp/socat.log"
    else
        error "❌ Falha ao iniciar socat"
    fi
}

# =============================================================================
# 5. Informações de Conexão
# =============================================================================

show_connection_info() {
    log ""
    log "════════════════════════════════════════════════════════════"
    log "🎉 CONFIGURAÇÃO CONCLUÍDA!"
    log "════════════════════════════════════════════════════════════"
    
    # IP local
    IP=$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' || echo "127.0.0.1")
    
    log "📱 IP do dispositivo: $IP"
    log "🔌 Porta DevTools: $Socat_PORT (localhost)"
    log "📡 Porta ADB: $ADB_PORT"
    log ""
    log "📋 Para testar:"
    log "   curl http://$IP:$Socat_PORT/json"
    log ""
    log "📋 Para Playwright:"
    log "   const browser = await chromium.connect({"
    log "     wsEndpoint: 'ws://$IP:$Socat_PORT'"
    log "   });"
    log ""
    log "📋 Para Chrome DevTools:"
    log "   chrome://inspect/#devices"
    log "   → Configure: $IP:$Socat_PORT"
    log "════════════════════════════════════════════════════════════"
}

# =============================================================================
# EXECUÇÃO
# =============================================================================

case "$1" in
    start)
        setup_chrome_devtools
        ;;
    stop)
        log "🛑 Parando ChromeDevTools..."
        pkill -f "socat.*chrome" 2>/dev/null
        adb kill-server 2>/dev/null
        log "✅ Parado"
        ;;
    restart)
        log "🔄 Reiniciando..."
        $0 stop
        sleep 2
        setup_chrome_devtools
        ;;
    status)
        log "📊 Status atual:"
        IP=$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' || echo "127.0.0.1")
        echo "   IP: $IP"
        echo "   Socat: $(pgrep -f 'socat.*$Socat_PORT' || echo 'Não rodando')"
        echo "   Chrome: $(pidof chrome 2>/dev/null || echo 'Não rodando')"
        ;;
    *)
        echo "Uso: $0 {start|stop|restart|status}"
        setup_chrome_devtools
        ;;
esac

# =============================================================================
# ChromeDevToolsAndroid - Service Script
# Roda na inicialização do sistema
# =============================================================================

# Configurações
LOG_FILE="/data/local/tmp/chrome_devtools_boot.log"
Socat_PORT=9222
CHROME_SOCKET="chrome_devtools_remote"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" >> "$LOG_FILE"
}

log "🚀 ChromeDevToolsAndroid Service started..."

# Esperar rede WiFi
until ping -c 1 8.8.8.8 &>/dev/null; do
    sleep 5
done
log "✅ Rede disponível"

# Esperar Chrome estar pronto
sleep 3

# Iniciar Chrome em modo debug se não estiver rodando
if ! pidof chrome &>/dev/null; then
    log "📱 Iniciando Chrome em modo debug..."
    am start -n com.android.chrome/com.google.android.apps.chrome.Main \
        -a android.intent.action.VIEW \
        -d about:debug \
        --user 0 2>/dev/null
    sleep 2
fi

# Iniciar socat bridge
log "🔌 Iniciando socat bridge..."

pkill -f "socat.*$Socat_PORT" 2>/dev/null

# Bridge: socket Chrome abstrato -> porta TCP
nohup socat -d -d \
    TCP-LISTEN:$Socat_PORT,bind=127.0.0.1,reuseaddr,fork \
    UNIX-CONNECT:/dev/socket/$CHROME_SOCKET \
    > /data/local/tmp/socat.log 2>&1 &

SOCAT_PID=$!
log "✅ Socat iniciado (PID: $SOCAT_PID)"

# Mostrar IP
IP=$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+')
log "📡 IP: $IP"
log "🔌 DevTools: ws://$IP:$Socat_PORT"

log "🎉 Serviço concluído!"

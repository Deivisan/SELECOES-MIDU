#!/system/bin/sh
# =============================================================================
# TESTE DE CONEXÃO - Chrome DevTools Android
# Execute após configurar o módulo
# =============================================================================

echo "════════════════════════════════════════════════════"
echo "  🔍 TESTE DE CONEXÃO CHROME DEVTOOLS"
echo "════════════════════════════════════════════════════"

# Configurações
IP=$(ip route get 1.1.1.1 2>/dev/null | grep -oP 'src \K[0-9.]+' || echo "127.0.0.1")
PORT=9222

echo ""
echo "📱 IP detectado: $IP"
echo "🔌 Porta: $PORT"
echo ""

# Teste 1: Verificar socat
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  Verificando socat..."
SOCAT_RUNNING=$(pgrep -f "socat.*$PORT" | head -1)
if [ -n "$SOCAT_RUNNING" ]; then
    echo "   ✅ Socat rodando (PID: $SOCAT_RUNNING)"
else
    echo "   ❌ Socat NÃO está rodando!"
    echo "   Execute: socat TCP-LISTEN:$PORT,bind=127.0.0.1,reuseaddr,fork UNIX-CONNECT:/dev/socket/chrome_devtools_remote &"
fi

# Teste 2: Verificar Chrome
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Verificando Chrome..."
CHROME_PID=$(pidof chrome 2>/dev/null || pidof com.android.chrome 2>/dev/null)
if [ -n "$CHROME_PID" ]; then
    echo "   ✅ Chrome rodando (PID: $CHROME_PID)"
else
    echo "   ⚠️  Chrome NÃO está rodando!"
    echo "   Execute: am start -n com.android.chrome/com.google.android.apps.chrome.Main -d about:debug"
fi

# Teste 3: Testar conexão WebSocket
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Testando conexão DevTools..."
if command -v curl &>/dev/null; then
    RESPONSE=$(curl -s -m 3 "http://127.0.0.1:$PORT/json" 2>&1)
    if [ $? -eq 0 ] && [ -n "$RESPONSE" ]; then
        echo "   ✅ Conexão bem sucedida!"
        echo ""
        echo "   📋 DevTools disponível em:"
        echo "      ws://$IP:$PORT"
        echo ""
        echo "   📋 URLs JSON:"
        echo "$RESPONSE" | head -10
    else
        echo "   ❌ Falha na conexão"
        echo "   Erro: $RESPONSE"
    fi
else
    echo "   ⚠️  curl não disponível para teste"
fi

# Teste 4: Playwright config
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  Configuração Playwright:"
echo ""
echo "   // JavaScript/TypeScript"
echo "   const browser = await chromium.connect({"
echo "     wsEndpoint: 'ws://$IP:$PORT'"
echo "   });"
echo ""
echo "   // Python"
echo "   from playwright.sync_api import sync_playwright"
echo "   browser = sync_playwright().start().chromium.connect(ws_endpoint='ws://$IP:$PORT')"
echo ""

echo "════════════════════════════════════════════════════"
echo "  ✅ TESTE CONCLUÍDO"
echo "════════════════════════════════════════════════════"

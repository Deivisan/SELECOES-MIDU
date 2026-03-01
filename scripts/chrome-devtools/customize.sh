# =============================================================================
# ChromeDevToolsAndroid - Customize Script
# Executado pelo Magisk na instalação
# =============================================================================

# Configurações
MODPATH="${MODPATH:-/data/adb/modules/ChromeDevToolsAndroid}"

#打印安装信息
ui_print "========================================"
ui_print "  ChromeDevToolsAndroid v1.0"
ui_print "  Expose Chrome DevTools via TCP"
ui_print "========================================"

# Verificar root
if [ ! -d "/sbin" ] && [ ! -f "/sbin/su" ]; then
    ui_print "⚠️  Este módulo requer root (Magisk/KernelSU)"
fi

# Criar diretórios necessários
mkdir -p $MODPATH/system/bin
mkdir -p $MODPATH/system/xbin
mkdir -p $MODPATH/data/local/tmp

# Copiar scripts
cp -f $MODPATH/chrome-devtools-android.sh $MODPATH/system/bin/chrome-devtools
chmod +x $MODPATH/system/bin/chrome-devtools

# Criar link simbólico
ln -sf $MODPATH/system/bin/chrome-devtools /sbin/chrome-devtools 2>/dev/null

ui_print "✅ Instalação concluída!"
ui_print "📋 Execute 'chrome-devtools start' para iniciar"
ui_print "📋 Ou reinicie para automática inicialização"

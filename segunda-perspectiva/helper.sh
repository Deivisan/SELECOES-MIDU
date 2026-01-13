#!/bin/bash

# 🎨 Seleções Midu v2 - Editorial/Art Deco Design
# Helper script para navegação e testes

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🎨  SELEÇÕES MIDU V2 - DESIGN EDITORIAL/ART DECO             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Função para exibir menu
show_menu() {
  echo "┌────────────────────────────────────────────────────────────────┐"
  echo "│ COMANDOS DISPONÍVEIS                                           │"
  echo "├────────────────────────────────────────────────────────────────┤"
  echo "│ 1. start     → Iniciar servidor demo (porta 3000)             │"
  echo "│ 2. stop      → Parar servidor demo                            │"
  echo "│ 3. status    → Verificar status do servidor                   │"
  echo "│ 4. test      → Testar rotas (curl)                            │"
  echo "│ 5. docs      → Abrir documentação                             │"
  echo "│ 6. inspect   → Inspecionar elementos do design                │"
  echo "│ 7. colors    → Ver paleta de cores                            │"
  echo "│ 8. fonts     → Ver tipografia                                 │"
  echo "│ 9. help      → Mostrar este menu                              │"
  echo "│ 0. exit      → Sair                                           │"
  echo "└────────────────────────────────────────────────────────────────┘"
  echo ""
}

# Função: Iniciar servidor
start_server() {
  echo "🚀 Iniciando servidor demo..."
  cd /mnt/sdcard/Projetos/selecoes-midu-v2/selecoes-midu
  bun run server-demo.ts &
  sleep 2
  echo "✅ Servidor rodando em http://localhost:3000"
}

# Função: Parar servidor
stop_server() {
  echo "🛑 Parando servidor demo..."
  pkill -f "server-demo"
  echo "✅ Servidor parado"
}

# Função: Verificar status
check_status() {
  if pgrep -f "server-demo" > /dev/null; then
    echo "✅ Servidor ATIVO em http://localhost:3000"
    echo "   PID: $(pgrep -f 'server-demo')"
  else
    echo "❌ Servidor NÃO está rodando"
  fi
}

# Função: Testar rotas
test_routes() {
  echo "🧪 Testando rotas..."
  echo ""
  
  routes=("/" "/sobre" "/vagas" "/portal" "/empresas")
  
  for route in "${routes[@]}"; do
    status=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000$route")
    if [ "$status" = "200" ]; then
      echo "✅ $route → HTTP $status"
    else
      echo "❌ $route → HTTP $status"
    fi
  done
}

# Função: Abrir docs
open_docs() {
  echo "📚 Documentação disponível:"
  echo ""
  echo "1. DESIGN_SYSTEM_APPLIED.md  - Guia técnico completo"
  echo "2. GUIA_EXPLORACAO.md         - Guia de exploração"
  echo ""
  
  read -p "Escolha qual abrir (1/2) ou ENTER para sair: " choice
  
  case $choice in
    1)
      cat /mnt/sdcard/Projetos/selecoes-midu-v2/DESIGN_SYSTEM_APPLIED.md | less
      ;;
    2)
      cat /mnt/sdcard/Projetos/selecoes-midu-v2/GUIA_EXPLORACAO.md | less
      ;;
  esac
}

# Função: Inspecionar elementos
inspect_design() {
  echo "🔍 Elementos do Design:"
  echo ""
  echo "1. Variáveis CSS (globals.css)"
  echo "2. Design System (design-system.ts)"
  echo "3. Homepage (page.tsx)"
  echo "4. Página Sobre (sobre/page.tsx)"
  echo "5. JobList Component (JobList.tsx)"
  echo ""
  
  read -p "Escolha qual inspecionar (1-5) ou ENTER para sair: " choice
  
  case $choice in
    1)
      cat /mnt/sdcard/Projetos/selecoes-midu-v2/selecoes-midu/src/app/globals.css | less
      ;;
    2)
      cat /mnt/sdcard/Projetos/selecoes-midu-v2/selecoes-midu/src/styles/design-system.ts | less
      ;;
    3)
      cat /mnt/sdcard/Projetos/selecoes-midu-v2/selecoes-midu/src/app/page.tsx | less
      ;;
    4)
      cat /mnt/sdcard/Projetos/selecoes-midu-v2/selecoes-midu/src/app/sobre/page.tsx | less
      ;;
    5)
      cat /mnt/sdcard/Projetos/selecoes-midu-v2/selecoes-midu/src/components/JobList.tsx | less
      ;;
  esac
}

# Função: Ver cores
show_colors() {
  echo "🎨 Paleta Editorial/Art Deco:"
  echo ""
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│ TERRACOTTA (Primária)                                  │"
  echo "│ #D46B56  → Botões, links, acentos                      │"
  echo "└────────────────────────────────────────────────────────┘"
  echo ""
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│ OCHRE/DOURADO (Acento)                                 │"
  echo "│ #E5B045  → Gradientes, borders decorativas             │"
  echo "└────────────────────────────────────────────────────────┘"
  echo ""
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│ NAVY DEEP (Dark Sections)                              │"
  echo "│ #2C4975  → Backgrounds escuros, footer                 │"
  echo "└────────────────────────────────────────────────────────┘"
  echo ""
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│ CREAM (Background)                                     │"
  echo "│ #F5E6B8  → Background principal (papel)                │"
  echo "└────────────────────────────────────────────────────────┘"
  echo ""
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│ CHARCOAL (Texto)                                       │"
  echo "│ #2E2E33  → Texto principal, borders                    │"
  echo "└────────────────────────────────────────────────────────┘"
}

# Função: Ver tipografia
show_fonts() {
  echo "🔤 Tipografia Editorial:"
  echo ""
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│ CRIMSON TEXT (Serif)                                   │"
  echo "│ Uso: h1, h2, h3, números decorativos, citações        │"
  echo "│ Weights: 400, 600, 700 + italic variants              │"
  echo "└────────────────────────────────────────────────────────┘"
  echo ""
  echo "┌────────────────────────────────────────────────────────┐"
  echo "│ INTER (Sans-serif)                                     │"
  echo "│ Uso: body, labels, buttons, cards                      │"
  echo "│ Weights: 300, 400, 500, 600, 700                       │"
  echo "└────────────────────────────────────────────────────────┘"
  echo ""
  echo "Hierarquia:"
  echo "  h1: clamp(2.5rem, 5vw, 4rem)"
  echo "  h2: clamp(2rem, 4vw, 3rem)"
  echo "  h3: clamp(1.5rem, 3vw, 2rem)"
  echo "  p:  1rem, line-height: 1.7"
  echo "  decorative: clamp(12rem, 30vw, 24rem)"
}

# Main loop
main() {
  while true; do
    show_menu
    read -p "Escolha uma opção: " choice
    echo ""
    
    case $choice in
      1|start)
        start_server
        ;;
      2|stop)
        stop_server
        ;;
      3|status)
        check_status
        ;;
      4|test)
        test_routes
        ;;
      5|docs)
        open_docs
        ;;
      6|inspect)
        inspect_design
        ;;
      7|colors)
        show_colors
        ;;
      8|fonts)
        show_fonts
        ;;
      9|help)
        show_menu
        ;;
      0|exit)
        echo "👋 Até logo!"
        exit 0
        ;;
      *)
        echo "❌ Opção inválida"
        ;;
    esac
    
    echo ""
    read -p "Pressione ENTER para continuar..."
    clear
  done
}

# Se script foi chamado com argumento, executa diretamente
if [ $# -gt 0 ]; then
  case $1 in
    start)
      start_server
      ;;
    stop)
      stop_server
      ;;
    status)
      check_status
      ;;
    test)
      test_routes
      ;;
    colors)
      show_colors
      ;;
    fonts)
      show_fonts
      ;;
    *)
      echo "Comando inválido. Use: start|stop|status|test|colors|fonts"
      exit 1
      ;;
  esac
else
  # Se chamado sem argumentos, mostra menu interativo
  clear
  main
fi

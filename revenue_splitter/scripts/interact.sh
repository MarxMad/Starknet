#!/bin/bash
# Script para interactuar con el contrato RevenueSplitter desplegado

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar la dirección del contrato"
    echo ""
    echo "Uso: ./scripts/interact.sh <CONTRACT_ADDRESS> <COMMAND> [ARGS...]"
    echo ""
    echo "Comandos disponibles:"
    echo "  balance                                    - Ver el balance del contrato"
    echo "  total_shares                               - Ver el total de shares"
    echo "  get_shares <RECIPIENT_ADDRESS>             - Ver shares de un recipient"
    echo "  add_recipient <RECIPIENT_ADDRESS> <SHARES> - Agregar un recipient (solo owner)"
    echo "  deposit <AMOUNT>                           - Depositar fondos"
    echo "  distribute                                 - Distribuir fondos (solo owner)"
    echo ""
    exit 1
fi

CONTRACT_ADDRESS=$1
COMMAND=$2

case $COMMAND in
    balance)
        echo "📊 Consultando balance..."
        sncast --profile sepolia call \
            --contract-address "$CONTRACT_ADDRESS" \
            --function get_balance
        ;;
    
    total_shares)
        echo "📊 Consultando total de shares..."
        sncast --profile sepolia call \
            --contract-address "$CONTRACT_ADDRESS" \
            --function get_total_shares
        ;;
    
    get_shares)
        if [ -z "$3" ]; then
            echo "❌ Error: Debes proporcionar la dirección del recipient"
            exit 1
        fi
        echo "📊 Consultando shares de $3..."
        sncast --profile sepolia call \
            --contract-address "$CONTRACT_ADDRESS" \
            --function get_recipient_shares \
            --calldata "$3"
        ;;
    
    add_recipient)
        if [ -z "$3" ] || [ -z "$4" ]; then
            echo "❌ Error: Debes proporcionar recipient address y shares"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS add_recipient <RECIPIENT_ADDRESS> <SHARES>"
            exit 1
        fi
        echo "➕ Agregando recipient $3 con $4 shares..."
        # u256 se serializa como (low, high), asumimos que shares cabe en low
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function add_recipient \
            --calldata "$3" "$4" 0 \
            --max-fee auto
        ;;
    
    deposit)
        if [ -z "$3" ]; then
            echo "❌ Error: Debes proporcionar el monto a depositar"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS deposit <AMOUNT>"
            exit 1
        fi
        echo "💰 Depositando $3..."
        # u256 se serializa como (low, high)
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function deposit \
            --calldata "$3" 0 \
            --max-fee auto
        ;;
    
    distribute)
        echo "🎁 Distribuyendo fondos..."
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function distribute \
            --max-fee auto
        ;;
    
    *)
        echo "❌ Comando desconocido: $COMMAND"
        echo ""
        echo "Comandos disponibles:"
        echo "  balance                                    - Ver el balance del contrato"
        echo "  total_shares                               - Ver el total de shares"
        echo "  get_shares <RECIPIENT_ADDRESS>             - Ver shares de un recipient"
        echo "  add_recipient <RECIPIENT_ADDRESS> <SHARES> - Agregar un recipient (solo owner)"
        echo "  deposit <AMOUNT>                           - Depositar fondos"
        echo "  distribute                                 - Distribuir fondos (solo owner)"
        exit 1
        ;;
esac


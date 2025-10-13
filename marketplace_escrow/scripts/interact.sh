#!/bin/bash
# Script para interactuar con el contrato MarketplaceEscrow desplegado

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar la dirección del contrato"
    echo ""
    echo "Uso: ./scripts/interact.sh <CONTRACT_ADDRESS> <COMMAND> [ARGS...]"
    echo ""
    echo "Comandos disponibles:"
    echo "  create_order <SELLER_ADDRESS> <AMOUNT>      - Crear nueva orden"
    echo "  complete_order <ORDER_ID>                   - Completar orden (solo buyer)"
    echo "  cancel_order <ORDER_ID>                     - Cancelar orden"
    echo "  dispute_order <ORDER_ID>                    - Disputar orden"
    echo "  resolve_dispute <ORDER_ID> <TO_SELLER>      - Resolver disputa (solo owner)"
    echo "  get_order <ORDER_ID>                        - Ver detalles de orden"
    echo "  get_user_orders <USER_ADDRESS>              - Ver órdenes de usuario"
    echo "  withdraw_fees                               - Retirar comisiones (solo owner)"
    echo ""
    exit 1
fi

CONTRACT_ADDRESS=$1
COMMAND=$2

case $COMMAND in
    create_order)
        if [ -z "$3" ] || [ -z "$4" ]; then
            echo "❌ Error: Debes proporcionar seller address y amount"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS create_order <SELLER_ADDRESS> <AMOUNT>"
            exit 1
        fi
        echo "🛒 Creando orden..."
        echo "   Seller: $3"
        echo "   Amount: $4"
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function create_order \
            --calldata "$3" "$4" 0 \
            --max-fee auto
        ;;
    
    complete_order)
        if [ -z "$3" ]; then
            echo "❌ Error: Debes proporcionar el order ID"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS complete_order <ORDER_ID>"
            exit 1
        fi
        echo "✅ Completando orden $3..."
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function complete_order \
            --calldata "$3" 0 \
            --max-fee auto
        ;;
    
    cancel_order)
        if [ -z "$3" ]; then
            echo "❌ Error: Debes proporcionar el order ID"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS cancel_order <ORDER_ID>"
            exit 1
        fi
        echo "❌ Cancelando orden $3..."
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function cancel_order \
            --calldata "$3" 0 \
            --max-fee auto
        ;;
    
    dispute_order)
        if [ -z "$3" ]; then
            echo "❌ Error: Debes proporcionar el order ID"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS dispute_order <ORDER_ID>"
            exit 1
        fi
        echo "⚖️ Disputando orden $3..."
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function dispute_order \
            --calldata "$3" 0 \
            --max-fee auto
        ;;
    
    resolve_dispute)
        if [ -z "$3" ] || [ -z "$4" ]; then
            echo "❌ Error: Debes proporcionar order ID y decisión"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS resolve_dispute <ORDER_ID> <1_para_seller_0_para_buyer>"
            exit 1
        fi
        echo "⚖️ Resolviendo disputa de orden $3..."
        echo "   Liberar a seller: $4"
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function resolve_dispute \
            --calldata "$3" 0 "$4" \
            --max-fee auto
        ;;
    
    get_order)
        if [ -z "$3" ]; then
            echo "❌ Error: Debes proporcionar el order ID"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS get_order <ORDER_ID>"
            exit 1
        fi
        echo "📊 Consultando orden $3..."
        sncast --profile sepolia call \
            --contract-address "$CONTRACT_ADDRESS" \
            --function get_order \
            --calldata "$3" 0
        ;;
    
    get_user_orders)
        if [ -z "$3" ]; then
            echo "❌ Error: Debes proporcionar la dirección del usuario"
            echo "Uso: ./scripts/interact.sh $CONTRACT_ADDRESS get_user_orders <USER_ADDRESS>"
            exit 1
        fi
        echo "📊 Consultando órdenes del usuario $3..."
        sncast --profile sepolia call \
            --contract-address "$CONTRACT_ADDRESS" \
            --function get_user_orders \
            --calldata "$3"
        ;;
    
    withdraw_fees)
        echo "💰 Retirando comisiones acumuladas..."
        sncast --profile sepolia invoke \
            --contract-address "$CONTRACT_ADDRESS" \
            --function withdraw_fees \
            --max-fee auto
        ;;
    
    *)
        echo "❌ Comando desconocido: $COMMAND"
        echo ""
        echo "Comandos disponibles:"
        echo "  create_order <SELLER_ADDRESS> <AMOUNT>"
        echo "  complete_order <ORDER_ID>"
        echo "  cancel_order <ORDER_ID>"
        echo "  dispute_order <ORDER_ID>"
        echo "  resolve_dispute <ORDER_ID> <TO_SELLER>"
        echo "  get_order <ORDER_ID>"
        echo "  get_user_orders <USER_ADDRESS>"
        echo "  withdraw_fees"
        exit 1
        ;;
esac


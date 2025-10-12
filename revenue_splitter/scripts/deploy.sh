#!/bin/bash
# Script para desplegar el contrato RevenueSplitter en Starknet Sepolia

if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar el class hash como argumento"
    echo ""
    echo "Uso: ./scripts/deploy.sh <CLASS_HASH> <OWNER_ADDRESS>"
    echo ""
    echo "Ejemplo:"
    echo "  ./scripts/deploy.sh 0x123...abc 0x456...def"
    echo ""
    echo "Donde:"
    echo "  - CLASS_HASH: El hash de la clase obtenido al declarar el contrato"
    echo "  - OWNER_ADDRESS: La dirección del propietario inicial del contrato"
    exit 1
fi

if [ -z "$2" ]; then
    echo "❌ Error: Debes proporcionar la dirección del propietario (owner)"
    echo ""
    echo "Uso: ./scripts/deploy.sh <CLASS_HASH> <OWNER_ADDRESS>"
    echo ""
    echo "Ejemplo:"
    echo "  ./scripts/deploy.sh 0x123...abc 0x456...def"
    exit 1
fi

CLASS_HASH=$1
OWNER_ADDRESS=$2

echo "📤 Desplegando RevenueSplitter..."
echo "   Class Hash: $CLASS_HASH"
echo "   Owner: $OWNER_ADDRESS"
echo ""

sncast --profile sepolia deploy \
    --class-hash "$CLASS_HASH" \
    --constructor-calldata "$OWNER_ADDRESS" \
    --max-fee auto

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Contrato desplegado exitosamente"
    echo "   Guarda la 'Contract Address' del resultado anterior"
else
    echo ""
    echo "❌ Error al desplegar el contrato"
fi


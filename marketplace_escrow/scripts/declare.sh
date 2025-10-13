#!/bin/bash
# Script para declarar el contrato MarketplaceEscrow en Starknet Sepolia

echo "🔨 Compilando el contrato MarketplaceEscrow..."
scarb build

if [ $? -ne 0 ]; then
    echo "❌ Error al compilar el contrato"
    exit 1
fi

echo ""
echo "📤 Declarando el contrato en Sepolia testnet..."
echo "   Nota: Necesitas tener una cuenta configurada en snfoundry"
echo ""

sncast --profile sepolia declare \
    --contract-name MarketplaceEscrow

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Contrato declarado exitosamente"
    echo "   Copia el 'Class Hash' del resultado anterior"
    echo "   Lo necesitarás para desplegar el contrato"
else
    echo ""
    echo "❌ Error al declarar el contrato"
    echo "   Verifica que tengas una cuenta configurada correctamente"
fi


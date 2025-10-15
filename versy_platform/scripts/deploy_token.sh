#!/bin/bash
# Deploy VersyToken contract to Starknet Sepolia

if [ -z "$1" ]; then
    echo "❌ Error: Owner address required"
    echo ""
    echo "Usage: ./scripts/deploy_token.sh <OWNER_ADDRESS>"
    echo ""
    echo "Example:"
    echo "  ./scripts/deploy_token.sh 0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1"
    exit 1
fi

OWNER=$1

echo "📤 Deploying VersyToken..."
echo "   Owner: $OWNER"
echo ""

# Declare the contract
echo "1️⃣ Declaring contract..."
DECLARE_OUTPUT=$(sncast --account=sepolia declare \
    --contract-name=VersyToken \
    --network=sepolia 2>&1)

if [ $? -ne 0 ]; then
    # Check if already declared
    if echo "$DECLARE_OUTPUT" | grep -q "already declared"; then
        echo "✅ Contract already declared"
        CLASS_HASH=$(echo "$DECLARE_OUTPUT" | grep -o '0x[0-9a-fA-F]\+' | head -1)
    else
        echo "❌ Declaration failed"
        echo "$DECLARE_OUTPUT"
        exit 1
    fi
else
    CLASS_HASH=$(echo "$DECLARE_OUTPUT" | grep "class_hash:" | awk '{print $2}')
    echo "✅ Contract declared"
fi

echo "   Class Hash: $CLASS_HASH"
echo ""

# Deploy the contract
echo "2️⃣ Deploying contract..."
sncast --account=sepolia deploy \
    --class-hash "$CLASS_HASH" \
    --constructor-calldata "$OWNER" \
    --network=sepolia

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ VersyToken deployed successfully!"
    echo "   Total Supply: 1,000,000,000 VERSY"
    echo "   All tokens minted to: $OWNER"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Save the contract address"
    echo "   2. Deploy VersyPlatform with this token address"
    echo "   3. Transfer tokens to platform for welcome bonuses"
else
    echo ""
    echo "❌ Deployment failed"
fi


#!/bin/bash
# Deploy VersyPlatform contract to Starknet Sepolia

if [ -z "$1" ] || [ -z "$2" ]; then
    echo "❌ Error: Owner and token address required"
    echo ""
    echo "Usage: ./scripts/deploy_platform.sh <OWNER_ADDRESS> <TOKEN_ADDRESS>"
    echo ""
    echo "Example:"
    echo "  ./scripts/deploy_platform.sh \\"
    echo "    0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1 \\"
    echo "    0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a"
    exit 1
fi

OWNER=$1
TOKEN=$2

echo "📤 Deploying VersyPlatform..."
echo "   Owner: $OWNER"
echo "   Token: $TOKEN"
echo ""

# Declare the contract
echo "1️⃣ Declaring contract..."
DECLARE_OUTPUT=$(sncast --account=sepolia declare \
    --contract-name=VersyPlatform \
    --network=sepolia 2>&1)

if [ $? -ne 0 ]; then
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
    --constructor-calldata "$OWNER" "$TOKEN" \
    --network=sepolia

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ VersyPlatform deployed successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Transfer VERSY tokens to platform for welcome bonuses"
    echo "      Recommended: 100M VERSY (Early Adopters Pool)"
    echo "   2. Test uploading a video"
    echo "   3. Test the like system"
else
    echo ""
    echo "❌ Deployment failed"
fi


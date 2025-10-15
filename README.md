# 🚀 Starknet Hackathon - Marketplace Escrow

Contrato inteligente de escrow para marketplace descentralizado en Starknet, desarrollado durante el hackathon.

## 📦 Proyecto

### Marketplace Escrow 🛒

Sistema de escrow seguro para marketplace descentralizado en Starknet.

**Características:**
- ✅ Escrow con protección buyer/seller
- ✅ Sistema de órdenes completo
- ✅ Resolución de disputas
- ✅ Comisiones de plataforma configurables
- ✅ Matemática segura con u256
- ✅ 7 tests pasando (100%)
- ✅ **Desplegado en Sepolia** 🎉

**Contrato Desplegado:**
- **Address**: `0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a`
- **Network**: Starknet Sepolia
- **Explorer**: [Ver en Starkscan](https://sepolia.starkscan.co/contract/0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a)

**Documentación:**
- [README Principal](./marketplace_escrow/README.md)
- [Guía de Despliegue Completa](./marketplace_escrow/DEPLOYMENT.md)

**Uso rápido:**
```bash
cd marketplace_escrow

# Compilar
scarb build

# Ejecutar tests
scarb test

# Interactuar con el contrato desplegado
./scripts/interact.sh <CONTRACT_ADDRESS> <COMANDO> [ARGS]

# Ejemplo: Crear una orden
./scripts/interact.sh \
    0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a \
    create_order \
    <SELLER_ADDRESS> \
    1000
```

## 🛠️ Tecnologías

- **Cairo 2.11.4** - Lenguaje de smart contracts
- **Starknet** - Layer 2 de Ethereum
- **Scarb 2.11.4** - Build tool
- **Starknet Foundry 0.44.0** - Testing framework
- **OpenZeppelin v0.20.0** - Librerías de seguridad

## 🚀 Inicio Rápido

### Prerequisitos

```bash
# Instalar Scarb
curl --proto '=https' --tlsv1.2 -sSf https://docs.swmansion.com/scarb/install.sh | sh

# Instalar Starknet Foundry
curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh
```

### Clonar y Setup

```bash
git clone https://github.com/MarxMad/Starknet.git
cd Starknet/marketplace_escrow

# Compilar
scarb build

# Ejecutar tests
scarb test

# Interactuar con el contrato desplegado
./scripts/interact.sh \
    0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a \
    get_order 1
```

## 📚 Documentación

Documentación completa del proyecto:

- **[README Principal](./marketplace_escrow/README.md)** - Guía completa del contrato y funcionalidades
- **[Guía de Despliegue](./marketplace_escrow/DEPLOYMENT.md)** - Paso a paso para desplegar en Sepolia
- **[Quick Reference](./marketplace_escrow/QUICK_REFERENCE.md)** - Comandos rápidos y ejemplos

## 🎯 Casos de Uso

El Marketplace Escrow es ideal para:

- **🖼️ NFT Marketplaces** - Protección en compra/venta de NFTs
- **💼 Servicios Freelance** - Garantía de pago por trabajo completado
- **🛍️ E-commerce P2P** - Transacciones seguras entre particulares
- **🎮 Gaming Assets** - Intercambio seguro de items en juegos
- **📦 Productos Físicos** - Escrow para envíos y entregas

## 🔗 Enlaces Útiles

- **Starknet Docs**: https://docs.starknet.io/
- **Cairo Book**: https://book.cairo-lang.org/
- **Starknet Foundry**: https://foundry-rs.github.io/starknet-foundry/
- **OpenZeppelin Cairo**: https://docs.openzeppelin.com/contracts-cairo/
- **Sepolia Explorer**: https://sepolia.starkscan.co/
- **Faucet**: https://blastapi.io/faucets/starknet-sepolia-eth

## 🤝 Contribuir

Este es un proyecto de hackathon. Las contribuciones son bienvenidas.

## 📝 Licencia

Desarrollado para el Starknet Hackathon 2025.

## 👨‍💻 Autor

- GitHub: [@MarxMad](https://github.com/MarxMad)
- Proyecto: [Starknet Hackathon](https://github.com/MarxMad/Starknet)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!



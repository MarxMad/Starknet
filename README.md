# 🚀 Starknet Hackathon - Contratos Inteligentes

Repositorio con proyectos de contratos inteligentes en Cairo para Starknet, desarrollados durante el hackathon.

## 📦 Proyectos

### 1. RevenueSplitter 💰

Contrato inteligente para distribuir ingresos automáticamente entre múltiples receptores según sus participaciones.

**Características:**
- ✅ Matemática segura con u256
- ✅ Control de acceso con OpenZeppelin Ownable
- ✅ Distribución proporcional de fondos
- ✅ Integración completa con ChipiPay
- ✅ 4 tests pasando (100%)
- ✅ Scripts de despliegue automatizados

**Documentación:**
- [README Principal](./revenue_splitter/README.md)
- [Guía de Despliegue](./revenue_splitter/DEPLOYMENT.md)
- [Quick Start](./revenue_splitter/QUICK_START.md)
- [Integración ChipiPay](./revenue_splitter/integrations/chipipay/README.md)

**Uso rápido:**
```bash
cd revenue_splitter

# Compilar
scarb build

# Ejecutar tests
scarb test

# Desplegar
./scripts/declare.sh
./scripts/deploy.sh <CLASS_HASH> <OWNER>
```

### 2. Marketplace Escrow 🛒

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

- **Cairo 1.0** - Lenguaje de smart contracts
- **Starknet** - Layer 2 de Ethereum
- **Scarb 2.11.4** - Build tool
- **Starknet Foundry 0.44.0** - Testing framework
- **OpenZeppelin** - Librerías de seguridad
- **ChipiPay** - Procesamiento de pagos

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
cd Starknet

# Ir al proyecto que quieras usar
cd revenue_splitter

# Compilar
scarb build

# Ejecutar tests
scarb test
```

## 📚 Documentación

Cada proyecto tiene su propia documentación completa:

- **RevenueSplitter**: Ver [revenue_splitter/README.md](./revenue_splitter/README.md)
- **Marketplace Escrow**: Ver [marketplace_escrow/README.md](./marketplace_escrow/README.md)

## 🔗 Enlaces Útiles

- **Starknet Docs**: https://docs.starknet.io/
- **Cairo Book**: https://book.cairo-lang.org/
- **Starknet Foundry**: https://foundry-rs.github.io/starknet-foundry/
- **OpenZeppelin Cairo**: https://docs.openzeppelin.com/contracts-cairo/
- **Sepolia Explorer**: https://sepolia.starkscan.co/
- **Faucet**: https://starknet-faucet.vercel.app/

## 🤝 Contribuir

Este es un proyecto de hackathon. Las contribuciones son bienvenidas.

## 📝 Licencia

Desarrollado para el Starknet Hackathon 2025.

## 👨‍💻 Autor

- GitHub: [@MarxMad](https://github.com/MarxMad)
- Proyecto: [Starknet Hackathon](https://github.com/MarxMad/Starknet)

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!



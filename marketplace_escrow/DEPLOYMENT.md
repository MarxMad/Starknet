# 🚀 Información de Despliegue - Marketplace Escrow

## 📋 Despliegue Actual en Sepolia

**Fecha:** 15 de Octubre, 2025  
**Red:** Starknet Sepolia Testnet

---

## 🔑 Direcciones y Hashes

### Contrato Desplegado

- **Contract Address:**  
  ```
  0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a
  ```

- **Class Hash:**  
  ```
  0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c
  ```

- **Owner Address:**  
  ```
  0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1
  ```

---

## ⚙️ Configuración

- **Comisión de Plataforma:** 5%
- **Red:** Starknet Sepolia
- **Versión de Cairo:** 2.11.4
- **Versión de Starknet:** 2.11.4
- **OpenZeppelin:** v0.20.0

---

## 🔗 Enlaces Importantes

### Explorer (Starkscan)

- **Contrato:**  
  https://sepolia.starkscan.co/contract/0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a

- **Clase:**  
  https://sepolia.starkscan.co/class/0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c

- **Cuenta Owner:**  
  https://sepolia.starkscan.co/contract/0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1

### Transacciones

- **Despliegue de Cuenta:**  
  https://sepolia.starkscan.co/tx/0x00e3096bda16dd7090b319d2efa2b541b299a401cf1426065268503e680f10bb

- **Declaración del Contrato:**  
  https://sepolia.starkscan.co/tx/0x05ccde1bbd69a9d90bba9cad5da0b3ad05b58b6e68bbe9797c66d347507b9c92

- **Despliegue del Contrato:**  
  https://sepolia.starkscan.co/tx/0x06861eddc5e6e0a6ce28f64214488ea2428b7eaf3ad5f997ea3d4116905c32ae

---

## 🎮 Guía Rápida de Uso

### Variables de Entorno (para scripts)

Exporta estas variables para facilitar el uso:

```bash
export CONTRACT_ADDRESS=0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a
export OWNER_ADDRESS=0x03b388717af214746822e3dffaeb42976428e360bcdfbd26c327e870d154aad1
export CLASS_HASH=0x00d856a8240e0ee6ea346eb6a76655370f958495401c797228f366a82f125c0c
```

### Comandos Más Usados

#### Crear una orden
```bash
./scripts/interact.sh $CONTRACT_ADDRESS create_order <SELLER_ADDRESS> <AMOUNT>
```

#### Ver una orden
```bash
./scripts/interact.sh $CONTRACT_ADDRESS get_order <ORDER_ID>
```

#### Completar orden (como buyer)
```bash
./scripts/interact.sh $CONTRACT_ADDRESS complete_order <ORDER_ID>
```

#### Ver tus órdenes
```bash
./scripts/interact.sh $CONTRACT_ADDRESS get_user_orders $OWNER_ADDRESS
```

---

## 📊 Estado del Contrato

### Estadísticas Actuales

Para ver el estado en tiempo real, visita:
```
https://sepolia.starkscan.co/contract/0x05f3ad89fe8115a281dcde06e2578123bc711dee7d2b650a830fec21f27bea8a
```

---

## 🔐 Seguridad

### Claves Privadas

⚠️ **IMPORTANTE:** 

- Las claves privadas de tu cuenta están almacenadas en:
  ```
  ~/.starknet_accounts/starknet_open_zeppelin_accounts.json
  ```

- **NUNCA compartas este archivo**
- **NUNCA subas este archivo a GitHub**
- **Haz backup en un lugar seguro**

### Permisos del Owner

Como owner del contrato, puedes:
- ✅ Resolver disputas
- ✅ Retirar comisiones acumuladas
- ❌ NO puedes modificar órdenes directamente
- ❌ NO puedes cambiar el porcentaje de comisión (está fijo en el despliegue)

---

## 🔄 Próximos Pasos

### Para desarrollo

1. **Testear el contrato:**
   ```bash
   cd marketplace_escrow
   scarb test
   ```

2. **Crear una orden de prueba:**
   ```bash
   ./scripts/interact.sh $CONTRACT_ADDRESS create_order \
       0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef \
       1000
   ```

3. **Monitorear transacciones** en Starkscan

### Para producción

1. **Auditar el código** antes de desplegar en mainnet
2. **Cambiar a Starknet Mainnet** modificando `--network` a `mainnet`
3. **Usar una wallet de hardware** para la cuenta owner
4. **Configurar monitoreo** de eventos y transacciones

---

## 📝 Notas del Despliegue

### Proceso de Despliegue

1. ✅ Cuenta creada en Sepolia
2. ✅ Fondos obtenidos del faucet (Blast API)
3. ✅ Cuenta desplegada exitosamente
4. ✅ Contrato compilado con Scarb 2.11.4
5. ✅ Contrato declarado en Sepolia
6. ✅ Contrato desplegado con fee de 5%

### Costos de Gas (Testnet)

- **Deploy Account:** ~0.0029 STRK
- **Declare Contract:** ~0.0015 STRK
- **Deploy Contract:** ~0.0012 STRK
- **Create Order:** ~0.0008 STRK
- **Complete Order:** ~0.0010 STRK

*Los costos varían según la congestión de la red*

---

## 🆘 Soporte

### Recursos

- **Documentación Starknet:** https://docs.starknet.io/
- **Cairo Book:** https://book.cairo-lang.org/
- **Starknet Discord:** https://discord.gg/starknet
- **Faucet:** https://blastapi.io/faucets/starknet-sepolia-eth

### Troubleshooting

Si encuentras problemas:

1. Verifica que tengas suficiente ETH/STRK para gas
2. Revisa el estado de la transacción en Starkscan
3. Consulta los logs en la terminal
4. Lee la sección de Troubleshooting en el README

---

**Última actualización:** 15 de Octubre, 2025  
**Versión del Contrato:** 1.0.0  
**Mantenido por:** @MarxMad


# Guía de Despliegue - RevenueSplitter en Starknet Sepolia

Esta guía te ayudará a desplegar el contrato RevenueSplitter en la testnet de Starknet (Sepolia).

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener:

1. **Starknet Foundry instalado** (sncast)
   ```bash
   curl -L https://raw.githubusercontent.com/foundry-rs/starknet-foundry/master/scripts/install.sh | sh
   ```

2. **Una wallet de Starknet con fondos en Sepolia**
   - Puedes usar Argent X o Braavos
   - Obtén ETH de testnet en: https://starknet-faucet.vercel.app/

3. **Una cuenta configurada con sncast**

## 🔐 Paso 1: Configurar tu Cuenta

### Opción A: Crear una nueva cuenta con sncast

```bash
# Crear una nueva cuenta
sncast account create \
    --name my_account \
    --url https://starknet-sepolia.public.blastapi.io/rpc/v0_7

# Desplegar la cuenta (necesitarás fondos)
sncast account deploy \
    --name my_account \
    --max-fee auto \
    --url https://starknet-sepolia.public.blastapi.io/rpc/v0_7
```

### Opción B: Importar cuenta existente desde wallet

Si ya tienes una wallet (Argent X o Braavos):

```bash
sncast account add \
    --name my_account \
    --address <TU_DIRECCION> \
    --private-key <TU_CLAVE_PRIVADA> \
    --type oz
```

### Verificar tu cuenta

```bash
sncast account list
```

## 📝 Paso 2: Configurar snfoundry.toml

Ya hemos creado el archivo `snfoundry.toml` con la configuración básica. Edítalo si necesitas cambiar el nombre de la cuenta:

```toml
[sncast.sepolia]
account = "my_account"  # Cambia esto al nombre de tu cuenta
accounts-file = "~/.starknet_accounts/starknet_open_zeppelin_accounts.json"
url = "https://starknet-sepolia.public.blastapi.io/rpc/v0_7"
```

## 🚀 Paso 3: Declarar el Contrato

La declaración es el proceso de registrar el código del contrato en la red. Solo necesitas hacerlo una vez por cada versión única del contrato.

### Método 1: Usando el script automático

```bash
./scripts/declare.sh
```

### Método 2: Manual

```bash
# Compilar primero
scarb build

# Declarar
sncast --profile sepolia declare \
    --contract-name RevenueSplitter \
    --max-fee auto
```

**Resultado esperado:**
```
Success: Declaration completed

Class Hash:       0x05...abc
Transaction Hash: 0x07...def

To see declaration details, visit:
class: https://sepolia.starkscan.co/class/0x05...abc
transaction: https://sepolia.starkscan.co/tx/0x07...def
```

⚠️ **IMPORTANTE**: Guarda el `Class Hash` que se muestra en el resultado. Lo necesitarás para el despliegue.

## 🎯 Paso 4: Desplegar el Contrato

Ahora que el contrato está declarado, puedes desplegarlo. Necesitarás:
- El **Class Hash** del paso anterior
- La **dirección del owner** (propietario inicial del contrato)

### Método 1: Usando el script automático

```bash
./scripts/deploy.sh <CLASS_HASH> <OWNER_ADDRESS>
```

Ejemplo:
```bash
./scripts/deploy.sh \
    0x05a1b2c3d4e5f6... \
    0x01234567890abc...
```

### Método 2: Manual

```bash
sncast --profile sepolia deploy \
    --class-hash <CLASS_HASH> \
    --constructor-calldata <OWNER_ADDRESS> \
    --max-fee auto
```

**Resultado esperado:**
```
Success: Deployment completed

Contract Address: 0x04...xyz
Transaction Hash: 0x06...ghi

To see deployment details, visit:
contract: https://sepolia.starkscan.co/contract/0x04...xyz
transaction: https://sepolia.starkscan.co/tx/0x06...ghi
```

🎉 **¡Felicidades!** Tu contrato está desplegado en Sepolia.

## 🔍 Paso 5: Verificar el Despliegue

Visita Starkscan para ver tu contrato:
```
https://sepolia.starkscan.co/contract/<CONTRACT_ADDRESS>
```

Puedes verificar:
- ✅ El contrato está activo
- ✅ El constructor se ejecutó correctamente
- ✅ El owner está configurado

## 🎮 Paso 6: Interactuar con el Contrato

Una vez desplegado, puedes interactuar con el contrato usando `sncast call` o `sncast invoke`:

### Agregar un receptor (solo owner)

```bash
sncast --profile sepolia invoke \
    --contract-address <CONTRACT_ADDRESS> \
    --function add_recipient \
    --calldata <RECIPIENT_ADDRESS> <SHARES> \
    --max-fee auto
```

Ejemplo para agregar un receptor con 100 shares:
```bash
sncast --profile sepolia invoke \
    --contract-address 0x04...xyz \
    --function add_recipient \
    --calldata 0x0123...abc 100 0 \
    --max-fee auto
```

Nota: u256 se serializa como dos felt252, por eso pasamos `100 0` (low, high).

### Depositar fondos (cualquiera puede depositar)

```bash
sncast --profile sepolia invoke \
    --contract-address <CONTRACT_ADDRESS> \
    --function deposit \
    --calldata 1000 0 \
    --max-fee auto
```

### Consultar el balance

```bash
sncast --profile sepolia call \
    --contract-address <CONTRACT_ADDRESS> \
    --function get_balance
```

### Consultar shares de un receptor

```bash
sncast --profile sepolia call \
    --contract-address <CONTRACT_ADDRESS> \
    --function get_recipient_shares \
    --calldata <RECIPIENT_ADDRESS>
```

### Distribuir fondos (solo owner)

```bash
sncast --profile sepolia invoke \
    --contract-address <CONTRACT_ADDRESS> \
    --function distribute \
    --max-fee auto
```

## 🐛 Solución de Problemas

### Error: "Account not found"
- Verifica que hayas creado y desplegado tu cuenta correctamente
- Ejecuta `sncast account list` para ver tus cuentas disponibles

### Error: "Insufficient balance"
- Necesitas ETH en tu cuenta para pagar las tarifas de transacción
- Obtén fondos de: https://starknet-faucet.vercel.app/

### Error: "Class already declared"
- El contrato ya fue declarado previamente
- Esto está bien, puedes proceder directamente al despliegue
- Busca el class hash en exploradores como Starkscan

### Error: "Invalid constructor arguments"
- Verifica que estés pasando la dirección del owner correctamente
- Las direcciones deben ser felt252 válidos en formato hexadecimal (0x...)

## 📚 Recursos Adicionales

- **Starknet Book**: https://book.starknet.io/
- **Starknet Foundry Docs**: https://foundry-rs.github.io/starknet-foundry/
- **Sepolia Explorer**: https://sepolia.starkscan.co/
- **Starknet Faucet**: https://starknet-faucet.vercel.app/
- **Discord de Starknet**: https://discord.gg/starknet

## 📝 Notas Importantes

1. **Testnet vs Mainnet**: Esta guía es para Sepolia (testnet). Para mainnet, cambia la URL y usa fondos reales.
2. **Fees**: Todas las transacciones requieren ETH para pagar fees. Usa `--max-fee auto` para calcularlos automáticamente.
3. **Class Hash**: El class hash es único para cada versión del contrato. Si modificas el código, tendrás un nuevo class hash.
4. **Contract Address**: Cada instancia desplegada tiene una dirección única, incluso si usan el mismo class hash.

## ✅ Checklist de Despliegue

- [ ] Instalé Starknet Foundry
- [ ] Configuré mi cuenta con sncast
- [ ] Tengo ETH en mi cuenta de Sepolia
- [ ] Compilé el contrato con `scarb build`
- [ ] Declaré el contrato y guardé el Class Hash
- [ ] Desplegué el contrato con la dirección del owner
- [ ] Verifiqué el contrato en Starkscan
- [ ] Probé interactuar con el contrato

---

¡Buena suerte con tu despliegue! 🚀


# ZKsync Local Development Setup

This directory contains scripts to run ZKsync and Ethereum L1 networks locally using `zksync-os-server` and Foundry's Anvil.

## Prerequisites

See the [ZKsync OS Server Prerequisites](https://matter-labs.github.io/zksync-os-server/latest/setup/prerequisites.html)
for the prequisites to running ZKsync OS Server.

## Quick Start

### 1. First-time Setup

Download the ZKsync OS Server binaries and state files:

```bash
npm run local:setup
```

This will:

- Detect your OS and architecture
- Download the latest `zksync-os-server` binary
- Download the genesis file (`genesis.json`)
- Download the L1 state file (`zkos-l1-state.json`) with pre-deployed ZKsync L1 contracts
- Store everything in `.zksync-local/` directory

### 2. Start Local Networks

Start both L1 and L2 networks:

```bash
npm run local:start
```

This will:

- Start Anvil (L1) on port 8545 with pre-deployed ZKsync L1 contracts in detached mode
- Start ZKsync OS Server (L2) on port 3050 in detached mode
- Wait for L1 to be ready before starting L2
- Display RPC endpoints and account information

**Network Endpoints:**

- L1 (Anvil): `http://localhost:8545`
- L2 (ZKsync): `http://localhost:3050`

**Pre-funded Test Accounts:**

The nodes use Anvil's default test mnemonic with pre-funded accounts:

Account #0:

- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
- Balance: 10,000 ETH

Account #1:

- Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- Private Key: `0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d`
- Balance: 10,000 ETH

Mnemonic: `test test test test test test test test test test test junk`

**View Logs:**

```bash
# L1 logs
tail -f .zksync-local/anvil.log

# L2 logs
tail -f .zksync-local/l2.log
```

### 3. Stop Networks

Stop both L1 and L2 nodes:

```bash
npm run local:stop
```

This will gracefully shut down both nodes and clean up PID files.

### 4. Clear State (Reset)

Clear database and cache while preserving downloaded binaries:

```bash
npm run local:clear
```

This will:

- Stop running nodes
- Remove the `db/` directory (node state)
- Remove the `.zksync-local/cache/` directory
- Remove log files
- Keep the downloaded binaries and state files (no re-download needed)

Use this when you want to reset to a clean state without re-downloading the ~128MB server binary.

## Advanced Usage

### Run L1 Only

```bash
npm run local:l1
```

### Run L2 Only

```bash
npm run local:l2
```

Note: L2 requires L1 to be running, so start L1 first.

### Custom Ports

You can customize ports using environment variables:

```bash
# Custom L1 port
L1_PORT=9545 npm run local:l1

# Custom L2 port
L2_PORT=4050 npm run local:l2
```

### Specify Version

Download a specific version of zksync-os-server:

```bash
ZKSYNC_OS_VERSION=v0.1.0 npm run local:setup
```

## File Structure

```bash
.zksync-local/
├── zksync-os-server      # Server binary
├── genesis.json          # L2 genesis configuration
├── zkos-l1-state.json    # L1 state with pre-deployed contracts
├── cache/                # Downloaded archives
├── anvil.log             # L1 logs
└── l2.log                # L2 logs
```

## Troubleshooting

### Anvil not found

Install Foundry:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

### Port already in use

Check if another process is using ports 8545 or 3050:

```bash
# On macOS/Linux
lsof -i :8545
lsof -i :3050
```

### L2 fails to start

Ensure L1 is running and healthy:

```bash
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545
```

### L2 crashes or panics (database corruption)

If L2 starts but crashes shortly after with errors like "attempt to subtract with overflow" or "priority_tree component failed",
the database state may be corrupted:

```bash
# Clear state and restart
npm run local:clear
npm run local:start
```

The `db/` directory contains the node's state and can sometimes become corrupted, especially after unexpected shutdowns.

### Clean slate

Remove all downloaded files and start fresh:

```bash
rm -rf .zksync-local
npm run local:setup
```

## Network Configuration

The local network is configured in `networks/local.ts` as `zksyncDockerizedNode` and can be selected in the app's network switcher.

## Resources

- [ZKsync OS Server](https://github.com/matter-labs/zksync-os-server)
- [ZKsync OS Server Documentation](https://matter-labs.github.io/zksync-os-server/latest/)
- [ZKsync OS Server Prerequisites](https://matter-labs.github.io/zksync-os-server/latest/setup/prerequisites.html)
- [ZKsync OS Documentation](https://docs.zksync.io/zksync-network/zksync-os)
- [Foundry Book](https://book.getfoundry.sh/)

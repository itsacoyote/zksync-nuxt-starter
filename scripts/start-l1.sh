#!/usr/bin/env bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
BASE_DIR=".zksync-local"
L1_PORT="${L1_PORT:-8545}"
L1_STATE_FILE="$BASE_DIR/zkos-l1-state.json"
LOG_FILE="$BASE_DIR/anvil.log"

# Check if anvil is installed
if ! command -v anvil &> /dev/null; then
  echo -e "${RED}Error: anvil not found${NC}"
  echo "Please install Foundry: https://book.getfoundry.sh/getting-started/installation"
  exit 1
fi

# Check if L1 state file exists
if [ ! -f "$L1_STATE_FILE" ]; then
  echo -e "${RED}Error: L1 state file not found at $L1_STATE_FILE${NC}"
  echo "Please run: npm run local:setup"
  exit 1
fi

# Create log directory
mkdir -p "$BASE_DIR"

echo -e "${GREEN}Starting L1 Node (Anvil) with ZKsync L1 contracts${NC}"
echo "======================================"
echo -e "${YELLOW}Port:${NC} $L1_PORT"
echo -e "${YELLOW}State File:${NC} $L1_STATE_FILE"
echo -e "${YELLOW}Logs:${NC} $LOG_FILE"
echo -e "${YELLOW}RPC:${NC} http://localhost:$L1_PORT"
echo "======================================"
echo ""
echo -e "${YELLOW}Pre-funded Test Accounts (from anvil default mnemonic):${NC}"
echo ""
echo "Account #0:"
echo "  Address:     0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
echo "  Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
echo "  Balance:     10,000 ETH"
echo ""
echo "Account #1:"
echo "  Address:     0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
echo "  Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
echo "  Balance:     10,000 ETH"
echo ""
echo -e "${YELLOW}Mnemonic:${NC} test test test test test test test test test test test junk"
echo -e "${YELLOW}Note:${NC} This L1 state includes pre-deployed ZKsync L1 contracts"
echo ""

# Check if running in detached mode
if [ "${DETACHED:-false}" = "true" ]; then
  echo -e "${GREEN}Starting in detached mode...${NC}"
  # Start anvil in background with nohup
  nohup anvil \
    --load-state "$L1_STATE_FILE" \
    --port "$L1_PORT" \
    > "$LOG_FILE" 2>&1 < /dev/null &

  L1_PID=$!
  echo $L1_PID > "$BASE_DIR/anvil.pid"
  echo -e "${GREEN}✓${NC} L1 node started (PID: $L1_PID)"
  echo -e "${YELLOW}Tail logs:${NC} tail -f $LOG_FILE"
else
  # Start in foreground with output to terminal
  exec anvil \
    --load-state "$L1_STATE_FILE" \
    --port "$L1_PORT" \
    2>&1 | tee "$LOG_FILE"
fi

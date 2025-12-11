#!/usr/bin/env bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
BASE_DIR=".zksync-local"
SERVER_BIN="$BASE_DIR/zksync-os-server"
GENESIS_FILE="$BASE_DIR/genesis.json"
L2_PORT="${L2_PORT:-3050}"
L1_RPC="${L1_RPC:-http://localhost:8545}"
LOG_FILE="$BASE_DIR/l2.log"

# Check if server binary exists
if [ ! -f "$SERVER_BIN" ]; then
  echo -e "${RED}Error: Server binary not found at $SERVER_BIN${NC}"
  echo "Please run: npm run local:setup"
  exit 1
fi

# Check if genesis file exists
if [ ! -f "$GENESIS_FILE" ]; then
  echo -e "${RED}Error: Genesis file not found at $GENESIS_FILE${NC}"
  echo "Please run: npm run local:setup"
  exit 1
fi

# Create log directory
mkdir -p "$BASE_DIR"

echo -e "${GREEN}Starting L2 Node (ZKsync OS Server)${NC}"
echo "======================================"
echo -e "${YELLOW}Port:${NC} $L2_PORT"
echo -e "${YELLOW}L1 RPC:${NC} $L1_RPC"
echo -e "${YELLOW}Genesis:${NC} $GENESIS_FILE"
echo -e "${YELLOW}Logs:${NC} $LOG_FILE"
echo -e "${YELLOW}RPC:${NC} http://localhost:$L2_PORT"
echo "======================================"
echo ""
echo -e "${YELLOW}Note:${NC} Use the Anvil accounts displayed by the L1 node"
echo ""

# Wait for L1 to be ready
echo -e "${YELLOW}Waiting for L1 node to be ready...${NC}"
for i in {1..30}; do
  if curl -s -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
    "$L1_RPC" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} L1 node is ready"
    break
  fi

  if [ $i -eq 30 ]; then
    echo -e "${RED}Error: L1 node not responding at $L1_RPC${NC}"
    exit 1
  fi

  sleep 1
done

# Check if running in detached mode
if [ "${DETACHED:-false}" = "true" ]; then
  echo -e "${GREEN}Starting in detached mode...${NC}"

  # Start L2 in background (use setsid if available, otherwise use nohup)
  if command -v setsid &> /dev/null; then
    setsid bash -c "exec $SERVER_BIN </dev/null >>$LOG_FILE 2>&1" &
  else
    nohup "$SERVER_BIN" >> "$LOG_FILE" 2>&1 < /dev/null &
  fi

  L2_PID=$!
  echo $L2_PID > "$BASE_DIR/l2.pid"
  echo -e "${GREEN}✓${NC} L2 node started (PID: $L2_PID)"
  echo -e "${YELLOW}Tail logs:${NC} tail -f $LOG_FILE"
else
  # Start in foreground with output to terminal
  exec "$SERVER_BIN" 2>&1 | tee "$LOG_FILE"
fi

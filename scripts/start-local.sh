#!/usr/bin/env bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BASE_DIR=".zksync-local"

# Check if setup has been run
if [ ! -f "$BASE_DIR/zksync-os-server" ] || [ ! -f "$BASE_DIR/zkos-l1-state.json" ]; then
  echo -e "${YELLOW}First time setup required...${NC}"
  ./scripts/setup-zksync-local.sh
  echo ""
fi

echo -e "${GREEN}Starting ZKsync Local Development Environment${NC}"
echo "=============================================="
echo ""
echo "This will start both L1 (Anvil) and L2 (ZKsync OS Server) nodes in detached mode."
echo ""
echo -e "${YELLOW}L1 RPC:${NC} http://localhost:8545"
echo -e "${YELLOW}L2 RPC:${NC} http://localhost:3050"
echo ""

# Start L1 in detached mode
echo -e "${GREEN}Starting L1 node...${NC}"
DETACHED=true ./scripts/start-l1.sh
echo ""

# Wait for L1 to be ready
echo -e "${YELLOW}Waiting for L1 to be ready...${NC}"
for i in {1..30}; do
  if curl -s -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
    http://localhost:8545 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} L1 is ready"
    break
  fi

  if [ $i -eq 30 ]; then
    echo -e "${RED}Error: L1 failed to start${NC}"
    exit 1
  fi

  sleep 1
done
echo ""

# Start L2 in detached mode
echo -e "${GREEN}Starting L2 node...${NC}"
DETACHED=true ./scripts/start-l2.sh
echo ""

echo -e "${GREEN}======================================"
echo "Both nodes started successfully!${NC}"
echo ""
echo -e "${YELLOW}Logs:${NC}"
echo "  L1: tail -f $BASE_DIR/anvil.log"
echo "  L2: tail -f $BASE_DIR/l2.log"
echo ""
echo -e "${YELLOW}Stop nodes:${NC}"
echo "  npm run local:stop"
echo ""
echo -e "${YELLOW}RPC Endpoints:${NC}"
echo "  L1: http://localhost:8545"
echo "  L2: http://localhost:3050"
echo ""

#!/usr/bin/env bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BASE_DIR=".zksync-local"

echo -e "${GREEN}Clearing ZKsync Local Development State${NC}"
echo "=========================================="
echo ""

# Stop nodes if running
echo -e "${YELLOW}Stopping any running nodes...${NC}"
./scripts/stop-local.sh 2>/dev/null || true
echo ""

# Clear database
if [ -d "db" ]; then
  echo -e "${YELLOW}Removing database (db/)...${NC}"
  rm -rf db
  echo -e "${GREEN}✓${NC} Database cleared"
else
  echo -e "${YELLOW}No database found${NC}"
fi

# Clear cache
if [ -d "$BASE_DIR/cache" ]; then
  echo -e "${YELLOW}Removing cache ($BASE_DIR/cache/)...${NC}"
  rm -rf "$BASE_DIR/cache"
  echo -e "${GREEN}✓${NC} Cache cleared"
else
  echo -e "${YELLOW}No cache found${NC}"
fi

# Clear logs
if [ -f "$BASE_DIR/anvil.log" ]; then
  echo -e "${YELLOW}Removing logs...${NC}"
  rm -f "$BASE_DIR/anvil.log"
  rm -f "$BASE_DIR/l2.log"
  echo -e "${GREEN}✓${NC} Logs cleared"
else
  echo -e "${YELLOW}No logs found${NC}"
fi

echo ""
echo -e "${GREEN}=========================================="
echo "Local state cleared successfully!${NC}"
echo ""
echo -e "${YELLOW}Note:${NC} Binaries and state files preserved in $BASE_DIR/"
echo ""
echo -e "${YELLOW}Start fresh:${NC}"
echo "  npm run local:start"
echo ""

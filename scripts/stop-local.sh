#!/usr/bin/env bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BASE_DIR=".zksync-local"
L1_PID_FILE="$BASE_DIR/anvil.pid"
L2_PID_FILE="$BASE_DIR/l2.pid"

echo -e "${GREEN}Stopping ZKsync Local Development Environment${NC}"
echo "=============================================="
echo ""

# Function to stop a process
stop_process() {
  local pid_file=$1
  local name=$2

  if [ -f "$pid_file" ]; then
    PID=$(cat "$pid_file")
    if kill -0 "$PID" 2>/dev/null; then
      echo -e "${YELLOW}Stopping $name (PID: $PID)...${NC}"
      kill "$PID" 2>/dev/null || true
      sleep 1

      # Force kill if still running
      if kill -0 "$PID" 2>/dev/null; then
        echo -e "${YELLOW}Force stopping $name...${NC}"
        kill -9 "$PID" 2>/dev/null || true
      fi

      echo -e "${GREEN}✓${NC} $name stopped"
    else
      echo -e "${YELLOW}$name is not running${NC}"
    fi
    rm -f "$pid_file"
  else
    echo -e "${YELLOW}No PID file found for $name${NC}"
  fi
}

# Stop L2 first
stop_process "$L2_PID_FILE" "L2 node"

# Then stop L1
stop_process "$L1_PID_FILE" "L1 node"

echo ""
echo -e "${GREEN}All nodes stopped${NC}"

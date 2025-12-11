#!/usr/bin/env bash

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
VERSION="${ZKSYNC_OS_VERSION:-latest}"
BASE_DIR=".zksync-local"
CACHE_DIR="$BASE_DIR/cache"
GENESIS_FILE="$BASE_DIR/genesis.json"
SERVER_BIN="$BASE_DIR/zksync-os-server"

echo -e "${GREEN}ZKsync OS Server Setup${NC}"
echo "======================================"

# Detect OS and architecture
detect_platform() {
  OS=$(uname -s | tr '[:upper:]' '[:lower:]')
  ARCH=$(uname -m)

  case "$OS" in
    linux*)
      case "$ARCH" in
        x86_64|amd64)
          PLATFORM="x86_64-unknown-linux-gnu"
          ;;
        arm64|aarch64)
          PLATFORM="aarch64-unknown-linux-gnu"
          ;;
        *)
          echo -e "${RED}Unsupported architecture: $ARCH${NC}"
          exit 1
          ;;
      esac
      ;;
    darwin*)
      PLATFORM="universal-apple-darwin"
      ;;
    *)
      echo -e "${RED}Unsupported OS: $OS${NC}"
      exit 1
      ;;
  esac

  echo -e "${YELLOW}Platform:${NC} $PLATFORM"
}

# Get the latest release version
get_latest_version() {
  if [ "$VERSION" = "latest" ]; then
    echo -e "${YELLOW}Fetching latest version...${NC}"
    VERSION=$(curl -s https://api.github.com/repos/matter-labs/zksync-os-server/releases/latest | grep '"tag_name"' | sed -E 's/.*"([^"]+)".*/\1/')

    if [ -z "$VERSION" ]; then
      echo -e "${RED}Failed to fetch latest version${NC}"
      exit 1
    fi
  fi

  echo -e "${YELLOW}Version:${NC} $VERSION"
}

# Download file with caching
download_file() {
  local url=$1
  local output=$2

  if [ -f "$output" ]; then
    echo -e "${GREEN}✓${NC} Already downloaded: $(basename $output)"
    return 0
  fi

  echo -e "${YELLOW}Downloading:${NC} $(basename $output)"
  mkdir -p "$(dirname $output)"

  if ! curl -L --fail --progress-bar -o "$output" "$url"; then
    echo -e "${RED}Failed to download from $url${NC}"
    rm -f "$output"
    return 1
  fi

  echo -e "${GREEN}✓${NC} Downloaded: $(basename $output)"
}

# Main setup
setup() {
  detect_platform
  get_latest_version

  # Create directories
  mkdir -p "$BASE_DIR" "$CACHE_DIR"

  # Download server binary archive
  ARCHIVE_NAME="zksync-os-server-$VERSION-$PLATFORM.tar.gz"
  ARCHIVE_PATH="$CACHE_DIR/$ARCHIVE_NAME"
  BINARY_URL="https://github.com/matter-labs/zksync-os-server/releases/download/$VERSION/$ARCHIVE_NAME"

  if ! download_file "$BINARY_URL" "$ARCHIVE_PATH"; then
    echo -e "${RED}Failed to download server binary archive${NC}"
    exit 1
  fi

  # Extract binary
  echo -e "${YELLOW}Extracting binary...${NC}"
  tar -xzf "$ARCHIVE_PATH" -C "$BASE_DIR" --strip-components=0

  # The binary should be in the extracted directory
  if [ -f "$BASE_DIR/zksync-os-server" ]; then
    chmod +x "$BASE_DIR/zksync-os-server"
    echo -e "${GREEN}✓${NC} Extracted and set permissions"
  else
    echo -e "${RED}Failed to find binary after extraction${NC}"
    exit 1
  fi

  # Download genesis file and L1 state
  STATE_BASE_URL="https://github.com/matter-labs/zksync-os-server/releases/download/$VERSION"
  L1_STATE_FILE="$BASE_DIR/zkos-l1-state.json"

  download_file "$STATE_BASE_URL/genesis.json" "$GENESIS_FILE"
  download_file "$STATE_BASE_URL/zkos-l1-state.json" "$L1_STATE_FILE"

  # Create genesis symlink for zksync-os-server
  echo -e "${YELLOW}Creating genesis symlink...${NC}"
  mkdir -p genesis
  ln -sf ../.zksync-local/genesis.json genesis/genesis.json
  echo -e "${GREEN}✓${NC} Created genesis/genesis.json symlink"

  echo ""
  echo -e "${GREEN}======================================"
  echo -e "Setup complete!${NC}"
  echo ""
  echo "Server binary: $SERVER_BIN"
  echo "Genesis: $GENESIS_FILE"
  echo "L1 State: $L1_STATE_FILE"
  echo ""
  echo "To start the networks, run:"
  echo "  npm run local:start"
}

# Check prerequisites
check_prereqs() {
  if ! command -v anvil &> /dev/null; then
    echo -e "${RED}Error: anvil not found${NC}"
    echo "Please install Foundry: https://book.getfoundry.sh/getting-started/installation"
    echo "See prerequisites: https://matter-labs.github.io/zksync-os-server/latest/setup/prerequisites.html"
    exit 1
  fi

  # Check anvil version
  ANVIL_VERSION=$(anvil --version | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1)
  REQUIRED_VERSION="1.3.4"

  if [ "$ANVIL_VERSION" != "$REQUIRED_VERSION" ]; then
    echo -e "${YELLOW}Warning: anvil version $ANVIL_VERSION detected${NC}"
    echo "Recommended version: $REQUIRED_VERSION"
    echo "The L1 state file may require a specific anvil version for compatibility"
    echo "See: https://matter-labs.github.io/zksync-os-server/latest/setup/prerequisites.html"
    echo ""
    echo "To switch versions, run: foundryup --install v$REQUIRED_VERSION"
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi

  if ! command -v curl &> /dev/null; then
    echo -e "${RED}Error: curl not found${NC}"
    exit 1
  fi
}

check_prereqs
setup

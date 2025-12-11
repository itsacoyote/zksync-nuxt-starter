import { zksyncInMemoryNode as wagmiZksyncInMemoryNode } from "@wagmi/core/chains"

import type { ZkSyncNetwork } from "../shared/types/networks.d"
import { l1Sepolia } from "./l1"
import { zksyncSepolia } from "./zksync"

// To run an anvil-zksync:
// https://docs.zksync.io/zksync-era/tooling/local-setup/anvil-zksync-node#install-and-set-up-anvil-zksync
// You will also need anvil to run the L1 node
export const zksyncAnvil: ZkSyncNetwork = {
  ...wagmiZksyncInMemoryNode,
  id: 260,
  key: "zksync-anvil",
  name: "Zksync Anvil",
  rpcUrls: { default: { http: [ "http://localhost:3050" ] } },
  blockExplorers: {
    default: {
      name: "Anvil Explorer",
      url: "http://api.blockexplorer.dev",
      apiUrl: "http://blockexplorer.dev",
    },
  },
  testnet: true,
  l1Network: {
    ...l1Sepolia,
    id: 31337,
    key: "ethereum-anvil",
    name: "Ethereum Anvil",
    rpcUrls: { default: { http: [ "http://localhost:8545" ] } },
  },
}

// ZKsync OS Server local network
// Run with: npm run local:start
// Requires: Foundry (anvil)
// Setup: npm run local:setup
export const zksyncDockerizedNode: ZkSyncNetwork = {
  ...zksyncSepolia,
  id: 270,
  key: "zksync-local",
  name: "ZKsync Local (OS Server)",
  rpcUrls: { default: { http: [ "http://localhost:3050" ] } },
  // blockExplorers: {
  //   default: {
  //     name: "Local Explorer",
  //     url: "http://localhost:3010",
  //     apiUrl: "http://localhost:3010",
  //   },
  // },
  testnet: true,
  l1Network: {
    ...l1Sepolia,
    id: 31337,
    key: "ethereum-local",
    name: "Ethereum Local (Anvil)",
    nativeCurrency: {
      name: "Ether", symbol: "ETH", decimals: 18,
    },
    rpcUrls: { default: { http: [ "http://localhost:8545" ] } },
  },
}

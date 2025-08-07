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
  rpcUrls: { default: { http: [ "http://localhost:8011" ] } },
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
    name: "Ethereum Anvil",
  },
}

export const zksyncDockerizedNode: ZkSyncNetwork = {
  ...zksyncSepolia,
  id: 270,
  key: "dockerized-node",
  name: "Dockerized local node",
  rpcUrls: { default: { http: [ "http://localhost:3050" ] } },
  blockExplorers: {
    default: {
      name: "Docker Explorer",
      url: "http://api.blockexplorer.dev",
      apiUrl: "http://blockexplorer.dev",
    },
  },
  testnet: true,
  l1Network: {
    ...l1Sepolia,
    id: 9,
    name: "Ethereum Local Node",
    nativeCurrency: {
      name: "Ether", symbol: "ETH", decimals: 18,
    },
    rpcUrls: {
      default: { http: [ "http://localhost:8545" ] },
      public: { http: [ "http://localhost:8545" ] },
    },
  },
}

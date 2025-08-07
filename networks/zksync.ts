import { zksync, zksyncSepoliaTestnet } from "@wagmi/core/chains"

import type { ZkSyncNetwork } from "../shared/types/networks.d"
import { l1Mainnet, l1Sepolia } from "./l1"

export const zksyncMainnet: ZkSyncNetwork = {
  ...zksync,
  id: 324,
  key: "era-mainnet",
  name: "ZKsync Era",
  rpcUrls: { default: { http: [ "https://mainnet.era.zksync.io" ] } },
  blockExplorers: {
    default: {
      name: "Era Explorer",
      url: "https://era.zksync.network",
      apiUrl: "https://block-explorer-api.mainnet.zksync.io",
    },
  },
  testnet: false,
  l1Network: l1Mainnet,
}

export const zksyncSepolia: ZkSyncNetwork = {
  ...zksyncSepoliaTestnet,
  id: 300,
  key: "era-sepolia",
  name: "ZKsync Era Sepolia",
  rpcUrls: { default: { http: [ "https://sepolia.era.zksync.dev" ] } },
  blockExplorers: {
    default: {
      name: "Era Testnet Explorer",
      url: "https://sepolia-era.zksync.network",
      apiUrl: "https://block-explorer-api.sepolia.zksync.dev",
    },
  },
  l1Network: l1Sepolia,
}

export const zksyncStaging: ZkSyncNetwork = {
  ...zksyncSepoliaTestnet,
  id: 270,
  key: "era-stage",
  name: "ZKsync Stage",
  rpcUrls: { default: { http: [ "https://z2-dev-api.zksync.dev" ] } },
  blockExplorers: {
    default: {
      name: "Era Stage Explorer",
      url: "https://sepolia-beta.staging-scan-v2.zksync.dev",
      apiUrl: "https://block-explorer-api.stage.zksync.dev",
    },
  },
  testnet: true,
  l1Network: l1Sepolia,
}

export const zksyncGateway: ZkSyncNetwork = {
  id: 9075,
  key: "gateway-mainnet",
  name: "ZKsync Gateway",
  rpcUrls: { default: { http: [ "https://rpc.era-gateway-mainnet.zksync.dev" ] } },
  blockExplorers: {
    default: {
      name: "Gateway Explorer",
      url: "https://explorer.era-gateway-mainnet.zksync.dev",
      apiUrl: "https://block-explorer-api.era-gateway-mainnet.zksync.dev",
    },
  },
  nativeCurrency: {
    name: "ZKsync",
    symbol: "ZK",
    decimals: 18,
  },
  testnet: false,
  l1Network: l1Mainnet,
  nativeTokenBridgingOnly: true,
}

export const zksyncGatewayTestnet: ZkSyncNetwork = {
  id: 32657,
  key: "gateway-testnet",
  name: "ZKsync Gateway Testnet",
  rpcUrls: { default: { http: [ "https://rpc.era-gateway-testnet.zksync.dev" ] } },
  blockExplorers: {
    default: {
      name: "Gateway Testnet Explorer",
      url: "https://explorer.era-gateway-testnet.zksync.dev",
      apiUrl: "https://block-explorer.era-gateway-testnet.zksync.dev",
    },
  },
  nativeCurrency: {
    name: "ZKsync",
    symbol: "ZK",
    decimals: 18,
  },
  testnet: true,
  l1Network: l1Sepolia,
  nativeTokenBridgingOnly: true,
}

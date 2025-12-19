import { mainnet, sepolia } from "@wagmi/core/chains"

import type { ZkSyncNetwork } from "~~/shared/types/networks"

export const l1Mainnet: ZkSyncNetwork = {
  ...mainnet,
  testnet: false,
  name: "Ethereum",
  key: "ethereum-mainnet",
  rpcUrls: {
    default: {
      http: [
        "https://ethereum-rpc.publicnode.com",
        "https://cloudflare-eth.com",
      ],
    },
  },
}

export const l1Sepolia: ZkSyncNetwork = {
  ...sepolia,
  testnet: true,
  name: "Ethereum Sepolia Testnet",
  key: "ethereum-sepolia",
  rpcUrls: {
    default: {
      http: [
        "https://ethereum-sepolia-rpc.publicnode.com",
        "https://rpc.sepolia.org",
      ],
    },
  },
}

export const l1Anvil: ZkSyncNetwork = {
  id: 31337,
  testnet: true,
  key: "ethereum-anvil",
  name: "Ethereum Anvil",
  nativeCurrency: {
    name: "Ether", symbol: "ETH", decimals: 18,
  },
  rpcUrls: { default: { http: [ "http://localhost:8545" ] } },
  blockExplorers: { default: undefined },
}

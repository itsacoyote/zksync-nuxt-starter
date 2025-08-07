import { mainnet, sepolia } from "@wagmi/core/chains"

export const l1Mainnet: ZkSyncNetwork = {
  ...mainnet,
  testnet: false,
  l1Network: true,
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
  l1Network: true,
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

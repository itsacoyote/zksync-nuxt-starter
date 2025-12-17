import type { ZkSyncNetwork } from "../shared/types/networks.d"

// ZKsync OS Server local network
export const zksyncOS: ZkSyncNetwork = {
  id: 260,
  key: "zksync-os",
  name: "ZKsync OS",
  rpcUrls: { default: { http: [ "http://localhost:3050" ] } },
  blockExplorers: { default: undefined },
  testnet: true,
  l1Network: {
    id: 31337,
    testnet: true,
    l1Network: true,
    key: "ethereum-anvil",
    name: "Ethereum Anvil",
    nativeCurrency: {
      name: "Ether", symbol: "ETH", decimals: 18,
    },
    rpcUrls: { default: { http: [ "http://localhost:8545" ] } },
    blockExplorers: { default: undefined },
  },
  nativeCurrency: {
    name: "Ether", symbol: "ETH", decimals: 18,
  },
}

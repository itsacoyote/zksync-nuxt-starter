import type { ZkSyncNetwork } from "~~/shared/types/networks.d"

// ZKsync OS Server local network
export const zksyncOS: ZkSyncNetwork = {
  id: 260,
  key: "zksync-os",
  name: "ZKsync OS",
  rpcUrls: { default: { http: [ "http://localhost:3050" ] } },
  blockExplorers: { default: undefined },
  testnet: true,
  nativeCurrency: {
    name: "Ether", symbol: "ETH", decimals: 18,
  },
}

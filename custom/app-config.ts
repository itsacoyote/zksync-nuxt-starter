import {
  zksyncGateway, zksyncGatewayTestnet, zksyncMainnet, zksyncSepolia,
} from "~~/networks/zksync"
import type { ZkSyncNetwork } from "~~/shared/types/networks"

export const customNetworks: ZkSyncNetwork[] = [
  zksyncMainnet,
  zksyncSepolia,
  zksyncGateway,
  zksyncGatewayTestnet,
]

export const customDefaultNetwork: ZkSyncNetwork = zksyncMainnet

export const customMetadata = {
  name: "Custom Config",
  description: "Custom configuration for wagmi",
  url: "https://localhost:3000",
  icons: [ "https://avatars.githubusercontent.com/u/179229932" ],
}

export const customAppKitConfig: AppKitConfig = {
  features: {
    email: true,
    socials: [ "google" ],
  },
  themeVariables: {},
}

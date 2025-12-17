import { zksyncOS } from "../networks/local"
import {
  zksyncGateway, zksyncGatewayTestnet, zksyncMainnet, zksyncSepolia, zksyncStaging,
} from "../networks/zksync"
import type { NetworkGroups } from "../shared/types/networks"

export const customNetworkGroups: NetworkGroups = {
  mainnet: {
    name: "Mainnet",
    description: "Production networks",
    networks: [
      zksyncMainnet,
      zksyncGateway,
    ],
  },
  testnet: {
    name: "Testnet",
    description: "Test networks for development",
    networks: [
      zksyncSepolia,
      zksyncGatewayTestnet,
    ],
  },
  local: {
    name: "Local",
    description: "Local development networks",
    networks: [ zksyncOS ],
    hidden: true,
  },
  testing: {
    name: "Testing",
    description: "Internal testing networks",
    networks: [ zksyncStaging ],
    hidden: true,
  },
}

// Specify which group should be the default on app load
export const defaultGroupKey = "local"

export const ssoNetworks = [
  zksyncMainnet,
  zksyncSepolia,
]

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

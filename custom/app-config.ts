import {
  l1Anvil, l1Mainnet, l1Sepolia,
} from "~~/networks/l1"

import { zksyncOS } from "../networks/local"
import {
  zksyncGateway, zksyncGatewayTestnet, zksyncMainnet, zksyncSepolia, zksyncStaging,
} from "../networks/zksync"
import type { NetworkGroups } from "../shared/types/networks"

export const customNetworkGroups = {
  mainnet: {
    name: "Mainnet",
    description: "Production networks",
    networks: [
      zksyncMainnet,
      zksyncGateway,
    ],
    l1Network: l1Mainnet,
  },
  testnet: {
    name: "Testnet",
    description: "Test networks for development",
    networks: [
      zksyncSepolia,
      zksyncGatewayTestnet,
    ],
    l1Network: l1Sepolia,
  },
  local: {
    name: "Local",
    description: "Local development networks",
    networks: [ zksyncOS ],
    hidden: true,
    l1Network: l1Anvil,
  },
  testing: {
    name: "Testing",
    description: "Internal testing networks",
    networks: [ zksyncStaging ],
    hidden: true,
    l1Network: l1Sepolia,
  },
} as const satisfies NetworkGroups

// Specify which group should be the default on app load
export const customDefaultGroupKey: keyof typeof customNetworkGroups = "mainnet"

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

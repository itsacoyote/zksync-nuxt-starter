import { customDefaultGroupKey, customNetworkGroups } from "~~/app-configuration/app-config"
import { l1Mainnet, l1Sepolia } from "~~/app-configuration/networks/l1"
import { zksyncMainnet, zksyncSepolia } from "~~/app-configuration/networks/zksync"
import type { NetworkGroups } from "~~/shared/types/networks"

const defaultNetworkGroups: NetworkGroups = {
  mainnet: {
    name: "Mainnet",
    description: "Production networks",
    networks: [ zksyncMainnet ],
    l1Network: l1Mainnet,
  },
  testnet: {
    name: "Testnet",
    description: "Test networks",
    networks: [ zksyncSepolia ],
    l1Network: l1Sepolia,
  },
}

const defaultGroupKey = "mainnet"

export default defineAppConfig({
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  networkGroups: customNetworkGroups ?? defaultNetworkGroups,
  defaultGroupKey: customDefaultGroupKey ?? defaultGroupKey,
})

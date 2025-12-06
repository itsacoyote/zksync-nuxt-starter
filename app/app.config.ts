import { customNetworkGroups, defaultGroupKey } from "~~/custom/app-config"
import { zksyncMainnet, zksyncSepolia } from "~~/networks/zksync"
import type { NetworkGroups } from "~~/shared/types/networks"

const defaultNetworkGroups: NetworkGroups = {
  mainnet: {
    name: "Mainnet",
    description: "Production networks",
    networks: [ zksyncMainnet ],
  },
  testnet: {
    name: "Testnet",
    description: "Test networks",
    networks: [ zksyncSepolia ],
  },
}

export default defineAppConfig({
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  networkGroups: customNetworkGroups ?? defaultNetworkGroups,
  defaultGroupKey: defaultGroupKey ?? undefined,
})

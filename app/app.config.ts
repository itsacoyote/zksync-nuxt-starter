import { customDefaultNetwork, customNetworks } from "~~/custom/app-config"
import { zksyncMainnet, zksyncSepolia } from "~~/networks/zksync"

export default defineAppConfig({
  icon: {
    mode: "css",
    cssLayer: "base",
  },
  networks: customNetworks ?? [
    zksyncMainnet,
    zksyncSepolia,
  ],
  defaultNetwork: customDefaultNetwork ?? zksyncMainnet,
})

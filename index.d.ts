import type { ZkSyncNetwork } from "@@/shared/types/networks"

declare module "nuxt/schema" {
  interface AppConfig {
    /** Theme configuration */
    networks: ZkSyncNetwork[]
    defaultNetwork: ZkSyncNetwork
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}

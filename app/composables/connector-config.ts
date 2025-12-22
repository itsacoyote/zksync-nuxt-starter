import { createAppKit } from "@reown/appkit/vue"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { AppKitNetwork } from "@reown/appkit-common"
import { pull } from "es-toolkit/array"
import { zksyncSsoConnector } from "zksync-sso-wagmi-connector"

import { customAppKitConfig, customMetadata } from "~~/app-configuration/app-config"
import type { NetworkGroup, ZkSyncNetwork } from "~~/shared/types/networks"

const metadata = customMetadata ?? {
  name: "Starter Kit",
  description: "Web3 - simple starter kit",
  url: "https://web3.xyz",
  icons: [ "https://web3.xyz/generic-logo.svg" ],
}

const appKitConfiguration: AppKitConfig = {
  enableWalletConnect: true,
  enableNetworkSwitch: false,
  enableWalletGuide: false,
  ...customAppKitConfig,
  features: {
    swaps: false,
    onramp: false,
    socials: false,
    email: false,
    analytics: false,
    connectMethodsOrder: [
      "email",
      "social",
      "wallet",
    ],
    ...customAppKitConfig.features,
  },
  themeVariables: {
    "--w3m-font-family": "var(--font-sans)",
    "--w3m-accent": "var(--accent-primary)",
    "--w3m-color-mix": "var(--color-neutral-content)",
    "--w3m-color-mix-strength": 30,
    "--w3m-border-radius-master": "var(--radius-box)",
    ...customAppKitConfig.themeVariables,
  },
}

export const useConnectorConfig = () => {
  const runtimeConfig = useRuntimeConfig()
  const appConfig = useAppConfig()
  const projectId = runtimeConfig.public.reownProjectId

  const groupKeys = Object.keys(appConfig.networkGroups) as Array<keyof typeof appConfig.networkGroups>
  const defaultGroupKey = appConfig.defaultGroupKey
  pull(groupKeys, [ defaultGroupKey ])
  groupKeys.push(defaultGroupKey)

  const allNetworks = [
    ...groupKeys.flatMap(key => appConfig.networkGroups[key].networks),
    ...groupKeys.map(key => appConfig.networkGroups[key].l1Network),
  ] as ZkSyncNetwork[]

  // Find the default group to determine the default network
  // In non-production environments, show hidden groups for testing
  const isDevelopment = import.meta.dev

  let defaultGroup
  // Use the configured default group if specified
  if (appConfig.defaultGroupKey) {
    const configuredGroup = appConfig.networkGroups[appConfig.defaultGroupKey] as NetworkGroup
    // Only use it if it exists and is visible (not hidden in production)
    if (configuredGroup && (isDevelopment || !configuredGroup.hidden)) {
      defaultGroup = configuredGroup
    }
  }

  // If no configured default or it's hidden, fall back to first visible group
  if (!defaultGroup) {
    defaultGroup = (Object.values(appConfig.networkGroups) as NetworkGroup[])
      .find(group => isDevelopment || !group.hidden)
  }

  if (!defaultGroup || defaultGroup.networks.length === 0) {
    throw new Error("No visible network groups with networks found")
  }

  const defaultNetwork = defaultGroup.networks[0]

  // Deduplicate networks by chain ID
  const allChains = allNetworks.reduce<ZkSyncNetwork[]>((acc, network) => {
    if (!acc.some(n => n.id === network.id)) {
      acc.push(network)
    }
    return acc
  }, [])

  // Move defaultNetwork to the front of allChains
  const allChainsOrdered = defaultNetwork
    ? [
      defaultNetwork,
      ...allChains.filter(chain => chain.id !== defaultNetwork.id),
    ]
    : allChains

  const wagmiAdapter = new WagmiAdapter({
    networks: allChainsOrdered as AppKitNetwork[],
    projectId,
    connectors: [ zksyncSsoConnector({ authServerUrl: "https://auth-test.zksync.dev/confirm" }) ],
  })

  // Only create AppKit on client side to avoid SSR errors
  createAppKit({
    adapters: [ wagmiAdapter ],
    networks: allChainsOrdered as unknown as [AppKitNetwork, ...AppKitNetwork[]],
    metadata: metadata,
    projectId,
    defaultNetwork: defaultNetwork as AppKitNetwork,
    ...appKitConfiguration,
  })

  return {
    allChains: allChainsOrdered,
    wagmiAdapter,
  }
}

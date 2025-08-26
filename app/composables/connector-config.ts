import { createAppKit } from "@reown/appkit/vue"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { AppKitNetwork } from "@reown/appkit-common"
import { isNil, uniq } from "es-toolkit"
import { zksyncSsoConnector } from "zksync-sso-wagmi-connector"

import { customAppKitConfig, customMetadata } from "~~/custom/app-config"

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

  const allChains: ZkSyncNetwork[] = [
    ...appConfig.networks,
    ...appConfig.networks.map(network => network.l1Network),
  ]
    .filter((chain): chain is ZkSyncNetwork => !!chain && (chain as ZkSyncNetwork).id !== undefined)
    .reduce<ZkSyncNetwork[]>((acc, chain) => {
      if (!acc.some(c => c.id === chain.id)) {
        acc.push(chain)
      }
      return acc
    }, [])

  const defaultNetwork = allChains.find(chain => chain.id === appConfig.defaultNetwork.id)
  if (isNil(defaultNetwork)) {
    throw new Error("Default network must be included in list of networks in appConfig.")
  }
  if (isNil(defaultNetwork.l1Network)) {
    throw new Error("Default network cannot be an L1 network.")
  }

  // Move defaultNetwork to the front of allChains
  const allChainsOrdered = defaultNetwork
    ? [
      defaultNetwork,
      ...allChains.filter(chain => chain.id !== defaultNetwork.id),
    ]
    : allChains

  const allChainKeys = allChainsOrdered.map(chain => chain.key)
  const allChainKeysDedupe = uniq(allChainKeys)
  if (allChainKeysDedupe.length !== allChainKeys.length) {
    throw new Error("All defined networks must have unique key names.")
  }

  const wagmiAdapter = new WagmiAdapter({
    networks: allChainsOrdered,
    projectId,
    connectors: [ zksyncSsoConnector({ authServerUrl: "https://auth-test.zksync.dev/confirm" }) ],
  })

  createAppKit({
    adapters: [ wagmiAdapter ],
    networks: allChainsOrdered as unknown as [AppKitNetwork, ...AppKitNetwork[]],
    metadata: metadata,
    projectId,
    defaultNetwork: defaultNetwork,
    ...appKitConfiguration,
  })

  return {
    allChains: allChainsOrdered,
    wagmiAdapter,
  }
}

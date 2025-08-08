import { isBoolean, isNil } from "es-toolkit"
import { isObject } from "es-toolkit/compat"

import type { L1Network, ZkSyncNetwork } from "~~/shared/types/networks"

export const useNetworkStore = defineStore("network", () => {
  const config = useAppConfig()
  const chains = useChains()

  const testnet = ref<boolean>(false)
  const activeNetwork = ref<ZkSyncNetwork>(config.defaultNetwork)

  testnet.value = activeNetwork.value.testnet

  const activeNetworkL1 = computed<L1Network | null>(() => {
    const l1Network = activeNetwork.value.l1Network
    return isBoolean(l1Network) ? null : l1Network
  })

  const blockExplorerUrl = computed<string>(() => {
    return activeNetwork.value.blockExplorers.default.url
  })

  const blockExplorerApiUrl = computed<string>(() => {
    return activeNetwork.value.blockExplorers.default.apiUrl
  })

  const chainId = computed<number>(() => {
    return activeNetwork.value.id
  })
  const zkSyncNetworks = computed<ZkSyncNetwork[]>(() => {
    return chains.value
      .filter(chain => isObject((chain as ZkSyncNetwork).l1Network))
      .filter(chain => chain.testnet === testnet.value) as ZkSyncNetwork[]
  })
  const l1Networks = computed<L1Network[]>(() => {
    return chains.value
      .filter(chain => isBoolean((chain as ZkSyncNetwork).l1Network))
      .filter(chain => chain.testnet === testnet.value) as L1Network[]
  })

  function toggleTestnet() {
    testnet.value = !testnet.value
    changeActiveNetwork(zkSyncNetworks.value[0]!.id)
  }
  function changeActiveNetwork(networkId: number) {
    const selectedNetwork = zkSyncNetworks.value.find(network => network.id === networkId)
    if (isNil(selectedNetwork)) {
      throw new Error("Selected network not found in the list of available ZKsync networks.")
    }
    activeNetwork.value = selectedNetwork
  }

  return {
    testnet,
    activeNetwork,

    activeNetworkL1,
    blockExplorerUrl,
    blockExplorerApiUrl,
    chainId,
    zkSyncNetworks,
    l1Networks,
    toggleTestnet,
    changeActiveNetwork,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNetworkStore, import.meta.hot))
}

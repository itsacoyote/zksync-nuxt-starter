import { isBoolean, isNil } from "es-toolkit"
import { uniqBy } from "es-toolkit/array"
import { isObject } from "es-toolkit/compat"

import type {
  L1Network, NetworkGroups, ZkSyncNetwork,
} from "~~/shared/types/networks"

export const useNetworkStore = defineStore("network", () => {
  const config = useAppConfig()

  const networkGroups = computed<NetworkGroups>(() => {
    return config.networkGroups
  })

  const visibleNetworkGroups = computed<NetworkGroups>(() => {
    // In non-production environments, show hidden groups for testing
    const isDevelopment = import.meta.dev

    return Object.fromEntries(Object.entries(networkGroups.value).filter(([
      _key,
      group,
    ]) => isDevelopment || !group.hidden))
  })

  // Determine the initial group key
  const initialGroupKey = computed<string>(() => {
    // Use the configured default group if specified and visible
    if (config.defaultGroupKey && visibleNetworkGroups.value[config.defaultGroupKey]) {
      return config.defaultGroupKey
    }

    // Otherwise, fall back to the first visible group
    const groups = Object.keys(visibleNetworkGroups.value)
    if (groups.length === 0) {
      throw new Error("No visible network groups found")
    }
    return groups[0]!
  })

  // Initialize with the determined group key
  const activeGroupKey = ref<string>(initialGroupKey.value)

  const activeGroup = computed(() => {
    return networkGroups.value[activeGroupKey.value]
  })

  // Get the default network (first network in the active group)
  const getDefaultNetworkForGroup = (groupKey: string): ZkSyncNetwork => {
    const group = networkGroups.value[groupKey]
    if (!group || group.networks.length === 0) {
      throw new Error(`No networks found in group: ${groupKey}`)
    }
    return group.networks[0]!
  }

  const activeNetwork = ref<ZkSyncNetwork>(getDefaultNetworkForGroup(activeGroupKey.value))

  const activeNetworkL1 = computed<L1Network | null>(() => {
    const l1Network = activeNetwork.value.l1Network
    return isBoolean(l1Network) ? null : l1Network
  })

  const blockExplorerUrl = computed<string | null>(() => {
    if (activeNetwork.value.blockExplorers.default) {
      return activeNetwork.value.blockExplorers.default.url
    } else {
      return null
    }
  })

  const blockExplorerApiUrl = computed<string | null>(() => {
    if (activeNetwork.value.blockExplorers.default) {
      return activeNetwork.value.blockExplorers.default.apiUrl
    } else {
      return null
    }
  })

  const chainId = computed<number>(() => {
    return activeNetwork.value.id
  })

  const zkSyncNetworks = computed<ZkSyncNetwork[]>(() => {
    if (!activeGroup.value) return []
    return activeGroup.value.networks.filter(network =>
      isObject((network as ZkSyncNetwork).l1Network))
  })

  const l1Networks = computed<L1Network[]>(() => {
    if (!activeGroup.value) return []
    const l1Networks: ZkSyncNetwork[] = activeGroup.value.networks.map((network) => {
      return network.l1Network as ZkSyncNetwork
    })
    return uniqBy(l1Networks, network => network.id)
  })

  function changeActiveGroup(groupKey: string) {
    if (!networkGroups.value[groupKey]) {
      throw new Error(`Network group not found: ${groupKey}`)
    }
    activeGroupKey.value = groupKey
    changeActiveNetwork(getDefaultNetworkForGroup(groupKey).id)
  }

  function changeActiveNetwork(networkId: number) {
    const selectedNetwork = zkSyncNetworks.value.find(network => network.id === networkId)
    if (isNil(selectedNetwork)) {
      throw new Error("Selected network not found in the list of available ZKsync networks.")
    }
    activeNetwork.value = selectedNetwork
  }

  function getNetworkById(id: number): ZkSyncNetwork {
    const networks = [
      ...zkSyncNetworks.value,
      ...l1Networks.value,
    ]
    return networks.filter(network => network.id === id)[0]!
  }

  return {
    activeGroupKey,
    activeGroup,
    networkGroups,
    visibleNetworkGroups,
    activeNetwork,

    activeNetworkL1,
    blockExplorerUrl,
    blockExplorerApiUrl,
    chainId,
    zkSyncNetworks,
    l1Networks,
    changeActiveGroup,
    changeActiveNetwork,

    getNetworkById,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNetworkStore, import.meta.hot))
}

import { isNull } from "es-toolkit/predicate"

export const useBridgeStore = defineStore("bridge", () => {
  const account = useAccount()
  const address = computed(() => account.address)

  const networkStore = useNetworkStore()
  const { zkSyncNetworks, l1Network } = storeToRefs(networkStore)

  const networkList = computed(() => [
    l1Network.value,
    ...zkSyncNetworks.value,
  ])

  const fromNetworkId = ref<number | null>(null)
  const toNetworkId = ref<number | null>(null)
  const transferAmount = ref<number | null>(null)
  const tokenToTransfer = ref<null | Token>(null)

  const transferType = computed<"deposit" | "withdraw" | "interop" | "gateway" | null>(() => {
    if (isNull(fromNetworkId.value) || isNull(toNetworkId.value)) {
      return null
    }
    const fromNetworkLayer = networkStore.networkLayer(fromNetworkId.value)
    const toNetworkLayer = networkStore.networkLayer(toNetworkId.value)

    // L1 -> *
    if (fromNetworkLayer === "L1") {
      switch (toNetworkLayer) {
        case "L2":
          return "deposit"
        case "Gateway":
          return "deposit"
        case "L1":
        default:
          return null
      }
    }

    // L2 -> *
    if (fromNetworkLayer === "L2") {
      switch (toNetworkLayer) {
        case "L1":
          return "withdraw"
        case "L2":
          return "deposit"
        case "Gateway":
          return "deposit" // what is the actual type?
        default:
          return null
      }
    }

    // Gateway -> *
    if (fromNetworkLayer === "Gateway") {
      switch (toNetworkLayer) {
        case "L1":
          return "withdraw"
        case "L2":
          return "interop"
        case "Gateway":
        default:
          return null
      }
    }

    return null
  })

  watch(fromNetworkId, (newSelect) => {
    if (newSelect === toNetworkId.value) {
      toNetworkId.value = null
    }
  })

  return {
    address,
    fromNetworkId,
    toNetworkId,
    transferAmount,
    networkList,
    transferType,
    tokenToTransfer,
  }
})

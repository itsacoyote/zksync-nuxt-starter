import { isNull } from "es-toolkit/predicate"

export const useBridgeStore = defineStore("bridge", () => {
  const account = useAccount()
  const address = computed(() => account.address)

  const networkStore = useNetworkStore()
  const { zkSyncNetworks, l1Networks } = storeToRefs(networkStore)

  const networkList = computed(() => [
    ...l1Networks.value,
    ...zkSyncNetworks.value,
  ])

  const fromNetworkId = ref<number | null>(null)
  const toNetworkId = ref<number | null>(null)
  const transferAmount = ref<number | null>(null)
  const tokenToTransfer = ref<null | Token>(null)

  const transferType = computed<"deposit" | "withdraw" | "interop" | null>(() => {
    if (isNull(fromNetworkId.value) || isNull(toNetworkId.value)) {
      return null
    }
    const fromNetwork = networkLayer(networkStore.getNetworkById(fromNetworkId.value))
    const toNetwork = networkLayer(networkStore.getNetworkById(toNetworkId.value))

    if (fromNetwork === "L1" && (toNetwork === "L2" || toNetwork === "gateway")) {
      return "deposit"
    }
    if ((fromNetwork === "L2" || fromNetwork === "gateway") && toNetwork === "L1") {
      return "withdraw"
    }
    if (fromNetwork === "L2" && toNetwork === "L2") {
      return "interop"
    }
    // is gateway to L2 a withdraw?
    // what other combinations to consider?
    return "deposit"
  })

  watch(fromNetworkId, (newSelect, oldSelect) => {
    if (newSelect === toNetworkId.value) {
      toNetworkId.value = oldSelect
    }
  })
  watch(toNetworkId, (newSelect, oldSelect) => {
    if (newSelect === toNetworkId.value) {
      fromNetworkId.value = oldSelect
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

import { acceptHMRUpdate, defineStore } from "pinia"

export const useConnectorStore = defineStore("connector", () => {
  const account = useAccount()

  const isConnected = computed<boolean | null>(() => {
    if (account.status.value === "connecting") {
      return null
    } else {
      return account.isConnected.value
    }
  })

  const connecting = computed<boolean>(() => {
    return account.status.value === "connecting"
  })
  const appState = useAppStateStore()

  // watch(
  //   () => account, (account) => {
  //     if (account.isDisconnected.value) {
  //       isConnected.value = false
  //     }
  //     if (account.isConnected.value) {
  //       isConnected.value = true
  //     }
  //   }, { deep: true },
  // )

  // watch(
  //   () => connections.value, () => {
  //     isConnected.value = connections.value.length > 0
  //   }, { deep: true },
  // )
  useAccountEffect({
    onConnect() {

    },
    onDisconnect() {
      appState.toggleProfileDrawer(false)
    },
  })

  return { isConnected, connecting }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConnectorStore, import.meta.hot))
}

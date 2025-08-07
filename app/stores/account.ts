import { getEnsAvatar, getEnsName } from "@wagmi/core"
import { acceptHMRUpdate, defineStore } from "pinia"
import { normalize } from "viem/ens"

export const useAccountStore = defineStore("account", () => {
  const { wagmiAdapter } = useConnectorConfig()
  const account = useAccount()
  const address = computed(() => account.address)
  const ensAccount = reactive<{ name: string | null, avatar: string | null }>({
    name: null,
    avatar: null,
  })

  watch(
    () => account, async (account) => {
      if (account.address.value) {
        ensAccount.name = await getEnsName(wagmiAdapter.wagmiConfig, { address: account.address.value, chainId: 1 })
      }

      if (ensAccount.name) {
        ensAccount.avatar = await getEnsAvatar(wagmiAdapter.wagmiConfig,
          { name: normalize(ensAccount.name), chainId: 1 })
      } else {
        ensAccount.avatar = null
      }
    }, { deep: true },
  )

  return { address, ensAccount }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}

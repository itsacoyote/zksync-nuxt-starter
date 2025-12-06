import { WagmiPlugin } from "@wagmi/vue"

export default defineNuxtPlugin((nuxtApp) => {
  const { wagmiAdapter } = useConnectorConfig()

  nuxtApp.vueApp
    .use(WagmiPlugin, { config: wagmiAdapter.wagmiConfig })
})

import type { DehydratedState } from "@tanstack/vue-query"
import {
  dehydrate,
  hydrate, QueryClient, VueQueryPlugin,
} from "@tanstack/vue-query"

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 3000 } } })

export default defineNuxtPlugin((nuxtApp) => {
  const vueQueryState = useState<DehydratedState | null>("vue-query")

  nuxtApp.vueApp
    .use(VueQueryPlugin, { queryClient, enableDevtoolsV6Plugin: true })

  if (import.meta.server) {
    nuxtApp.hooks.hook("app:rendered", () => {
      vueQueryState.value = dehydrate(queryClient)
    })
  }

  if (import.meta.client) {
    hydrate(queryClient, vueQueryState.value)
  }
})

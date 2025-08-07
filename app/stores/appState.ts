import { isBoolean } from "es-toolkit"

export const useAppStateStore = defineStore("appState", () => {
  const isProfileDrawerOpen = ref<boolean>(false)

  function toggleProfileDrawer(state?: boolean) {
    if (isBoolean(state)) {
      isProfileDrawerOpen.value = state
    } else {
      isProfileDrawerOpen.value = !isProfileDrawerOpen.value
    }
  }

  return {
    isProfileDrawerOpen,

    toggleProfileDrawer,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStateStore, import.meta.hot))
}

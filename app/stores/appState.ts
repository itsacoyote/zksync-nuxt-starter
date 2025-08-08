import { isBoolean } from "es-toolkit"

export const useAppStateStore = defineStore("appState", () => {
  const i18n = useI18n()
  const isProfileDrawerOpen = ref<boolean>(false)
  const isMenuDrawerOpen = ref<boolean>(false)
  const navMenu = [
    { href: "/transactions", name: i18n.t("navigation.transactions") },
    { href: "/transfers", name: i18n.t("navigation.transfers") },
    { href: "/assets", name: i18n.t("navigation.assets") },
  ]

  function toggleProfileDrawer(state?: boolean) {
    if (isBoolean(state)) {
      isProfileDrawerOpen.value = state
    } else {
      isProfileDrawerOpen.value = !isProfileDrawerOpen.value
    }
  }

  function toggleMenuDrawer(state?: boolean) {
    if (isBoolean(state)) {
      isMenuDrawerOpen.value = state
    } else {
      isMenuDrawerOpen.value = !isMenuDrawerOpen.value
    }
  }

  return {
    navMenu,
    isProfileDrawerOpen,
    isMenuDrawerOpen,

    toggleProfileDrawer,
    toggleMenuDrawer,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStateStore, import.meta.hot))
}

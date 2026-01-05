<template>
  <div class="drawer drawer-end">
    <input
      id="menu-drawer"
      ref="drawer-toggle"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content">
      <slot />
    </div>
    <div class="drawer-side">
      <div class="min-h-full w-[100%] md:max-w-[430px] bg-base-200 text-base-content pl-4">
        <label
          for="menu-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
          @click="appState.toggleMenuDrawer(false)"
        />
        <ul class="text-base-content">
          <li class="flex flex-row justify-between mb-2">
            <button
              type="button"
              class="btn btn-circle btn-ghost"
              @click="appState.toggleMenuDrawer(false)"
            >
              <UiIconClose />
            </button>
          </li>
        </ul>
        <ul class="bg-base-100 card p-2">
          <li
            v-for="navItem in appState.navMenu"
            :key="navItem.href"
            class="text-xl hover:bg-base-200 rounded-box"
          >
            <NuxtLink
              class="w-full p-4 inline-block"
              :href="navItem.href"
            >{{ navItem.name }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const appState = useAppStateStore()
const toggleDrawer = useTemplateRef("drawer-toggle")

onMounted(() => {
  toggleDrawer.value!.checked = appState.isMenuDrawerOpen
})

watch(() => appState.isMenuDrawerOpen, () => {
  toggleDrawer.value!.checked = appState.isMenuDrawerOpen
})
</script>

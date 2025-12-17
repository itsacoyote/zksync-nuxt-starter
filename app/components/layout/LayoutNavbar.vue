<template>
  <div class="navbar">
    <div
      ref="navbarStartRef"
      class="navbar-start grow w-auto"
    >
      <NuxtLink
        class="px-4"
        href="/"
      >
        <svgo-generic-logo
          class="fill-black dark:fill-white text-5xl !m-0"
        />
      </NuxtLink>
      <ul
        v-show="!mobileMenu"
        class="menu menu-horizontal"
      >
        <li
          v-for="navItem in appState.navMenu"
          :key="navItem.href"
        >
          <NuxtLink
            :href="navItem.href"
            class="text-lg"
          >{{ navItem.name }}</NuxtLink>
        </li>
      </ul>
    </div>
    <div class="navbar-end flex-none w-auto">
      <LayoutColorModeButton class="mr-2" />
      <AccountDropdown />
      <button
        v-if="mobileMenu"
        type="button"
        class="btn btn-circle btn-neutral ml-2"
        @click="appState.toggleMenuDrawer(true)"
      >
        <Icon name="fluent:navigation-16-regular" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeUnmount,
  onMounted,
  ref,
} from "vue"

const appState = useAppStateStore()

const mobileMenu = ref(false)
const navbarStartRef = ref<HTMLElement | null>(null)
const navbarWidth = ref<number>(0)
const childrenWidth = ref<number>(0)

function checkMenuWidth() {
  navbarWidth.value = navbarStartRef.value!.offsetWidth
  mobileMenu.value = childrenWidth.value >= navbarWidth.value
}

function handleResize() {
  checkMenuWidth()
}

onMounted(() => {
  navbarWidth.value = navbarStartRef.value!.offsetWidth

  Array.from(navbarStartRef.value!.children).forEach((child) => {
    childrenWidth.value += (child as HTMLElement).offsetWidth
  })

  checkMenuWidth()
  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize)
})
</script>

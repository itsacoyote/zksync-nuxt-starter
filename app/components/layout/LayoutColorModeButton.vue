<template>
  <ClientOnly v-if="!colorMode?.forced">
    <button
      type="button"
      class="btn btn-ghost btn-square"
      @click="isDark = !isDark"
    >
      <Icon
        v-if="isDark"
        name="fluent:weather-sunny-32-filled"
        class="text-2xl"
      />
      <Icon
        v-else
        name="fluent:weather-moon-20-filled"
        class="text-2xl"
      />
    </button>

    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>

<script setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    console.log("COLOR MORE", colorMode.value)
    return colorMode.value === "dark"
  },
  set(_isDark) {
    console.log("_ISDARK", _isDark)
    colorMode.preference = _isDark ? "dark" : "light"
  },
})
</script>

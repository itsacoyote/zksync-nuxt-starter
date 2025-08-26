<template>
  <div
    v-if="loading"
    class="text-center py-10"
  >
    <span
      class="loading loading-spinner loading-xl"
    />
  </div>
  <template v-else>
    <template v-if="isConnected">
      <slot />
    </template>
    <div
      v-else-if="!hide"
      role="alert"
      class="alert alert-vertical sm:alert-horizontal"
    >
      <Icon
        name="fluent:wallet-16-regular"
        class="text-2xl"
      />
      <span>Connect wallet to see details.</span>
      <div>
        <AccountConnectButton />
      </div>
    </div>
    <div v-else />
  </template>
</template>

<script lang="ts" setup>
defineProps<{ hide?: boolean }>()

const { isConnected } = storeToRefs(useConnectorStore())

const loading = ref<boolean>(true)
let timeoutId: ReturnType<typeof setTimeout> | null = null

/**
 * For first time loading of the site,
 * take a moment to show a loading icon
 * while wagmi establishes itself
 */
onMounted(() => {
  if (!isConnected.value) {
    timeoutId = setTimeout(() => loading.value = false, 800)
  } else {
    loading.value = false
  }
})

onBeforeUnmount(() => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
})
</script>

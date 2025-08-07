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
      v-else
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
  </template>
</template>

<script lang="ts" setup>
const { isConnected } = storeToRefs(useConnectorStore())

const loading = ref<boolean>(true)

/**
 * For first time loading of the site,
 * take a moment to show a loading icon
 * while wagmi establishes itself
 */
onMounted(() => {
  if (!isConnected.value) {
    setTimeout(() => loading.value = false, 800)
  } else {
    loading.value = false
  }
})
</script>

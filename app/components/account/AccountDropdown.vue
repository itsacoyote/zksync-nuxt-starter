<template>
  <div>
    <AccountConnectButton v-if="!hasConnection" />
    <button
      v-else
      type="button"
      class="btn btn-soft"
      @click="appState.toggleProfileDrawer()"
    >
      <NuxtImg
        v-if="connections[0]?.connector.icon"
        :src="connections[0]?.connector.icon"
        class="h-6 w-6"
      />
      <UiIconWallet
        v-else
        class="h-6 w-6"
      />
      {{ ensAccount && ensAccount.name ? ensAccount.name : formatShortAddress(address) }}
    </button>
  </div>
</template>

<script setup lang="ts">
const appState = useAppStateStore()

const connections = useConnections()
const hasConnection = computed(() => connections.value.length > 0)

const { address, ensAccount } = useAccountStore()
</script>

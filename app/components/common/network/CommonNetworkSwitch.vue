<template>
  <CommonConnectionView hide>
    <CommonNetworkSelect @select-network="(networkId: number) => networkStore.changeActiveNetwork(networkId)" />
  </CommonConnectionView>
</template>

<script setup lang="ts">
/**
 * A network switcher that will change the selected active network for the wallet.
 */
const networkStore = useNetworkStore()
</script>

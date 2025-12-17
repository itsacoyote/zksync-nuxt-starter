<template>
  <div class="card bg-base-100 card-md shadow-sm">
    <div class="card-body text-base">
      <template v-if="ensAccount.name">
        <img
          v-if="ensAccount.avatar"
          :src="ensAccount.avatar"
          class="w-14 h-14 rounded-full"
        >
        <p>ENS: {{ ensAccount.name }}</p>
      </template>
      <p>Address: {{ address }}</p>
      <p>Network ID: {{ chainId }}</p>
      <p>Balance: <AccountBalance :chain-id="chainId" /></p>
      <p v-if="activeNetworkL1">
        L1 Balance: <AccountBalance :chain-id="activeNetworkL1.id" />
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { chainId, activeNetworkL1 } = storeToRefs(useNetworkStore())

const { address } = storeToRefs(useAccountStore())
const { ensAccount } = useAccountStore()
</script>

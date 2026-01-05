<template>
  <li class="list-row border-b-1 border-base-content/10 rounded-none">
    <AccountTransferIcon :transfer="transfer" />
    <div class="flex sm:flex-row flex-col justify-between text-base">
      <slot />
    </div>
    <div>
      <NuxtLink
        v-if="blockExplorerUrl"
        target="_blank"
        :href="`${blockExplorerUrl}/tx/${transfer.transactionHash}`"
        class="btn btn-circle btn-soft group"
      >
        <UiIconOpenLink
          class="text-xl text-base-content/60 group-hover:text-base-content"
        />
      </NuxtLink>
      <button
        v-else
        disabled
        className="cursor-not-allowed"
      >
        <UiIconOpenLink
          class="text-xl text-base-content/40"
        />
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
const { blockExplorerUrl } = useNetworkStore()
defineProps<{ transfer: Transfer }>()
</script>

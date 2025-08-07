<template>
  <li class="list-row border-b-1 border-base-content/10 rounded-none">
    <AccountTransferIcon :transfer="transfer" />
    <div class="flex sm:flex-row flex-col justify-between text-base">
      <slot />
    </div>
    <div>
      <NuxtLink
        target="_blank"
        :href="`${blockExplorerUrl}/tx/${transfer.transactionHash}`"
        class="btn btn-circle btn-soft group"
      >
        <Icon
          name="fluent:open-32-filled"
          class="text-xl text-base-content/60 group-hover:text-base-content"
        />
      </NuxtLink>
    </div>
  </li>
</template>

<script setup lang="ts">
const { blockExplorerUrl } = useNetworkStore()
defineProps<{ transfer: Transfer }>()
</script>

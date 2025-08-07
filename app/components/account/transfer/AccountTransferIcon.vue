<template>
  <div>
    <Icon
      v-if="transfer.type === 'deposit'"
      name="fluent:add-circle-16-regular"
      :class="iconClass"
    />
    <Icon
      v-else-if="transfer.type === 'withdrawal'"
      name="fluent:subtract-circle-16-regular"
      :class="iconClass"
    />
    <Icon
      v-else-if="transfer.type === 'mint'"
      name="fluent:circle-highlight-20-regular"
      :class="iconClass"
    />
    <Icon
      v-else-if="transfer.type === 'transfer' && transfer.to === address"
      name="fluent:arrow-circle-down-right-16-regular"
      class="rotate-90"
      :class="iconClass"
    />
    <Icon
      v-else-if="transfer.type === 'transfer' && transfer.from === address"
      name="fluent:arrow-circle-up-right-16-regular"
      :class="iconClass"
    />
    <Icon
      v-else
      name="fluent:circle-hint-16-regular"
      :class="iconClass"
    />
  </div>
</template>

<script setup lang="ts">
const { address } = useAccount()
defineProps<{ transfer: Transfer }>()

const iconClass = "h-full w-14 align-middle text-base-content/80"
</script>

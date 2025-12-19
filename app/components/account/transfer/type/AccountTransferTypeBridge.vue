<template>
  <div>
    <div>
      Bridged
    </div>
    <div>
      <span class="text-base-content/60">{{ direction }}</span>
      <AccountTransferDate
        :date="transfer.timestamp"
        class="inline-block ml-2"
      />
    </div>
  </div>
  <div>
    <AccountTransferToken :transfer />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ transfer: Transfer }>()

const { activeNetwork, l1Network } = useNetworkStore()

const direction = computed(() => {
  if (props.transfer.type === "withdrawal") {
    return `${activeNetwork.name} -> ${l1Network!.name}`
  } else {
    return `${l1Network!.name} -> ${activeNetwork.name}`
  }
})
</script>

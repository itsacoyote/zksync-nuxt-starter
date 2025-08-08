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

const networkStore = useNetworkStore()

const direction = computed(() => {
  if (props.transfer.type === "withdrawal") {
    return `${networkStore.activeNetwork.name} -> ${networkStore.activeNetworkL1!.name}`
  } else {
    return `${networkStore.activeNetworkL1!.name} -> ${networkStore.activeNetwork.name}`
  }
})
</script>

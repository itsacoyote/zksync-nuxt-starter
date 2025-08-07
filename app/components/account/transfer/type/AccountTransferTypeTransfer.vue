<template>
  <div>
    <div>
      {{ transfer.from === address ? 'Sent to' : 'Received from' }}
      {{ transfer.from === formatShortAddress(address) ? transfer.to : formatShortAddress(transfer.from) }}
    </div>
    <AccountTransferDate :date="transfer.timestamp" />
  </div>
  <div>
    <AccountTransferToken :transfer />
  </div>
</template>

<script setup lang="ts">
const { address } = useAccount()
defineProps<{ transfer: Transfer }>()
</script>

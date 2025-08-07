<template>
  <div>
    <div>
      Bridged
    </div>
    <AccountTransferDate :date="transfer.timestamp" />
  </div>
  <div>
    <AccountTransferToken :transfer />
  </div>
</template>

<script setup lang="ts">
defineProps<{ transfer: Transfer }>()
</script>

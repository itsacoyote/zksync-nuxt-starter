<template>
  <div>
    <div>
      Minted
    </div>
    <AccountTransferDate :date="transfer.timestamp" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ transfer: Transfer }>()
</script>

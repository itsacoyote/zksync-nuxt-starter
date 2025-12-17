<template>
  <div>
    <LayoutPageHeader>
      {{ $t('transfers.header') }}
      <template #right-col>
        <CommonNetworkSwitch />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountTransfersTable />
    </CommonConnectionView>
  </div>
</template>

<script setup lang="ts">

</script>

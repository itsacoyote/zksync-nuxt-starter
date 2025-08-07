<template>
  <div>
    <LayoutPageHeader>
      {{ $t('transfers.header') }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountTransfersTable />
    </CommonConnectionView>
  </div>
</template>

<script setup lang="ts">

</script>

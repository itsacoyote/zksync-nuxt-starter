<template>
  <div>
    <LayoutPageHeader>
      {{ $t('index.header') }}
      <template #right-col>
        <CommonNetworkSwitch />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountSummaryCard />
    </CommonConnectionView>
  </div>
</template>

<script setup>
</script>

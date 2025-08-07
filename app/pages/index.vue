<template>
  <div>
    <LayoutPageHeader>
      {{ $t('index.header') }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountSummaryCard />
    </CommonConnectionView>
  </div>
</template>

<script setup>
</script>

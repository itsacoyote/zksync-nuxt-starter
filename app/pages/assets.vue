<template>
  <div>
    <LayoutPageHeader>
      {{ $t('assets.header') }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountAssetsTable />
    </CommonConnectionView>
  </div>
</template>

<script lang="ts" setup>
</script>

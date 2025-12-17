<template>
  <div>
    <LayoutPageHeader>
      {{ $t('assets.header') }}
      <template #right-col>
        <CommonNetworkSwitch />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountAssetsTable />
    </CommonConnectionView>
  </div>
</template>

<script lang="ts" setup>
</script>

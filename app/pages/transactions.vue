<template>
  <div>
    <LayoutPageHeader>
      {{ $t("transactions.header") }}
      <template #right-col>
        <CommonNetworkSwitch />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountTransactionsTable />
    </CommonConnectionView>
  </div>
</template>

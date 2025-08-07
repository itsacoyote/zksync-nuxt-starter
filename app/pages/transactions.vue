<template>
  <div>
    <LayoutPageHeader>
      {{ $t("transactions.header") }}
      <template #right-col>
        <CommonNetworkSelect />
      </template>
    </LayoutPageHeader>

    <CommonConnectionView>
      <AccountTransactionsTable />
    </CommonConnectionView>
  </div>
</template>

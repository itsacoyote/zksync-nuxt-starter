<template>
  <ul
    class="list bg-base-100 rounded-box shadow-md"
  >
    <template v-if="inProgress">
      <li class="list-row">
        <div><div class="skeleton h-4 w-15" /></div>
        <div><div class="skeleton h-4 w-15" /></div>
        <div><div class="skeleton h-4 w-15" /></div>
      </li>
    </template>
    <template v-else-if="hasError">
      <li class="px-4 py-6">
        <UiAlertPane>
          <template v-if="transfersError?.message?.includes('Block explorer API URL is not defined')">
            Block explorer is not available for the current network. Transfer history cannot be displayed.
          </template>
          <template v-else>
            An error occurred with trying to load transfer history data.
          </template>
        </UiAlertPane>
      </li>
    </template>
    <template v-else>
      <template v-if="transfersData && transfersData.length">
        <AccountTransferLink
          v-for="transfer in transfersData"
          :key="transfer.transactionHash"
          :transfer
        >
          <AccountTransferTypeTransfer
            v-if="transfer.type === 'transfer'"
            :transfer
          />
          <AccountTransferTypeBridge
            v-else-if="transfer.type === 'deposit' || transfer.type === 'withdrawal'"
            :transfer
          />
          <AccountTransferTypeMint
            v-else-if="transfer.type==='mint'"
            :transfer
          />
          <AccountTransferTypeUndefined
            v-else
            :transfer
          />
        </AccountTransferLink>
      </template>
      <template v-else>
        <li class="px-4 py-6 text-center">
          <div>No transfer history to show.</div>
        </li>
      </template>
    </template>
  </ul>
</template>

<script setup lang="ts">
const {
  isPending: transfersPending, isFetching: transfersFetching, data: transfersData, error: transfersError,
} = useQueryTransfers()

const inProgress = computed(() => {
  return transfersPending.value && transfersFetching.value
})

const hasError = computed(() => {
  return transfersError.value
})
</script>

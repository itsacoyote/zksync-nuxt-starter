<template>
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table
      class="table text-base"
    >
      <thead>
        <tr>
          <th>Transaction Hash</th>
          <th>Method</th>
          <th>Age</th>
          <th>From</th>
          <th>To</th>
          <th>Fee</th>
        </tr>
      </thead>
      <tbody v-if="!(isFetching && isPending) && !error">
        <template v-if="data && data.length">
          <tr
            v-for="transaction in data"
            :key="transaction.hash"
          >
            <td>{{ formatShortAddress(transaction.hash, 7, 4) }}</td>
            <td>{{ transaction.methodId }}</td>
            <td>{{ useTimeAgo(+transaction.timeStamp) }}</td>
            <td>{{ formatShortAddress(transaction.from) }}</td>
            <td>{{ formatShortAddress(transaction.to) }}</td>
            <td>
              <CommonAmountTooltip :formatted-amount="formattedFee(transaction.fee)" />
              <span
                v-if="baseTokenData"
                class="ml-2"
              >
                {{ baseTokenData.symbol }}
                <NuxtImg
                  v-if="baseTokenData"
                  :src="baseTokenData.iconURL"
                  class="inline-block h-4 w-4"
                />
              </span>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td
              colspan="6"
              class="text-center"
            >
              You have no transactions to display.
            </td>
          </tr>
        </template>
      </tbody>
      <tbody v-else-if="error">
        <tr>
          <td colspan="6">
            <CommonAlertPane>
              An error occurred with trying to load account transaction data.
            </CommonAlertPane>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="row in 3"
          :key="row"
        >
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-10" /></td>
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-15" /></td>
          <td><div class="skeleton h-4 w-20" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { formatUnits } from "viem"

dayjs.extend(relativeTime)

const {
  isPending, isFetching, data, error,
} = useQueryTransactions()

const { data: baseTokenData } = useQueryBaseToken()

const formattedFee = (fee: bigint): [string, string] => {
  const formattedUnits = formatUnits(fee, 18)
  return [
    truncateDecValue(formattedUnits),
    formattedUnits,
  ]
}
</script>

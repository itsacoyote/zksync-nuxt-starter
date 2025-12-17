<template>
  <CommonAmountTooltip
    v-if="accountBalance"
    :formatted-amount="prettyValue(accountBalance.value, accountBalance.decimals)"
    :symbol="accountBalance.symbol"
    class="inline-block"
  />
  <div
    v-else
    class="align-middle inline-block skeleton h-4 w-20"
  />
</template>

<script setup lang="ts">
import { getBalance } from "@wagmi/core"

const props = defineProps<{ chainId?: number }>()

const account = useAccount()
const { wagmiAdapter } = useConnectorConfig()
const accountBalance = asyncComputed(async () => {
  return await getBalance(wagmiAdapter.wagmiConfig, {
    address: account.address.value!,
    chainId: props.chainId,
  })
}, null)
</script>

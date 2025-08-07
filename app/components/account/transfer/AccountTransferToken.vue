<template>
  <div v-if="transfer.token">
    <div>
      <span class="inline-block">
        {{ direction }}
        {{ formatUnits(transfer.amount, transfer.token.decimals) }}
        {{ transfer.token.symbol }}
      </span>
      <NuxtImg
        v-if="transfer.token.iconURL"
        :src="transfer.token.iconURL"
        class="w-5 h-5 ms-1 inline align-text-bottom"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatUnits } from "viem"

const { address } = useAccount()
const props = defineProps<{ transfer: Transfer }>()

const direction = computed(() => {
  if (props.transfer.type === "transfer") {
    if (props.transfer.to === address.value) {
      return "+"
    } else {
      return "-"
    }
  }

  if (props.transfer.type === "deposit") {
    return "+"
  } else {
    return "-"
  }

  return "xx"
})
</script>

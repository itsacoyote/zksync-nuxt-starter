<template>
  <li class="my-1">
    <button
      class="w-full block"
      @click="emit('select', { token: props.token, networkId: props.networkId })"
    >
      <div class="flex items-center gap-4 w-full justify-stretch">
        <!-- Token Icon with Network Badge -->
        <div class="relative flex-none">
          <img
            v-if="token.iconURL"
            :src="token.iconURL"
            :alt="token.symbol"
            class="w-10 h-10 rounded-full"
          >
          <img
            :src="`/network-icons/${networkId}.svg`"
            class="w-4 h-4 rounded-sm absolute bottom-0 right-0"
          >
        </div>

        <!-- Token Info -->
        <div class="flex flex-col items-start grow">
          <div class="flex flex-row items-center w-full">
            <span class="text-lg font-semibold">{{ token.name }}</span>
            <span class="text-sm ml-2 opacity-60">{{ networkName }}</span>
          </div>
          <div>
            <span class="mr-2 text-sm font-semibold text-base-content/60">{{ token.symbol }}</span>
            <span class="text-base-content/60">{{
              formatShortAddress(token.l1Token ? token.l1Address : token.l2Address, 4, 4)
            }}</span>
          </div>
        </div>

        <!-- Balance Info (only if token has amount) -->
        <div
          v-if="showBalance && token.amount"
          class="flex flex-col items-end flex-none"
        >
          <CommonAmountTooltip
            :formatted-amount="prettyValue(token.amount, parseInt(token.decimals))"
            class="text-sm font-semibold"
          />
          <span
            v-if="token.usdBalance"
            class="text-xs text-base-content/60"
          >
            {{
              tokenBalancePriceFormatted(
                token.amount,
                parseInt(token.decimals),
                token.usdPrice,
              )
            }}
          </span>
        </div>
      </div>
    </button>
  </li>
</template>

<script setup lang="ts">
interface Props {
  token: Token
  networkId: number
  networkName: string
  showBalance?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{ select: [{ token: Token, networkId: number }] }>()
</script>

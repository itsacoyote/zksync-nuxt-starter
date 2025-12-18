<template>
  <ul class="list bg-base-100 rounded-box shadow-md">
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
          <template v-if="isBlockExplorerUnavailable">
            Block explorer is not available for the current network. Asset balances cannot be displayed.
          </template>
          <template v-else>
            An error occurred with trying to load account asset data.
          </template>
        </UiAlertPane>
      </li>
    </template>
    <template v-else>
      <template v-if="data">
        <li class="list-row">
          <div class="h-full text-xl">
            <span class="align-sub inline-block h-full">Balance</span>
          </div>
          <div class="text-right">
            <span class="text-2xl">$</span>
            <span class="text-4xl">{{ Math.floor(totalBalance * 100) / 100 }}</span>
          </div>
        </li>
        <li
          v-for="asset in data"
          :key="asset.l2Address"
          class="list-row"
        >
          <div>
            <NuxtImg
              v-if="asset.iconUrl"
              :src="asset.iconUrl"
              class="w-12 h-full"
            />
            <Icon
              v-else
              name="fluent:circle-highlight-24-regular"
              class="h-full w-12 text-slate-400"
            />
          </div>
          <div>
            <div class="text-lg">
              {{ asset.symbol }}
            </div>
            <div class="text-sm text-base-content/60">
              {{ asset.name }}
            </div>
          </div>
          <div class="text-right">
            <div class="flex flex-col">
              <CommonAmountTooltip
                :formatted-amount="prettyValue(asset.amount, asset.decimals)"
                class="text-lg"
              />
              <span
                v-if="asset.usdBalance"
                class="text-base text-base-content/60"
              >{{ asset.usdBalance }}</span>
            </div>
          </div>
        </li>
      </template>
      <li
        v-else
        class="px-4 py-6 text-center"
      >
        <div>No assets with balances to show.</div>
      </li>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { isNil } from "es-toolkit"

const {
  isPending: assetsPending, isFetching: assetsFetching, data: assetsData, error: assetsError,
} = useQueryAssets()

const {
  isPending: tokensPending, isFetching: tokensFetching, data: tokensData, error: tokensError,
} = useQueryTokens()

const inProgress = computed(() => {
  const loadingAssets = assetsPending.value && assetsFetching.value
  const loadingTokens = tokensPending.value && tokensFetching.value

  return loadingAssets && loadingTokens
})

const hasError = computed(() => {
  return assetsError.value || tokensError.value
})

const isBlockExplorerUnavailable = computed(() => {
  const assetsMessage = assetsError.value?.message || ""
  const tokensMessage = tokensError.value?.message || ""
  return assetsMessage.includes("Block explorer API URL is not defined")
    || tokensMessage.includes("Block explorer API URL is not defined")
})

interface TokenInfo {
  l2Address: `0x${string}`
  name: string
  symbol: string
  amount: bigint
  decimals: number
  price: number | undefined
  liquidity: number | undefined
  iconUrl: string | undefined
  usdBalance: string | null
}
const data = ref<TokenInfo[] | null>(null)
const totalBalance = ref<number>(0)
watch(
  [
    () => tokensData.value,
    () => assetsData.value,
  ], () => {
    if (tokensData.value && assetsData.value) {
      const tokensByL2Address = flattenTokensByAddress(tokensData.value)
      data.value = assetsData.value.map((asset) => {
        const usdBalance = tokensByL2Address[asset.l2Address]?.usdPrice
          ? tokenBalancePriceRaw(
            asset.amount, asset.decimals, tokensByL2Address[asset.l2Address]!.usdPrice,
          )
          : null

        if (!isNil(usdBalance)) {
          totalBalance.value += usdBalance
        }
        return {
          ...asset,
          price: tokensByL2Address[asset.l2Address]?.usdPrice,
          liquidity: tokensByL2Address[asset.l2Address]?.liquidity,
          iconUrl: tokensByL2Address[asset.l2Address]?.iconURL,
          usdBalance: tokensByL2Address[asset.l2Address]?.usdPrice
            ? tokenBalancePriceFormatted(
              asset.amount, asset.decimals, tokensByL2Address[asset.l2Address]!.usdPrice,
            )
            : null,
        }
      })
    }
  }, { immediate: true },
)
</script>

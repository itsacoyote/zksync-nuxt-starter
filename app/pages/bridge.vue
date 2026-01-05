<template>
  <div>
    <LayoutPageHeader>
      {{ $t("bridge.header") }}
    </LayoutPageHeader>

    <UiSection class="max-w-[650px] m-auto">
      <UiCard class="relative z-0">
        <div class="flex flex-col md:flex-row items-center justify-between gap-2 mb-4">
          <BridgeNetworkTransferSelect
            v-model="fromNetworkId"
            :networks="networkList"
            label="From"
            class="w-full md:w-[45%]"
          />
          <button
            class="btn btn-ghost btn-circle flex items-center justify-center flex-shrink-0"
            @click="bridgeStore.swapNetworks"
          >
            <Icon
              name="fluent:arrow-right-32-filled"
              class="text-sm hidden md:block"
            />
            <Icon
              name="fluent:arrow-down-32-filled"
              class="text-sm md:hidden block"
            />
          </button>
          <BridgeNetworkTransferSelect
            v-model="toNetworkId"
            :networks="toNetworkList"
            label="To"
            class="w-full md:w-[45%]"
          />
        </div>

        <div class="my-2 flex flex-row items-center gap-2 justify-between">
          <input
            id="transfer-amount"
            v-model="transferAmount"
            type="number"
            class="input input-ghost input-sm text-2xl"
            placeholder="0"
          >
          <CommonSelectTokenFromNetworkModal
            :network-id="fromNetworkId"
            @token-selected="tokenToTransfer = $event"
          />
        </div>
        <div
          v-if="formattedBalance"
          class="flex justify-between text-sm opacity-70"
        >
          <div>
            Balance: {{ formattedBalance }}
          </div>
          <div class="flex flex-row gap-2">
            <button
              class="badge badge-sm cursor-pointer hover:font-semibold"
              @click="setPercentageAmount(25)"
            >
              25%
            </button>
            <button
              class="badge badge-sm cursor-pointer hover:font-semibold"
              @click="setPercentageAmount(50)"
            >
              50%
            </button>
            <button
              class="badge badge-sm cursor-pointer hover:font-semibold"
              @click="setPercentageAmount(75)"
            >
              75%
            </button>
            <button
              class="badge badge-sm cursor-pointer hover:font-semibold"
              @click="setPercentageAmount(100)"
            >
              MAX
            </button>
          </div>
        </div>
      </UiCard>

      <!-- Fee Information Card -->
      <BridgeFeeCard
        v-if="isConnected && tokenToTransfer"
        class="mt-4"
      />
      <div class="mt-4">
        <AccountConnectButton
          v-if="!isConnected && !connecting"
          class="w-full btn-xl"
        />
        <template v-else>
          <button
            class="btn btn-xl w-full capitalize"
            :class="{ 'btn-primary': !bridgeActionState.disabled }"
            :disabled="bridgeActionState.disabled"
          >
            {{ bridgeActionState.message }}
          </button>
        </template>
      </div>
    </UiSection>
  </div>
</template>

<script setup lang="ts">
const { isConnected, connecting } = storeToRefs(useConnectorStore())

const bridgeStore = useBridgeStore()
const {
  fromNetworkId,
  toNetworkId,
  transferAmount,
  networkList,
  tokenToTransfer,
} = storeToRefs(bridgeStore)

const {
  toNetworkList,
  formattedBalance,
  bridgeActionState,
} = useBridge()

const { setPercentageAmount } = useBridgeFee()

// Start auto-refresh when bridge page mounts
const bridgeRefreshStore = useBridgeRefreshStore()
onMounted(() => {
  bridgeRefreshStore.startAutoRefresh()
})

// Stop auto-refresh when bridge page unmounts
onUnmounted(() => {
  bridgeRefreshStore.stopAutoRefresh()
})
</script>

<template>
  <UiCard>
    <div class="space-y-2 text-sm">
      <!-- Header with countdown timer -->
      <div class="flex justify-between items-center mb-2 pb-2 border-b border-base-300">
        <span class="text-xs opacity-70">Fee Estimate</span>
        <div class="flex items-center gap-2">
          <span class="text-xs opacity-70">
            Refreshes in {{ countdown }}s
          </span>
          <button
            class="btn btn-ghost btn-xs btn-circle"
            :disabled="isRefreshing"
            :title="isRefreshing ? 'Updating...' : 'Refresh now'"
            @click="bridgeRefreshStore.manualRefresh()"
          >
            <Icon
              name="fluent:arrow-clockwise-24-filled"
              class="w-3 h-3"
              :class="{ 'animate-spin': isRefreshing }"
            />
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-if="feeInfo.error"
        class="alert alert-warning"
      >
        <Icon name="fluent:warning-24-filled" />
        <span>{{ feeInfo.error }}</span>
      </div>

      <!-- Fee Display -->
      <div class="flex justify-between items-center">
        <span class="opacity-70">Estimated Fee:</span>
        <span
          v-if="feeInfo.isLoading"
          class="loading loading-spinner loading-xs"
        />
        <span
          v-else-if="feeInfo.formattedFee"
          class="font-semibold"
        >
          {{ feeInfo.formattedFee }}
        </span>
        <span
          v-else
          class="opacity-50"
        >-</span>
      </div>

      <!-- Amount After Fees -->
      <div
        v-if="transferAmount && transferAmount > 0"
        class="flex justify-between items-center"
      >
        <span class="opacity-70">You'll Receive:</span>
        <span
          v-if="feeInfo.isLoading"
          class="loading loading-spinner loading-xs"
        />
        <span
          v-else-if="feeInfo.formattedAmountAfterFees"
          class="font-semibold"
        >
          {{ feeInfo.formattedAmountAfterFees }}
        </span>
        <span
          v-else
          class="opacity-50"
        >-</span>
      </div>
    </div>
  </UiCard>
</template>

<script setup lang="ts">
const bridgeRefreshStore = useBridgeRefreshStore()
const { isRefreshing, countdown } = storeToRefs(bridgeRefreshStore)

const { feeInfo } = useBridgeFee()

const { transferAmount } = storeToRefs(useBridgeStore())
</script>

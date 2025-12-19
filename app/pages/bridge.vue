<template>
  <div>
    <LayoutPageHeader>
      {{ $t("bridge.header") }}
    </LayoutPageHeader>

    <UiSection class="max-w-[550px] m-auto">
      <UiCard>
        <div class="flex flex-row items-center gap-2">
          <strong>From: </strong>
          <select
            v-model="fromNetworkId"
            class="select"
          >
            <option
              :value="null"
              disabled
            >
              Select a network
            </option>
            <option
              v-for="(network) in networkList"
              :key="network.id"
              :value="network.id"
            >
              {{ network.name }}
            </option>
          </select>
        </div>

        <div class="my-2 flex flex-row items-center gap-2">
          <input
            v-model="transferAmount"
            type="number"
            class="input input-ghost input-xl"
            placeholder="0"
          >
          <CommonSelectTokenFromNetworkModal
            :network-id="fromNetworkId"
            @token-selected="selectToken"
          />
        </div>

        <div class="flex flex-row items-center gap-2">
          <strong>To: </strong>
          <select
            v-model="toNetworkId"
            class="select"
          >
            <option
              :value="null"
              disabled
            >
              Select a network
            </option>
            <option
              v-for="(network) in toNetworkList"
              :key="network.id"
              :value="network.id"
            >
              {{ network.name }}
            </option>
          </select>
        </div>
      </UiCard>
      <div class="mt-4">
        <AccountConnectButton
          v-if="!isConnected && !connecting"
          class="w-full btn-xl"
        />
        <template v-else>
          <button
            class="btn btn-xl w-full"
            :disabled="buttonState.disabled"
          >
            {{ buttonState.message }}
          </button>
        </template>
      </div>
    </UiSection>
  </div>
</template>

<script setup lang="ts">
import { useBridgeStore } from "~/stores/bridge/bridge"

const { isConnected, connecting } = storeToRefs(useConnectorStore())

const {
  fromNetworkId,
  toNetworkId,
  transferAmount,
  networkList,
  tokenToTransfer,
  transferType,
} = storeToRefs(useBridgeStore())

// Filter out the selected "from" network from the "to" network list
const toNetworkList = computed(() => {
  const currentFromId = fromNetworkId.value

  return networkList.value.filter(network => network.id !== currentFromId)
})

function selectToken(token: Token) {
  tokenToTransfer.value = token
}

const buttonState = computed(() => {
  if (!tokenToTransfer.value) {
    return { message: "Select a token", disabled: true }
  } else if (!transferAmount.value || transferAmount.value <= 0) {
    return { message: "Enter an amount", disabled: true }
  } else if (!toNetworkId.value) {
    return { message: "Select destination", disabled: true }
  } else if (transferType.value) {
    return { message: `${transferType.value} token`, disabled: false }
  } else {
    return { message: "Cannot bridge", disabled: true }
  }
})
</script>

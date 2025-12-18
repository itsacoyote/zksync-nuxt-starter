<template>
  <div>
    <LayoutPageHeader>
      {{ $t("bridge.header") }}
    </LayoutPageHeader>

    <UiSection>
      <UiCard>
        <div class="my-2 flex flex-row items-center gap-2">
          <input
            v-model="transferAmount"
            type="number"
            class="input input-ghost input-xl"
            placeholder="0"
          >
          <CommonSelectTokenModal
            @token-selected="selectToken"
          />
        </div>

        <div class="flex flex-row items-center gap-2">
          <strong>To: </strong>
          <select
            v-model="toNetworkId"
            class="select"
          >
            <option :value="null">
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
    </UiSection>
    <button class="btn btn-xl w-full">
      <template v-if="!tokenToTransfer">
        Select a token
      </template>
      <template v-else-if="!transferAmount || transferAmount <= 0">
        Enter an amount
      </template>
      <template v-else-if="!toNetworkId">
        Select destination
      </template>
      <template v-else-if="transferType">
        <span class="capitalize">{{ transferType }}</span> token
      </template>
      <template v-else>
        --
      </template>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useBridgeStore } from "~/stores/bridge/bridge"

const {
  fromNetworkId,
  toNetworkId,
  transferAmount,
  networkList,
  tokenToTransfer,
  transferType,
} = storeToRefs(useBridgeStore())
const networkStore = useNetworkStore()

// Filter out the selected "from" network from the "to" network list
const toNetworkList = computed(() => {
  // Always create a fresh array copy to ensure Vue detects changes
  const networks = [ ...networkList.value ]
  const currentFromId = fromNetworkId.value

  if (!currentFromId) {
    return networks
  }

  return networks.filter(network => network.id !== currentFromId)
})

function selectToken({ token, networkId }: { token: Token, networkId: number }) {
  // Set the fromNetworkSelect to the network id
  fromNetworkId.value = networkId
  tokenToTransfer.value = token

  // Get the network and check if it's L2
  const network = networkStore.getNetworkById(networkId)

  if (isNetworkL2(network)) {
    // If the network is L2, set toNetworkSelect to the L1 network
    const l1Network = network.l1Network as ZkSyncNetwork
    toNetworkId.value = l1Network.id
  } else {
    // If the network is L1, leave the network unselected
    toNetworkId.value = null
  }
}
</script>

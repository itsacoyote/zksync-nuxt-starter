<template>
  <div class="drawer drawer-end">
    <input
      id="profile-drawer"
      ref="drawer-toggle"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content">
      <slot />
    </div>
    <div class="drawer-side">
      <label
        aria-label="close sidebar"
        class="drawer-overlay"
        @click="appState.toggleProfileDrawer()"
      />
      <ul class="bg-base-200 text-base-content min-h-full w-[100%] max-w-[430px] p-4">
        <li class="flex flex-row justify-between mb-2">
          <button
            type="button"
            class="btn btn-circle btn-ghost"
            @click="appState.toggleProfileDrawer()"
          >
            <Icon name="fluent:dismiss-16-filled" />
          </button>
        </li>
        <li>
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body flex items-center justify-between flex-row">
              <div>
                <NuxtImg
                  v-if="connections.length > 0"
                  :src="connections[0]!.connector.icon"
                  class="h-6 w-6 inline-block"
                />
                <span
                  v-if="address"
                  class="text-lg ml-2 align-middle font-bold"
                >{{ formatShortAddress(address) }}</span>
              </div>
              <div class="flex gap-1">
                <button
                  type="button"
                  class="btn btn-circle btn-soft"
                  @click="copyAddress"
                >
                  <Icon
                    name="fluent:document-copy-20-regular"
                    class="align-middle text-2xl"
                  />
                </button>
                <NuxtLink
                  :href="`${networkStore.blockExplorerUrl}/address/${address}`"
                  target="_blank"
                  class="btn btn-circle btn-soft"
                >
                  <Icon
                    name="fluent:apps-20-filled"
                    class="align-middle text-2xl"
                  />
                </NuxtLink>
                <button
                  type="button"
                  class="btn btn-circle btn-soft"
                  @click="disconnectAccount"
                >
                  <Icon
                    name="fluent:power-20-filled"
                    class="h-6 w-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </li>
        <li class="mt-4">
          <div class="mb-4 px-2">
            <label class="label">
              <input
                type="checkbox"
                class="toggle toggle-success"
                :checked="networkStore.testnet"
                @change="networkStore.toggleTestnet()"
              >
              Display testnet networks
            </label>
          </div>
          <CommonNetworkSelect class="w-full" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const appState = useAppStateStore()
const toggleDrawer = useTemplateRef("drawer-toggle")

onMounted(() => {
  toggleDrawer.value!.checked = appState.isProfileDrawerOpen
})

watch(() => appState.isProfileDrawerOpen, () => {
  toggleDrawer.value!.checked = appState.isProfileDrawerOpen
})

const { disconnect } = useDisconnect()
const disconnectAccount = async () => {
  await disconnect()
  appState.toggleProfileDrawer(false)
}

const connections = useConnections()
const { address } = useAccountStore()
const networkStore = useNetworkStore()

const copyAddress = () => {
  if (address.value) {
    navigator.clipboard.writeText(address.value)
  }
}
</script>

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
        for="profile-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
        @click="appState.toggleProfileDrawer()"
      />
      <ul class="bg-base-200 text-base-content min-h-full w-[100%] md:max-w-[430px] p-4">
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
                  v-if="connections.length > 0 && connections[0]?.connector.icon"
                  :src="connections[0]!.connector.icon"
                  class="h-6 w-6 inline-block"
                />
                <Icon
                  v-else
                  name="fluent:wallet-20-regular"
                  class="h-6 w-6 align-middle"
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
                  v-if="networkStore.blockExplorerUrl"
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
                  v-else
                  disabled
                  className="cursor-not-allowed text-base-content/40"
                >
                  <Icon
                    name="fluent:apps-20-filled"
                    class="align-middle text-2xl"
                  />
                </button>
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
            <label class="label text-sm text-base-content/70">
              Network Group
            </label>
            <select
              :value="networkStore.activeGroupKey"
              class="select w-full"
              @change="(e) => networkStore.changeActiveGroup((e.target as HTMLSelectElement).value)"
            >
              <option
                v-for="(group, key) in networkStore.visibleNetworkGroups"
                :key="key"
                :value="key"
              >
                {{ group.name }}
              </option>
            </select>
          </div>
          <CommonNetworkSwitch class="w-full" />
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

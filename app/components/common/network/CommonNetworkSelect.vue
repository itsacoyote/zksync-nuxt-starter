<!-- eslint-disable @stylistic/max-len -->
<template>
  <Select.Root v-model="networkStore.activeNetwork.id">
    <Select.Trigger
      class="select w-full outline-none! cursor-pointer"
      aria-label="Customise options"
    >
      <Select.Value
        :placeholder="networkStore.activeNetwork.name"
        class="px-2 text-lg"
      />
    </Select.Trigger>

    <Select.Portal>
      <Select.Content
        class="min-w-[330px] bg-base-100 dropdown-content rounded-box shadow-sm will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100] pb-3"
        :side-offset="5"
        position="popper"
        align="end"
      >
        <Select.ScrollUpButton class="flex items-center justify-center h-[32px] bg-white cursor-default text-neutral-600">
          <Icon name="fluent:chevron-up-16-regular" />
        </Select.ScrollUpButton>

        <Select.Viewport class="px-2">
          <Select.Label class="pl-6 text-sm py-2 text-base-content/70">
            {{ networkStore.activeGroup?.name }}
          </Select.Label>
          <Select.Group>
            <Select.Item
              v-for="(network, index) in networkStore.zkSyncNetworks"
              :key="index"
              class="cursor-pointer text-base rounded-field pl-6 pr-4 py-2 text-base-content flex items-center relative select.-none data-[highlighted]:outline-none data-[highlighted]:bg-base-200 data-[highlighted]:text-base-content"
              :value="network.id"
              :class="{ 'font-bold': network.id === networkStore.activeNetwork.id }"
              @select="$emit('selectNetwork', network.id)"
            >
              <Select.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                <Icon name="fluent:checkmark-16-regular" />
              </Select.ItemIndicator>
              <Select.ItemText>
                <img
                  :src="`/network-icons/${network.id}.svg`"
                  class="w-4 h-4 rounded-sm absolute bottom-0 right-0"
                >
                {{ network.name }}
              </Select.ItemText>
            </Select.Item>
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          class="flex items-center justify-center h-[32px] bg-white text-neutral-600 cursor-default"
        >
          <Icon name="radix-icons:chevron-down" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
</template>

<script setup lang="ts">
/**
 * A network selector that WILL NOT switch the actively selected network for the wallet.
 * Use the CommonNetworkSelect component to change the active network.
 */
import { Select } from "reka-ui/namespaced"

const networkStore = useNetworkStore()
defineEmits<{ (e: "selectNetwork", id: number): void }>()
</script>

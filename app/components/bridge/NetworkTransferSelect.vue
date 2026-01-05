<template>
  <div class="flex flex-row items-center gap-2">
    <Select.Root
      :model-value="modelValue?.toString()"
      @update:model-value="handleSelect"
    >
      <Select.Trigger
        class="select w-full outline-none! cursor-pointer h-auto"
        aria-label="Select network"
      >
        <Select.Value
          :placeholder="placeholder"
          class="px-2 text-lg"
        >
          <div
            v-if="selectedNetwork"
            class="flex flex-col items-start py-2"
          >
            <span class="opacity-70 text-sm">{{ label }}</span>
            <div class="flex flex-row items-center gap-2">
              <img
                :src="`/network-icons/${selectedNetwork.id}.svg`"
                class="w-8 h-8 rounded-sm"
                :alt="selectedNetwork.name"
              >
              <span class="text-left text-wrap leading-3.5">{{ selectedNetwork.name }}</span>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col items-start py-2"
          >
            <span class="text-sm opacity-70">{{ label }}</span>
            <span>{{ placeholder }}</span>
          </div>
        </Select.Value>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          class="
            min-w-[250px] bg-base-100 dropdown-content rounded-box shadow-sm z-[100] pb-3
            will-change-[opacity,transform]
            data-[side=top]:animate-slideDownAndFade
            data-[side=right]:animate-slideLeftAndFade
            data-[side=bottom]:animate-slideUpAndFade
            data-[side=left]:animate-slideRightAndFade
          "
          :side-offset="5"
          position="popper"
          align="start"
        >
          <Select.ScrollUpButton
            class="flex items-center justify-center h-[32px] bg-white cursor-default text-neutral-600"
          >
            <UiIconChevronUp />
          </Select.ScrollUpButton>

          <Select.Viewport class="px-2">
            <Select.Group>
              <Select.Item
                v-for="network in networks"
                :key="network.id"
                class="
                  cursor-pointer text-base rounded-field pl-6 pr-4 py-2 text-base-content
                  flex items-center relative select-none
                  data-[highlighted]:outline-none
                  data-[highlighted]:bg-base-200
                  data-[highlighted]:text-base-content
                "
                :value="network.id.toString()"
                :class="{ 'font-bold': network.id === modelValue }"
              >
                <Select.ItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <UiIconCheckmark />
                </Select.ItemIndicator>
                <Select.ItemText class="flex items-center gap-2">
                  <img
                    :src="`/network-icons/${network.id}.svg`"
                    class="w-4 h-4 rounded-sm"
                    :alt="network.name"
                  >
                  {{ network.name }}
                </Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton
            class="flex items-center justify-center h-[32px] bg-white text-neutral-600 cursor-default"
          >
            <UiIconChevronDown />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  </div>
</template>

<script setup lang="ts">
import { Select } from "reka-ui/namespaced"

interface Network {
  id: number
  name: string
}

const props = withDefaults(defineProps<{
  modelValue: number | null
  networks: Network[]
  label: string
  placeholder?: string
}>(), { placeholder: "Select a network" })

const emit = defineEmits<{ (e: "update:modelValue", value: number | null): void }>()

const selectedNetwork = computed(() => {
  if (!props.modelValue) return null
  return props.networks.find(network => network.id === props.modelValue)
})

function handleSelect(value: string) {
  const networkId = parseInt(value, 10)
  emit("update:modelValue", networkId)
}
</script>

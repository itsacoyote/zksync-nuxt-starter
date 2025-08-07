<template>
  <Tooltip.Provider v-if="isTruncated">
    <Tooltip.Root>
      <Tooltip.Trigger>
        <span class="text-base">{{ formattedAmount[0] }} {{ symbol }}</span>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          class=" bg-white px-3 py-2 border border-gray-200 shadow-sm rounded-sm text-base"
          :side-offset="5"
        >
          {{ formattedAmount[1] }} {{ symbol }}
          <Tooltip.Arrow
            class="fill-white stroke-gray-200"
            :width="12"
            :height="6"
          />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
  <div
    v-else
  >
    {{ formattedAmount[0] }}
  </div>
</template>

<script setup lang="ts">
import { Tooltip } from "reka-ui/namespaced"

const props = defineProps<{
  formattedAmount: [string, string]
  symbol?: string
}>()

const isTruncated = computed(() => props.formattedAmount[0].includes("..."))
</script>

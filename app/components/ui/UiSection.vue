<template>
  <div class="my-4">
    <div
      v-if="$slots.header"
      class="mb-2"
    >
      <slot name="header" />
    </div>
    <div class="my-2">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="mt-2"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between mb-4">
    <UiHeaderPrimary class="text-3xl mb-4">
      <slot />
    </UiHeaderPrimary>
    <div>
      <slot name="right-col" />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

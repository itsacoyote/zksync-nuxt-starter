<template>
  <div class="card bg-base-100 card-md shadow-sm">
    <slot name="pre-body" />
    <div class="card-body text-base">
      <div
        v-if="$slots.title"
        class="card-title"
      >
        <slot name="title" />
      </div>
      <slot />
      <div
        v-if="$slots.actions"
        class="card-actions"
      >
        <slot name="actions" />
      </div>
    </div>
    <slot name="post-body" />
  </div>
</template>

<script setup lang="ts">
</script>

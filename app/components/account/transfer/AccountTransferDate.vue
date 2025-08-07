<template>
  <div class="text-base text-base-content/60">
    {{ useTimeAgo(date, 'twitter') }}
  </div>
</template>

<script setup lang="ts">
defineProps<{ date: string }>()
</script>

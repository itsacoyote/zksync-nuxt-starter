<template>
  <ClientOnly>
    <LayoutMenuDrawer>
      <LayoutProfileDrawer>
        <LayoutNavbar />
        <div class="m-auto max-w-[1100px] mt-6 px-4 pb-12">
          <NuxtPage />
        </div>
      </LayoutProfileDrawer>
    </LayoutMenuDrawer>
  </ClientOnly>
</template>

<script setup lang="ts">
// Initialize stores only on client side since they use Wagmi composables
onMounted(() => {
  useConnectorStore()
  useAccountStore()
})
</script>

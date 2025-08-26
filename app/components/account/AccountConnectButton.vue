<template>
  <div>
    <button
      class="btn btn-primary"
      @click="openModal()"
    >
      <template v-if="!opening">
        Connect wallet
      </template>
      <Icon
        v-else
        name="fluent:arrow-clockwise-28-filled"
        class="animate-spin"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const { open } = useAppKit()

const networkData = useAppKitNetwork()
const appKitState = useAppKitState()
const opening = ref(false)
const openModal = () => {
  opening.value = true
  console.log("NETWORK DATA", networkData.value)
  open()
}
watch(() => appKitState.open, (state) => {
  if (!state) {
    opening.value = false
  }
})
</script>

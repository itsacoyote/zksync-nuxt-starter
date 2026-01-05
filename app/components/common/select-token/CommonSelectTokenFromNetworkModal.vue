<template>
  <button
    class="btn btn-outline btn-secondary"
    @click="tokenSelectModal?.showModal()"
  >
    <template v-if="selectedToken">
      <img
        v-if="selectedToken.iconURL"
        :src="selectedToken.iconURL"
        :alt="selectedToken.symbol"
        class="w-6 h-6 rounded-full"
      >
      <span>{{ selectedToken.symbol }}</span>
    </template>
    <template v-else>
      Select token
    </template>
    <UiIconChevronDown />
  </button>
  <dialog
    ref="token-select-modal"
    class="modal modal-bottom sm:modal-middle"
  >
    <div class="modal-box flex flex-col">
      <div class="flex flex-row justify-between">
        <h3 class="font-bold text-lg mb-4">
          Select a token
        </h3>
        <form method="dialog">
          <button class="btn btn-ghost btn-circle">
            <UiIconClose />
          </button>
        </form>
      </div>
      <div class="flex gap-2 mb-4">
        <label class="input input-bordered flex items-center gap-2 flex-1">
          <UiIconSearch />
          <input
            v-model="searchQuery"
            type="text"
            class="grow"
            placeholder="Search tokens..."
          >
        </label>
      </div>
      <div class="max-h-[45vh] overflow-y-scroll">
        <div
          v-if="!networkId"
          class="text-center p-4"
        >
          Please select a network first
        </div>
        <div
          v-else-if="isLoading"
          class="flex justify-center p-4"
        >
          <span class="loading loading-spinner loading-md" />
        </div>
        <div
          v-else-if="hasError"
          class="alert alert-error"
        >
          <span>Error loading tokens</span>
        </div>
        <div
          v-else-if="filteredTokens.length === 0"
          class="text-center p-4"
        >
          {{ searchQuery ? "No tokens found" : "No tokens available" }}
        </div>
        <div
          v-else
          class="space-y-4"
        >
          <span
            v-if="tokensWithBalances.length > 0"
            class="opacity-70"
          >Your tokens</span>
          <!-- Your Tokens with Balances -->
          <ul
            v-if="tokensWithBalances.length > 0"
            class="menu w-full"
          >
            <CommonSelectToken
              v-for="token in tokensWithBalances"
              :key="`balance-${token.l2Address}`"
              :token="token"
              :network-id="networkId"
              :network-name="networkName"
              :show-balance="true"
              @select="({ token }) => selectToken(token)"
            />
          </ul>
          <span
            v-if="tokensWithoutBalances.length > 0"
            class="opacity-70"
          >Tokens</span>
          <!-- Tokens Without Balances -->
          <ul class="menu w-full">
            <CommonSelectToken
              v-for="token in tokensWithoutBalances"
              :key="`${token.l2Address}`"
              :token="token"
              :network-id="networkId"
              :network-name="networkName"
              :show-balance="false"
              @select="({ token }) => selectToken(token)"
            />
          </ul>
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
interface Props { networkId: number | null }

const props = defineProps<Props>()
const emit = defineEmits<{ tokenSelected: [Token] }>()

const tokensStore = useTokensStore()
const tokenSelectModal = useTemplateRef("token-select-modal")
const searchQuery = ref("")
const selectedToken = ref<Token | null>(null)

// Find the network group for the specified networkId
const networkGroup = computed(() => {
  if (!props.networkId) return null
  return tokensStore.tokensByNetwork.find(group => group.network.id === props.networkId)
})

// Extract network name for display
const networkName = computed(() => networkGroup.value?.network.name ?? "")

// Loading/error states for this specific network
const isLoading = computed(() => networkGroup.value?.isLoading ?? false)
const hasError = computed(() => networkGroup.value?.isError ?? false)

// All tokens for the network
const allTokens = computed(() => networkGroup.value?.tokens ?? [])

// Filter tokens by search query
function filterTokensBySearch(tokens: Token[], query: string): Token[] {
  const searchTerm = query.toLowerCase().trim()
  return tokens.filter(token =>
    token.name.toLowerCase().includes(searchTerm)
    || token.symbol.toLowerCase().includes(searchTerm)
    || token.l2Address.toLowerCase().includes(searchTerm)
    || token.l1Address?.toLowerCase().includes(searchTerm))
}

// Split tokens: with balances vs without
const tokensWithBalances = computed(() => {
  let tokens = allTokens.value.filter(token => token.amount && token.amount > 0n)

  // Apply search filter
  if (searchQuery.value.trim()) {
    tokens = filterTokensBySearch(tokens, searchQuery.value)
  }

  // Sort by USD value descending
  return tokens.sort((a, b) => {
    const aValue = a.usdBalance ?? 0
    const bValue = b.usdBalance ?? 0
    return bValue - aValue
  })
})

const tokensWithoutBalances = computed(() => {
  let tokens = allTokens.value.filter(token => !token.amount || token.amount === 0n)

  // Apply search filter
  if (searchQuery.value.trim()) {
    tokens = filterTokensBySearch(tokens, searchQuery.value)
  }

  return tokens
})

const filteredTokens = computed(() => [
  ...tokensWithBalances.value,
  ...tokensWithoutBalances.value,
])

function selectToken(token: Token) {
  selectedToken.value = token
  emit("tokenSelected", token)
  tokenSelectModal.value?.close()
  searchQuery.value = ""
}

// Reset selected token when network changes
watch(() => props.networkId, () => {
  selectedToken.value = null
})
</script>

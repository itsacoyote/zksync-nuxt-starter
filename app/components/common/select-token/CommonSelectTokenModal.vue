<template>
  <button
    class="btn"
    @click="tokenSelectModal?.showModal()"
  >
    <template v-if="selectedToken">
      <div class="relative">
        <img
          v-if="selectedToken.iconURL"
          :src="selectedToken.iconURL"
          :alt="selectedToken.symbol"
          class="w-6 h-6 rounded-full"
        >
        <img
          :src="`/network-icons/${selectedTokenNetworkId}.svg`"
          class="w-2 h-2 rounded-sm absolute bottom-0 right-0"
        >
      </div>
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
      <h3 class="font-bold text-lg mb-4">
        Select a token
      </h3>
      <div class="flex gap-2 mb-4">
        <label class="basis-1/2 input input-bordered flex items-center gap-2 flex-1">
          <UiIconSearch />
          <input
            v-model="searchQuery"
            type="text"
            class="grow"
            placeholder="Search tokens..."
          >
        </label>
        <select
          v-model="selectedNetworkId"
          class="select select-bordered basis-1/2"
        >
          <option :value="null">
            All networks
          </option>
          <option
            v-for="networkGroup in tokensStore.tokensByNetwork"
            :key="networkGroup.network.id"
            :value="networkGroup.network.id"
          >
            <img
              :src="`/network-icons/${networkGroup.network.id}.svg`"
              class="w-4 h-4 rounded-sm"
            >
            {{ networkGroup.network.name }}
          </option>
        </select>
      </div>
      <div class="max-h-[45vh] overflow-y-scroll">
        <div
          v-if="tokensStore.isLoading"
          class="flex justify-center p-4"
        >
          <span class="loading loading-spinner loading-md" />
        </div>
        <div
          v-else-if="tokensStore.hasError"
          class="alert alert-error"
        >
          <span>Error loading tokens</span>
        </div>
        <div
          v-else-if="filteredTokensByNetwork.length === 0"
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
              v-for="item in tokensWithBalances"
              :key="`balance-${item.networkId}-${item.token.l2Address}`"
              :token="item.token"
              :network-id="item.networkId"
              :network-name="item.networkName"
              :show-balance="true"
              @select="({ token, networkId }) => selectToken(token, networkId)"
            />
          </ul>
          <span class="opacity-70">Tokens</span>
          <!-- All Tokens by Network -->
          <ul class="menu w-full">
            <template
              v-for="networkGroup in filteredTokensByNetwork"
              :key="networkGroup.network.id"
            >
              <CommonSelectToken
                v-for="token in networkGroup.tokens"
                :key="`${networkGroup.network.id}-${token.l2Address}`"
                :token="token"
                :network-id="networkGroup.network.id"
                :network-name="networkGroup.network.name"
                :show-balance="false"
                @select="({ token, networkId }) => selectToken(token, networkId)"
              />
            </template>
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
const emit = defineEmits<{ tokenSelected: [{ token: Token, networkId: number }] }>()

const tokensStore = useTokensStore()
const tokenSelectModal = useTemplateRef("token-select-modal")
const searchQuery = ref("")
const selectedToken = ref<Token | null>(null)
const selectedTokenNetworkId = ref<number | null>(null)
const selectedNetworkId = ref<number | null>(null)
const filteredTokensByNetwork = ref(tokensStore.tokensByNetwork)

interface TokenWithBalance {
  token: Token
  networkId: number
  networkName: string
}

const tokensWithBalances = ref<TokenWithBalance[]>([])

// Extract all tokens with balances across all networks
function extractTokensWithBalances(tokensByNetwork: typeof tokensStore.tokensByNetwork) {
  const result: TokenWithBalance[] = []

  for (const group of tokensByNetwork) {
    for (const token of group.tokens) {
      if (token.amount && token.amount > 0n) {
        result.push({
          token,
          networkId: group.network.id,
          networkName: group.network.name,
        })
      }
    }
  }

  // Sort by USD value descending
  result.sort((a, b) => {
    const aValue = a.token.usdBalance ?? 0
    const bValue = b.token.usdBalance ?? 0
    return bValue - aValue
  })

  return result
}

watch(
  [
    searchQuery,
    selectedNetworkId,
    () => tokensStore.tokensByNetwork,
  ], ([
    query,
    networkId,
    tokensByNetwork,
  ]) => {
    let filtered = tokensByNetwork
    let balances = extractTokensWithBalances(tokensByNetwork)

    // Filter by network
    if (networkId !== null) {
      filtered = filtered.filter(group => group.network.id === networkId)
      balances = balances.filter(item => item.networkId === networkId)
    }

    // Filter by search query
    if (query.trim()) {
      const searchTerm = query.toLowerCase().trim()

      filtered = filtered
        .map(group => ({
          ...group,
          tokens: group.tokens.filter(token =>
            token.name.toLowerCase().includes(searchTerm)
            || token.symbol.toLowerCase().includes(searchTerm)
            || token.l2Address.toLowerCase().includes(searchTerm)
            || token.l1Address?.toLowerCase().includes(searchTerm)),
        }))
        .filter(group => group.tokens.length > 0)

      balances = balances.filter(item =>
        item.token.name.toLowerCase().includes(searchTerm)
        || item.token.symbol.toLowerCase().includes(searchTerm)
        || item.token.l2Address.toLowerCase().includes(searchTerm)
        || item.token.l1Address?.toLowerCase().includes(searchTerm))
    }

    // Remove tokens with balances from the main list to avoid duplication
    filtered = filtered.map(group => ({
      ...group,
      tokens: group.tokens.filter(token => !token.amount || token.amount === 0n),
    }))

    filteredTokensByNetwork.value = filtered
    tokensWithBalances.value = balances
  }, { immediate: true },
)

function selectToken(token: Token, networkId: number) {
  selectedTokenNetworkId.value = networkId
  selectedToken.value = token
  emit("tokenSelected", { token, networkId })
  tokenSelectModal.value?.close()
  searchQuery.value = ""
}
</script>

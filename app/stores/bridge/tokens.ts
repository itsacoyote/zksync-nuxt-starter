import { useQueries } from "@tanstack/vue-query"
import { flatMap } from "es-toolkit"
import { uniqBy } from "es-toolkit/array"

export interface Token {
  l2Address: `0x${string}`
  l1Address: `0x${string}`
  symbol: string
  name: string
  decimals: string
  usdPrice: number
  liquidity: number
  iconURL: string
  l1Token?: boolean
  amount?: bigint
  usdBalance?: number
}

interface TokensResponse {
  items: Token[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
  links: {
    first: string
    previous: string
    next: string
    last: string
  }
}

interface TokenBalanceData {
  TokenAddress: `0x${string}`
  TokenName: string
  TokenSymbol: string
  TokenQuantity: bigint
  TokenDivisor: number
}

interface Asset {
  l2Address: `0x${string}`
  name: string
  symbol: string
  amount: bigint
  decimals: number
}

interface AnkrTokenBalance {
  contractAddress: `0x${string}` | null
  balance: bigint
  balanceUsd: string
}

export const useTokensStore = defineStore("bridgeTokens", () => {
  const networkStore = useNetworkStore()
  const { zkSyncNetworks } = storeToRefs(networkStore)

  const fetchTokens = async (blockExplorerApiUrl: string): Promise<Token[]> => {
    const urls = [
      1,
      2,
      3,
    ]
      .map(page => `${blockExplorerApiUrl}/tokens?minLiquidity=0&limit=100&page=${page}`)
    const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json() as Promise<TokensResponse>)))
    return flatMap(responses, response => response.items)
  }

  // Create query configurations for each network
  const queries = computed(() => {
    return zkSyncNetworks.value
      .map((network) => {
        const apiUrl = network.blockExplorers.default?.apiUrl
        if (!apiUrl) return null

        return {
          queryKey: [
            "tokens",
            network.id,
          ],
          queryFn: () => fetchTokens(apiUrl),
          staleTime: 5 * 60 * 1000, // 5 minutes
          retry: blockExplorerApiRetry,
        }
      })
      .filter((query): query is NonNullable<typeof query> => query !== null)
  })

  const results = useQueries({ queries })

  // Create asset queries for user balances
  const account = useAccount()

  const assetQueries = computed(() => {
    if (!account.address.value) return []

    return zkSyncNetworks.value
      .map((network) => {
        const apiUrl = network.blockExplorers.default?.apiUrl
        if (!apiUrl) return null

        return {
          queryKey: [
            "account",
            "assets",
            account.address,
            network.id,
          ],
          queryFn: async () => {
            const response = await fetch(`${apiUrl}/api?module=account&action=addresstokenbalance&address=${account.address.value}`)
            const data = await fetchBlockExplorerApiData<TokenBalanceData[]>(() => Promise.resolve(response))
            return data
              .filter(token => token.TokenName !== "")
              .map(item => ({
                l2Address: item.TokenAddress,
                name: item.TokenName,
                symbol: item.TokenSymbol,
                amount: item.TokenQuantity,
                decimals: item.TokenDivisor,
              }))
          },
          enabled: !!account.address.value,
          staleTime: Infinity,
          retry: blockExplorerApiRetry,
        }
      })
      .filter((query): query is NonNullable<typeof query> => query !== null)
  })

  const assetResults = useQueries({ queries: assetQueries })

  // L1 token balance queries using Ankr
  const l1TokenQueries = computed(() => {
    if (!account.address.value) return []

    return networkStore.l1Networks.map((l1Network) => {
      return {
        queryKey: [
          "ankr",
          "l1-tokens",
          l1Network.id,
          account.address,
        ],
        queryFn: async () => {
          const runtimeConfig = useRuntimeConfig()
          const ankrToken = runtimeConfig.public.ankrToken

          if (!ankrToken || ankrToken === "") return []

          const NETWORK_ID_TO_ANKR: Record<number, "eth" | "eth_sepolia"> = {
            1: "eth",
            11155111: "eth_sepolia",
          }

          const ankrBlockchain = NETWORK_ID_TO_ANKR[l1Network.id]
          if (!ankrBlockchain) return []

          const { AnkrProvider } = await import("@ankr.com/ankr.js")
          const ankrProvider = new AnkrProvider(`https://rpc.ankr.com/multichain/${ankrToken}`)

          const response = await ankrProvider.getAccountBalance({
            blockchain: [ ankrBlockchain ],
            walletAddress: account.address.value!,
            onlyWhitelisted: false,
          })

          return response.assets.map(asset => ({
            contractAddress: asset.contractAddress
              ? (asset.contractAddress as `0x${string}`)
              : null,
            balance: BigInt(asset.balanceRawInteger),
            balanceUsd: asset.balanceUsd,
          }))
        },
        enabled: !!account.address.value,
        staleTime: Infinity,
        retry: false,
      }
    })
  })

  const l1TokenResults = useQueries({ queries: l1TokenQueries })

  // Loading/error states for assets
  const isAssetsLoading = computed(() => {
    if (!account.address.value) return false
    return assetResults.value.some(result => result.isLoading)
  })

  const hasAssetsError = computed(() => {
    return assetResults.value.some(result => result.isError)
  })

  // Group tokens by network (base groups without balances)
  const baseTokensByNetwork = computed(() => {
    const networkGroups = zkSyncNetworks.value
      .map((network, index) => {
        const result = results.value[index]
        return {
          network,
          tokens: result?.data ?? [],
          isLoading: result?.isLoading ?? false,
          isError: result?.isError ?? false,
        }
      })
      .filter(item => item.network.blockExplorers.default?.apiUrl)

    // Extract and deduplicate L1 tokens from all network tokens
    const allTokens = networkGroups.flatMap(group => group.tokens)
    const l1Tokens = uniqBy(allTokens.filter(token => token.l1Address),
      token => token.l1Address)

    // Add L1 tokens as a separate group at the beginning if available
    if (l1Tokens.length > 0 && networkStore.activeNetworkL1) {
      networkGroups.unshift({
        network: networkStore.activeNetworkL1,
        tokens: l1Tokens.map(token => ({ ...token, l1Token: true })),
        isLoading: false,
        isError: false,
      })
    }

    return networkGroups
  })

  // Enrich tokens with user balance data
  const tokensByNetwork = computed(() => {
    if (!account.address.value) {
      return baseTokensByNetwork.value
    }

    // L2 asset lookup map: networkId -> { l2Address -> asset }
    const assetsByNetwork = new Map<number, Record<string, Asset>>()

    zkSyncNetworks.value.forEach((network, index) => {
      const result = assetResults.value[index]
      if (result?.data) {
        const assetMap = result.data.reduce((acc, asset) => {
          acc[asset.l2Address] = asset
          return acc
        }, {} as Record<string, Asset>)
        assetsByNetwork.set(network.id, assetMap)
      }
    })

    // L1 Ankr balance lookup map: networkId -> { l1Address -> balance }
    const ankrBalancesByNetwork = new Map<number, Record<string, AnkrTokenBalance>>()

    networkStore.l1Networks.forEach((network, index) => {
      const result = l1TokenResults.value[index]
      if (result?.data) {
        const balanceMap = result.data.reduce((acc, balance) => {
          // Native ETH has null contractAddress, normalize to 0x000...
          const address = balance.contractAddress
            || "0x0000000000000000000000000000000000000000"
          acc[address.toLowerCase()] = balance
          return acc
        }, {} as Record<string, AnkrTokenBalance>)
        ankrBalancesByNetwork.set(network.id, balanceMap)
      }
    })

    // Enrich tokens with balance data
    return baseTokensByNetwork.value.map((group) => {
      const isL1Group = group.tokens.some(token => token.l1Token === true)

      return {
        ...group,
        tokens: group.tokens.map((token) => {
          if (isL1Group) {
            // Enrich L1 tokens with Ankr data
            const ankrBalances = ankrBalancesByNetwork.get(group.network.id)
            const ankrBalance = ankrBalances?.[token.l1Address.toLowerCase()]

            if (!ankrBalance || ankrBalance.balance === 0n) return token

            return {
              ...token,
              amount: ankrBalance.balance,
              usdBalance: parseFloat(ankrBalance.balanceUsd),
            }
          } else {
            // Enrich L2 tokens with asset data (existing logic)
            const assets = assetsByNetwork.get(group.network.id)
            const asset = assets?.[token.l2Address]

            if (!asset || asset.amount === 0n) return token

            return {
              ...token,
              amount: asset.amount,
              usdBalance: tokenBalancePriceRaw(
                asset.amount,
                Number.parseInt(token.decimals),
                token.usdPrice,
              ),
            }
          }
        }),
      }
    })
  })

  const isLoading = computed(() => {
    if (tokensByNetwork.value.length === 0) return false
    return tokensByNetwork.value.some(item => item.isLoading)
  })

  const hasError = computed(() => {
    if (tokensByNetwork.value.length === 0) return false
    return tokensByNetwork.value.some(item => item.isError)
  })

  return {
    tokensByNetwork,
    isLoading,
    hasError,
    isAssetsLoading,
    hasAssetsError,
  }
})

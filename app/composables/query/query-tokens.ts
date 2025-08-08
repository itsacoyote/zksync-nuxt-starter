import { useQuery } from "@tanstack/vue-query"
import { flatMap } from "es-toolkit"

export interface Token {
  l2Address: `0x${string}`
  l1Address: `0x${string}`
  symbol: string
  name: string
  decimals: string
  usdPrice: number
  liquidity: number
  iconURL: string
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

export const useQueryTokens = () => {
  const networkStore = useNetworkStore()

  const fetchData = async (): Promise<{ [k in string]: Token }> => {
    const urls = [
      1,
      2,
      3,
    ]
      .map(page => `${networkStore.blockExplorerApiUrl}/tokens?minLiquidity=0&limit=100&page=${page}`)
    const responses = await Promise.all(urls.map(url => fetch(url).then(res => res.json() as Promise<TokensResponse>)))
    const flattenedTokens = flatMap(responses, response => response.items)
    const tokensByL2Address = flattenedTokens.reduce<Record<string, Token>>((acc, token) => {
      acc[token.l2Address] = token
      return acc
    }, {})
    return tokensByL2Address
  }

  return useQuery<{ [k in string]: Token }>({
    queryKey: [
      "tokens",
      () => networkStore.blockExplorerApiUrl,
    ],
    queryFn: fetchData,
    retry: blockExplorerApiRetry,
    refetchInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
  })
}

import { useQuery } from "@tanstack/vue-query"

export interface BaseToken {
  contractAddress: `0x${string}`
  tokenName: string
  symbol: string
  tokenDecimal: number
  tokenPriceUSD: number
  liquidity: bigint
  l1Address: `0x${string}`
  iconURL: string
  native: true
}

export const useQueryBaseToken = () => {
  const networkStore = useNetworkStore()

  const fetchBaseToken = async () => {
    if (!networkStore.blockExplorerApiUrl) {
      throw new Error("Block explorer API URL is not defined for the current network")
    }
    return await fetch(`${networkStore.blockExplorerApiUrl}/api?module=token&action=tokeninfo&contractaddress=${L2_BASE_TOKEN_ADDRESS}`)
  }

  const formatData = (token: BaseToken) => {
    return {
      l2Address: token.contractAddress,
      l1Address: token.l1Address,
      symbol: token.symbol,
      name: token.tokenName,
      decimals: token.tokenDecimal,
      usdPrice: token.tokenPriceUSD,
      liquidity: token.liquidity,
      iconURL: token.iconURL,
      native: true,
    }
  }

  return useQuery({
    queryKey: [
      "base_token",
      () => networkStore.blockExplorerApiUrl,
    ],
    queryFn: () => fetchBlockExplorerApiData<BaseToken[]>(fetchBaseToken).then(data => formatData(data[0]!)),
    // enabled: () => networkStore.blockExplorerApiUrl !== null,
    retry: blockExplorerApiRetry,
    refetchInterval: 5 * 60 * 1000, // 5 minutes in milliseconds
  })
}

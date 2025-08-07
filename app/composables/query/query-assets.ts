import { useQuery } from "@tanstack/vue-query"

interface TokenBalanceData {
  TokenAddress: `0x${string}`
  TokenName: string
  TokenSymbol: string
  TokenQuantity: bigint
  TokenDivisor: number
}

export const useQueryAssets = () => {
  const networkStore = useNetworkStore()
  const account = useAccount()

  const fetchAssets = async () =>
    await fetch(`${networkStore.blockExplorerApiUrl}/api?module=account&action=addresstokenbalance&address=${account.address.value}`)

  const formatData = (data: TokenBalanceData[]) => {
    return data.map(data => ({
      l2Address: data.TokenAddress,
      name: data.TokenName,
      symbol: data.TokenSymbol,
      amount: data.TokenQuantity,
      decimals: data.TokenDivisor,
    }))
  }

  return useQuery({
    queryKey: [
      "account",
      "assets",
      account.address,
      () => networkStore.blockExplorerApiUrl,
    ],
    // Currently the API returns ERC721s along with ERC20s which
    // is unintended behavior. This filters tokens returned without a name
    // which includes ERC721s
    queryFn: () => fetchBlockExplorerApiData<TokenBalanceData[]>(fetchAssets).then(data => data.filter(token => token.TokenName !== "")).then(data => formatData(data)),
    retry: blockExplorerApiRetry,
  })
}

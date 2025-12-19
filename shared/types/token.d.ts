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
  native?: boolean
}

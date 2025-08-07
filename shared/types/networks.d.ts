export type L1Network = ZkSyncNetwork

export type ZkSyncNetwork = {
  /**
   * The chain ID of the network.
   */
  id: number
  /**
   * Key should be two words separated by a dash.
   * Suggested format is `{network name}-{env}`.
   *
   * Example: `ethereum-mainnet`
   */
  key: string
  /**
   * String readable name for the network
   */
  name: string
  rpcUrls: { default: { http: string[] } }
  blockExplorers: {
    default: {
      name: string
      url: string
      apiUrl: string
    }
  }
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  /**
   * Define the L1 network if there is one.
   *
   * If the network is an L1, simply set to true
   */
  l1Network: L1Network | true
  testnet: boolean
  /**
   * Primarily for Gateway, this defines
   * if only the network's native token
   * can be bridged to it.
   */
  nativeTokenBridgingOnly?: boolean
}

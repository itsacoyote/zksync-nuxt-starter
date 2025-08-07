import { useQuery } from "@tanstack/vue-query"
import type { Address } from "viem"

export interface Transaction {
  blockNumber: number
  timeStamp: number
  hash: `0x${string}`
  nonce: number
  blockHash: `0x${string}`
  transactionIndex: number
  from: Address
  to: Address
  value: number
  gas: bigint
  gasPrice: bigint
  isError: number
  txreceipt_status: number
  input: `0x${string}`
  contractAddress: Address | null
  cumulativeGasUsed: number
  gasUsed: bigint
  confirmations: number
  fee: bigint
  commitTxHash: `0x${string}`
  commitChainId: number
  proveTxHash: `0x${string}`
  proveChainId: number
  executeTxHash: `0x${string}`
  executeChainId: number
  isL1Originated: number
  l1BatchNumber: number
  type: number
  methodId: `0x${string}`
  functionName: string
}

export const useQueryTransactions = () => {
  const networkStore = useNetworkStore()
  const account = useAccount()

  const fetchTransactions = async () =>
    await fetch(`${networkStore.blockExplorerApiUrl}/api?module=account&action=txlist&page=1&offset=10&sort=descr&endblock=99999999&startblock=0&address=${account.address.value}`)

  return useQuery({
    queryKey: [
      "account",
      "transactions",
      account.address,
      () => networkStore.blockExplorerApiUrl,
    ],
    queryFn: () => fetchBlockExplorerApiData<Transaction[]>(fetchTransactions),
    retry: blockExplorerApiRetry,
  })
}

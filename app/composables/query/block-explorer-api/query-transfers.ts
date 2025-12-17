import { useQuery } from "@tanstack/vue-query"
import { isNil, sortBy } from "es-toolkit"
import type { Address } from "viem"

export interface Transfer {
  from: Address
  to: Address
  blockNumber: bigint
  transactionHash: `0x${string}`
  timestamp: string
  amount: bigint
  tokenAddress: Address
  type: "deposit" | "transfer" | "withdrawal" | "fee" | "mint" | "refund"
  tokenType: string
  fields: unknown
  isInternal: boolean
  token: {
    l2Address: Address
    l1Address: Address
    symbol: string
    name: string
    decimals: number
    usdPrice: number
    liquidity: number
    iconURL: string
  }
}

export const useQueryTransfers = () => {
  const networkStore = useNetworkStore()
  const account = useAccount()

  const fetchTransfers = async () => {
    if (!networkStore.blockExplorerApiUrl) {
      throw new Error("Block explorer API URL is not defined for the current network")
    }
    return await fetch(`${networkStore.blockExplorerApiUrl}/address/${account.address.value}/transfers?limit=50`)
  }

  return useQuery({
    queryKey: [
      "account",
      "transfers",
      account.address,
      () => networkStore.blockExplorerApiUrl,
    ],
    queryFn: () => fetchBlockExplorerApiAddressData<Transfer[]>(fetchTransfers)
      .then(groupByTransactionHash),
    // enabled: () => networkStore.blockExplorerApiUrl !== null,
    retry: blockExplorerApiRetry,
    refetchInterval: 2 * 60 * 1000, // 2 minutes in milliseconds
  })
}

function groupByTransactionHash(transfers: Transfer[]) {
  const transactions = transfers.reduce((acc: Record<`0x${string}`, Transfer[]>, transfer) => {
    if (isNil(transfer.transactionHash)) {
      return acc
    }

    if (isNil(acc[transfer.transactionHash])) {
      acc[transfer.transactionHash] = []
    }

    acc[transfer.transactionHash]!.push(transfer)
    return acc
  }, {} as Record<`0x${string}`, Transfer[]>)

  const filteredTransfers = Object.values(transactions).reduce((acc, transfers: Transfer[]) => {
    const transfer = transfers.find(transfer => transfer.type === "transfer")
    const depositOrWithdrawal = transfers.find(transfer => transfer.type === "withdrawal" || transfer.type === "deposit")

    if (transfer && depositOrWithdrawal) {
      if (depositOrWithdrawal.token?.l2Address === transfer.token?.l2Address
        && depositOrWithdrawal.amount === transfer.amount
        && ((depositOrWithdrawal.type === "deposit" && depositOrWithdrawal.to === transfer.to)
          || (depositOrWithdrawal.type === "withdrawal" && depositOrWithdrawal.from === transfer.from))) {
        acc.push(depositOrWithdrawal)
        return acc
      }
    }

    acc.push(...transfers)
    return acc
  }, [] as Transfer[])

  return sortBy(filteredTransfers, [ (transfer: Transfer) => -(transfer.timestamp) ])
}

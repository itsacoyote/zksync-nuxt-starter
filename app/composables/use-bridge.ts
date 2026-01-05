import { parseUnits } from "viem"

/**
 * useBridge Composable
 *
 * Provides business logic for the bridge interface, separating concerns from UI components.
 * Handles network selection, token selection, amount validation, and bridge action state.
 */
export const useBridge = () => {
  // Access connector store for wallet connection status
  const { isConnected } = storeToRefs(useConnectorStore())

  // Access bridge store for network and token state
  const bridgeStore = useBridgeStore()
  const {
    fromNetworkId,
    toNetworkId,
    transferAmount,
    networkList,
    tokenToTransfer,
    transferType,
  } = storeToRefs(bridgeStore)

  // Access fee information for validation
  const { feeInfo } = useBridgeFee()

  // Filter out the selected "from" network from the "to" network list
  // This prevents users from selecting the same network for both source and destination
  const toNetworkList = computed(() => {
    const currentFromId = fromNetworkId.value

    return networkList.value.filter(network => network.id !== currentFromId)
  })

  // Format the token balance for display
  // Returns a human-readable string like "1.245 ETH" or null if not applicable
  const formattedBalance = computed(() => {
    // Only show balance when wallet is connected
    if (!isConnected.value) {
      return null
    }

    // Ensure we have a token with a balance
    if (!tokenToTransfer.value || !tokenToTransfer.value.amount) {
      return null
    }

    // Use prettyValue utility to format the bigint amount
    const [ pretty ] = prettyValue(
      tokenToTransfer.value.amount,
      Number(tokenToTransfer.value.decimals),
      6,
    )

    return `${pretty} ${tokenToTransfer.value.symbol}`
  })

  // Determine the bridge button state based on form validation
  // Returns { message: string, disabled: boolean }
  const bridgeActionState = computed(() => {
    // Step 1: Validate token selection
    if (!tokenToTransfer.value) {
      return { message: "Select a token", disabled: true }
    }

    // Step 2: Validate transfer amount
    if (!transferAmount.value || transferAmount.value <= 0) {
      return { message: "Enter an amount", disabled: true }
    }

    // Step 3: Validate sufficient balance including fees
    // Only check if we're transferring a fee token (where fees are deducted from the same token)
    if (tokenToTransfer.value.amount && feeInfo.value.fee && transferType.value) {
      const isTransferringFeeToken
        = (transferType.value === "deposit" && tokenToTransfer.value.l1Address === L1_ETH_ADDRESS)
          || (transferType.value === "withdraw" && tokenToTransfer.value.l2Address === L2_BASE_TOKEN_ADDRESS)
          || tokenToTransfer.value.native === true

      if (isTransferringFeeToken) {
        // Parse the transfer amount to bigint for comparison
        const transferAmountBigInt = parseUnits(transferAmount.value.toString(), Number(tokenToTransfer.value.decimals))

        // Check if transfer amount + fee exceeds available balance
        const totalRequired = transferAmountBigInt + feeInfo.value.fee
        if (totalRequired > tokenToTransfer.value.amount) {
          return {
            message: "Insufficient balance for amount + fee",
            disabled: true,
          }
        }
      }
    }

    // Step 4: Validate destination network
    if (!toNetworkId.value) {
      return { message: "Select destination", disabled: true }
    }

    // Step 5: Check if transfer type is valid (computed by bridge store)
    if (transferType.value) {
      return {
        message: `${transferType.value} ${tokenToTransfer.value.symbol}`,
        disabled: false,
      }
    }

    // Fallback for invalid bridge configuration
    return { message: "Cannot bridge", disabled: true }
  })

  return {
    toNetworkList,
    formattedBalance,
    bridgeActionState,
  }
}

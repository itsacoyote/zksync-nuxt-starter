import type { Address } from "viem"
import { formatUnits, parseUnits } from "viem"

/**
 * useBridgeFee Composable
 *
 * Calculates bridge transaction fees for deposits (L1 → L2) and withdrawals (L2 → L1).
 * Provides fee estimates with 115% padding to prevent insufficient gas errors,
 * and calculates balance-adjusted amounts for quick-select percentage buttons.
 *
 * FUTURE EXTENSIBILITY:
 * - Gas limits for different transfer types can be customized in getGasLimitForTransfer()
 * - Fee calculation logic per transfer type can be extended in getFeeToken() and gas price fetching
 * - New transfer types (interop, gateway) can be added with specific logic
 */

/**
 * Configuration options for the fee composable
 * (Currently empty - refresh interval is managed by bridge store)
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @stylistic/object-curly-newline
interface UseBridgeFeeOptions {
  // Future options can be added here
// eslint-disable-next-line @stylistic/object-curly-newline
}

/**
 * Fee calculation result
 */
interface BridgeFeeInfo {
  /**
   * Estimated fee in wei (bigint) for the transaction
   */
  fee: bigint | null
  /**
   * Formatted fee string for display (e.g., "0.0042 ETH")
   */
  formattedFee: string | null
  /**
   * Symbol of the token used for fee payment (e.g., "ETH")
   */
  feeTokenSymbol: string | null
  /**
   * Amount user will receive after deducting fees (in original token units)
   */
  amountAfterFees: bigint | null
  /**
   * Formatted amount after fees for display
   */
  formattedAmountAfterFees: string | null
  /**
   * Whether the fee calculation is currently loading
   */
  isLoading: boolean
  /**
   * Error message if fee calculation failed
   */
  error: string | null
}

/**
 * Quick-select percentage amounts accounting for fees
 */
interface PercentageAmounts {
  /**
   * 25% of available balance (after fees)
   */
  quarter: bigint | null
  /**
   * 50% of available balance (after fees)
   */
  half: bigint | null
  /**
   * 75% of available balance (after fees)
   */
  threeQuarters: bigint | null
  /**
   * Maximum transferable amount (balance minus fees)
   */
  max: bigint | null
}

/**
 * Gas limit padding multiplier (115% = 1.15)
 * Applied to all gas limit estimates to ensure transactions don't fail
 */
const GAS_LIMIT_PADDING = 1.15

/**
 * Determines the appropriate gas limit for a bridge transaction
 *
 * FUTURE: This function can be extended to handle different gas limits
 * for interop, gateway, or other transfer types as requirements evolve.
 *
 * @param transferType - Type of bridge transfer
 * @param isNativeToken - Whether the token is the native token (ETH on L1, base token on L2)
 * @returns Gas limit for the transaction
 */
function getGasLimitForTransfer(transferType: "deposit" | "withdraw" | "interop" | "gateway" | null,
  isNativeToken: boolean): bigint {
  // DEPOSITS (L1 → L2)
  // Currently applies to: deposit, interop, gateway
  // FUTURE: Separate logic can be added for interop/gateway if needed
  if (transferType === "deposit" || transferType === "interop" || transferType === "gateway") {
    if (isNativeToken) {
      // ETH deposits require less gas
      return BigInt(200_000)
    } else {
      // ERC20 deposits require more gas due to contract interactions
      return BigInt(1_000_000)
    }
  }

  // WITHDRAWALS (L2 → L1)
  if (transferType === "withdraw") {
    if (isNativeToken) {
      return BigInt(200_000)
    } else {
      return BigInt(1_000_000)
    }
  }

  // Default fallback
  return BigInt(200_000)
}

/**
 * Determines which token is used to pay fees for a given transfer
 *
 * FUTURE: Can be extended to handle different fee tokens for gateway/interop transfers
 *
 * @param transferType - Type of bridge transfer
 * @param fromNetworkId - Source network ID
 * @param networkStore - Network store reference
 * @returns Fee token address and whether it's native
 */
function getFeeToken(
  transferType: "deposit" | "withdraw" | "interop" | "gateway" | null,
  fromNetworkId: number | null,
  networkStore: ReturnType<typeof useNetworkStore>,
): { address: Address, isNative: boolean } {
  if (!fromNetworkId || !transferType) {
    return { address: L1_ETH_ADDRESS as Address, isNative: true }
  }

  const fromLayer = networkStore.networkLayer(fromNetworkId)

  // DEPOSITS: Pay fees in ETH on L1
  if (transferType === "deposit" || transferType === "interop" || transferType === "gateway") {
    if (fromLayer === "L1") {
      return { address: L1_ETH_ADDRESS as Address, isNative: true }
    } else {
      // L2 → L2 or Gateway → L2: Pay fees in L2 base token
      return { address: L2_BASE_TOKEN_ADDRESS as Address, isNative: true }
    }
  }

  // WITHDRAWALS: Pay fees in L2 base token
  if (transferType === "withdraw") {
    return { address: L2_BASE_TOKEN_ADDRESS as Address, isNative: true }
  }

  // Default to ETH
  return { address: L1_ETH_ADDRESS as Address, isNative: true }
}

/**
 * Main composable for bridge fee estimation
 */
export const useBridgeFee = (_options: UseBridgeFeeOptions = {}) => {
  const bridgeStore = useBridgeStore()
  const bridgeRefreshStore = useBridgeRefreshStore()
  const {
    fromNetworkId,
    transferAmount,
    tokenToTransfer,
    transferType,
  } = storeToRefs(bridgeStore)

  // Access network store for layer detection
  const networkStore = useNetworkStore()

  // Access wagmi for gas price
  const config = useConfig()

  // Fee calculation state
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const gasPrice = ref<bigint | null>(null)
  const lastRefreshTime = ref<number>(Date.now())

  /**
   * Fetches the current gas price for the appropriate network
   */
  async function fetchGasPrice() {
    console.log(
      "[Fee] fetchGasPrice called, fromNetworkId:", fromNetworkId.value, "transferType:", transferType.value,
    )
    if (!fromNetworkId.value || !transferType.value) {
      console.log("[Fee] Returning early - missing fromNetworkId or transferType")
      return null
    }

    console.log("[Fee] Starting gas price fetch...")
    try {
      isLoading.value = true
      error.value = null

      const network = networkStore.getNetworkById(fromNetworkId.value)

      // Use wagmi's getGasPrice to fetch current gas price
      const { getGasPrice } = await import("@wagmi/core")
      const price = await getGasPrice(config, { chainId: network.id })

      console.log("[Fee] Gas price fetched successfully:", price)
      gasPrice.value = price
      lastRefreshTime.value = Date.now()
      return price
    } catch (err) {
      error.value = "Failed to fetch gas price. Please try again."
      console.error("Error fetching gas price:", err)
      return null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Calculates the estimated transaction fee
   */
  const calculatedFee = computed<bigint | null>(() => {
    if (!transferType.value || !tokenToTransfer.value || !gasPrice.value) {
      return null
    }

    // Determine if we're transferring the native token
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const feeToken = getFeeToken(
      transferType.value, fromNetworkId.value, networkStore,
    )
    const isNativeToken
      = (transferType.value === "deposit" && tokenToTransfer.value.l1Address === L1_ETH_ADDRESS)
        || (transferType.value === "withdraw" && tokenToTransfer.value.l2Address === L2_BASE_TOKEN_ADDRESS)
        || tokenToTransfer.value.native === true

    // Get base gas limit for this transfer type
    const gasLimit = getGasLimitForTransfer(transferType.value, isNativeToken)

    // Calculate fee with padding: fee = gasLimit * gasPrice * 1.15
    const baseFee = gasLimit * gasPrice.value
    const feeWithPadding = (baseFee * BigInt(Math.floor(GAS_LIMIT_PADDING * 100))) / BigInt(100)

    return feeWithPadding
  })

  /**
   * Fee information for display
   */
  const feeInfo = computed<BridgeFeeInfo>(() => {
    if (!transferType.value || !tokenToTransfer.value) {
      return {
        fee: null,
        formattedFee: null,
        feeTokenSymbol: null,
        amountAfterFees: null,
        formattedAmountAfterFees: null,
        isLoading: isLoading.value,
        error: error.value,
      }
    }

    const fee = calculatedFee.value
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const feeToken = getFeeToken(
      transferType.value, fromNetworkId.value, networkStore,
    )

    // Determine fee token symbol
    let feeTokenSymbol = "ETH"
    if (transferType.value === "withdraw"
      || (transferType.value !== "deposit" && networkStore.networkLayer(fromNetworkId.value || 0) !== "L1")) {
      // For withdrawals or L2 operations, use the actual L2 base token symbol
      // FUTURE: Fetch actual base token info from network
      feeTokenSymbol = "ETH" // This could be dynamic based on the L2 network
    }

    let formattedFee: string | null = null
    if (fee !== null) {
      // Format fee for display (assuming 18 decimals for ETH/base token)
      const feeInEther = formatUnits(fee, 18)
      formattedFee = `${Number(feeInEther).toFixed(6)} ${feeTokenSymbol}`
    }

    // Calculate amount after fees (only if transferring the fee token)
    let amountAfterFees: bigint | null = null
    let formattedAmountAfterFees: string | null = null

    if (fee !== null && transferAmount.value && transferAmount.value > 0) {
      const transferAmountBigInt = parseUnits(transferAmount.value.toString(),
        Number(tokenToTransfer.value.decimals))

      // Only calculate amount after fees if transferring the same token as fee token
      const isTransferringFeeToken
        = (transferType.value === "deposit" && tokenToTransfer.value.l1Address === L1_ETH_ADDRESS)
          || (transferType.value === "withdraw" && tokenToTransfer.value.l2Address === L2_BASE_TOKEN_ADDRESS)
          || tokenToTransfer.value.native === true

      if (isTransferringFeeToken) {
        amountAfterFees = transferAmountBigInt > fee ? transferAmountBigInt - fee : BigInt(0)
        const afterFeesFormatted = formatUnits(amountAfterFees, Number(tokenToTransfer.value.decimals))
        formattedAmountAfterFees = `${Number(afterFeesFormatted).toFixed(6)} ${tokenToTransfer.value.symbol}`
      } else {
        // If not transferring fee token, amount after fees is same as transfer amount
        amountAfterFees = transferAmountBigInt
        formattedAmountAfterFees = `${transferAmount.value} ${tokenToTransfer.value.symbol}`
      }
    }

    return {
      fee,
      formattedFee,
      feeTokenSymbol,
      amountAfterFees,
      formattedAmountAfterFees,
      isLoading: isLoading.value,
      error: error.value,
    }
  })

  /**
   * Calculate percentage amounts accounting for fees
   * Only applies when transferring the same token used for fees
   */
  const percentageAmounts = computed<PercentageAmounts>(() => {
    const nullResult: PercentageAmounts = {
      quarter: null,
      half: null,
      threeQuarters: null,
      max: null,
    }

    if (!tokenToTransfer.value?.amount || !calculatedFee.value || !transferType.value) {
      return nullResult
    }

    // Only calculate adjusted percentages if transferring the fee token
    const isTransferringFeeToken
      = (transferType.value === "deposit" && tokenToTransfer.value.l1Address === L1_ETH_ADDRESS)
        || (transferType.value === "withdraw" && tokenToTransfer.value.l2Address === L2_BASE_TOKEN_ADDRESS)
        || tokenToTransfer.value.native === true

    if (!isTransferringFeeToken) {
      // If not transferring fee token, just use regular percentages
      const balance = tokenToTransfer.value.amount
      return {
        quarter: balance / BigInt(4),
        half: balance / BigInt(2),
        threeQuarters: (balance * BigInt(3)) / BigInt(4),
        max: balance,
      }
    }

    // Calculate available balance after fees
    const totalBalance = tokenToTransfer.value.amount
    const fee = calculatedFee.value

    if (totalBalance <= fee) {
      // Not enough balance to cover fees
      return nullResult
    }

    const availableBalance = totalBalance - fee

    return {
      quarter: availableBalance / BigInt(4),
      half: availableBalance / BigInt(2),
      threeQuarters: (availableBalance * BigInt(3)) / BigInt(4),
      max: availableBalance,
    }
  })

  /**
   * Sets the transfer amount based on percentage
   */
  function setPercentageAmount(percentage: 25 | 50 | 75 | 100) {
    if (!tokenToTransfer.value) return

    let amount: bigint | null = null

    switch (percentage) {
      case 25:
        amount = percentageAmounts.value.quarter
        break
      case 50:
        amount = percentageAmounts.value.half
        break
      case 75:
        amount = percentageAmounts.value.threeQuarters
        break
      case 100:
        amount = percentageAmounts.value.max
        break
    }

    if (amount !== null) {
      const formattedAmount = formatUnits(amount, Number(tokenToTransfer.value.decimals))
      transferAmount.value = Number(formattedAmount)
    }
  }

  // Subscription cleanup function
  let unsubscribe: (() => void) | null = null

  // Subscribe to bridge store auto-refresh
  onMounted(() => {
    // Subscribe to auto-refresh cycles
    // The initial fetch will happen automatically when bridge.vue calls startAutoRefresh()
    // Wrap fetchGasPrice to match void return type expected by subscribe
    unsubscribe = bridgeRefreshStore.subscribe("gas-price", () => {
      fetchGasPrice()
    })
  })

  // Cleanup on unmount
  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  })

  // Refetch when transfer context changes
  watch([
    fromNetworkId,
    transferType,
  ], () => {
    fetchGasPrice()
  })

  return {
    feeInfo,
    percentageAmounts,
    setPercentageAmount,
    refreshFee: fetchGasPrice,
  }
}

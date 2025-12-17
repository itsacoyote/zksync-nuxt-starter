import { formatUnits } from "viem"

/**
 * Calculates and formats the USD value of a token balance.
 *
 * Converts a raw token amount (bigint) to its fiat value by:
 * 1. Converting the amount using token decimals (e.g., wei → ETH)
 * 2. Multiplying by the current token price
 * 3. Formatting with special handling for edge cases
 *
 * Formatting rules:
 * - Zero or falsy values → "$0.00"
 * - Values < $0.01 → "<$0.01" (prevents showing "$0.00" for dust amounts)
 * - All other values → Rounded down to 2 decimal places (e.g., "$123.45")
 *
 * @param amount - Raw token amount as bigint (e.g., wei for ETH, smallest unit for any token)
 * @param decimals - Token's decimal places (e.g., 18 for ETH, 6 for USDC)
 * @param price - Current fiat price per 1 whole token (e.g., 2000 for ETH at $2000)
 * @returns Formatted USD price string with $ prefix
 *
 * @example
 * tokenBalancePriceFormatted(1500000000000000000n, 18, 2.5)  // "$3.75" (1.5 ETH × $2.50)
 * tokenBalancePriceFormatted(1000000n, 6, 1.0)                // "$1.00" (1 USDC × $1.00)
 * tokenBalancePriceFormatted(100n, 18, 2000)                  // "<$0.01" (dust amount)
 * tokenBalancePriceFormatted(0n, 18, 2000)                    // "$0.00"
 */
export function tokenBalancePriceFormatted(
  amount: bigint, decimals: number, price: number,
): string {
  const balancePrice = tokenBalancePriceRaw(
    amount, decimals, price,
  )

  if (!balancePrice) {
    return "$0.00"
  } else if (balancePrice < 0.01) {
    return "<$0.01"
  }
  return "$" + (Math.floor(balancePrice * 100) / 100).toFixed(2)
}

export function tokenBalancePriceRaw(
  amount: bigint, decimals: number, price: number,
): number {
  const formattedValue = formatUnits(amount, decimals)
  return parseFloat(formattedValue) * price
}

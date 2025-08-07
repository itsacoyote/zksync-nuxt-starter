import { formatUnits } from "viem"

/**
 * Calculates and formats the fiat price of a token balance.
 *
 * Converts a token amount (in its smallest unit) to a human-readable balance using the provided decimals,
 * multiplies it by the token's fiat price, and returns a formatted string representation.
 * - Returns "$0.00" if the balance price is zero or falsy.
 * - Returns "<$0.01" if the balance price is less than $0.01.
 * - Otherwise, returns the price rounded down to two decimal places, prefixed with "$".
 *
 * @param amount - The token amount in its smallest unit (e.g., wei for ETH).
 * @param decimals - The number of decimals the token uses.
 * @param price - The fiat price per token unit.
 * @returns The formatted fiat price string.
 *
 * @example
 * ```typescript
 * // 1.5 tokens with 18 decimals, priced at $2.50 per token
 * const amount = BigInt("1500000000000000000");
 * const decimals = 18;
 * const price = 2.5;
 * const result = tokenBalancePriceFormatted(amount, decimals, price);
 * // result: "$3.75"
 * ```
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

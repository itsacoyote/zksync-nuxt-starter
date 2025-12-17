import { formatUnits } from "viem"

/**
 * Formats a blockchain token amount (bigint) into a human-readable display string.
 *
 * The function intelligently truncates decimal places and handles edge cases:
 * - For values ≥ 1: Shows up to `decimalLength` decimals, removing trailing zeros
 * - For small decimals (0.x): Truncates to `decimalLength` places with "..." if more precision exists
 * - For very tiny values that round to zero: Shows as "<0.00001" (based on decimalLength)
 *
 * @param amount - The raw token amount as a bigint (e.g., wei for ETH)
 * @param decimals - The token's decimal places (e.g., 18 for ETH, 6 for USDC)
 * @param decimalLength - Maximum decimal places to display in pretty format (default: 6)
 *
 * @returns A tuple [prettyValue, fullValue]:
 *   - `prettyValue`: Truncated, user-friendly display string
 *   - `fullValue`: Complete untruncated value string
 *
 * @example
 * prettyValue(1245000000000000000n, 18, 6) // ["1.245", "1.245"]
 * prettyValue(123456789012345678n, 18, 6)  // ["0.123456...", "0.123456789012345678"]
 * prettyValue(100n, 18, 6)                 // ["<0.000001", "0.0000000000000001"]
 * prettyValue(0n, 18, 6)                   // ["0", "0"]
 */
export function prettyValue(
  amount: bigint, decimals: number, decimalLength = 6,
): [string, string] {
  const formattedValue = formatUnits(amount, decimals)
  const [
    intPart,
    decPart = "",
  ] = formattedValue.split(".")
  const truncatedDec = decPart.slice(0, decimalLength)

  if (+intPart! > 0) {
    // 1.245, 23
    return [
      `${intPart}${/^0*$/.test(truncatedDec) ? "" : `.${truncatedDec}`}`,
      formattedValue,
    ]
  } else {
    if (truncatedDec.length < decimalLength) {
      // 0.123, 0
      return [
        `${intPart}${/^0*$/.test(truncatedDec) ? "" : `.${truncatedDec}`}`,
        formattedValue,
      ]
    }
    if (truncatedDec === "0".repeat(decimalLength)) {
      return [
        `<0.${"0".repeat(decimalLength - 1)}1`,
        formattedValue,
      ]
    } else {
      return [
        `${intPart}.${truncatedDec}${decPart.length > truncatedDec.length ? "..." : ""}`,
        formattedValue,
      ]
    }
  }
}

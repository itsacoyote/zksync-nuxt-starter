import { formatUnits } from "viem"

/**
 * Formats a bigint value into a human-readable string with truncated decimals.
 *
 * @param amount - The value to format, as a bigint.
 * @param decimals - The number of decimals the value represents.
 * @param decimalLength - The maximum number of decimal places to display (default: 6).
 * @returns A tuple containing:
 *   - The pretty-formatted value as a string, truncated to `decimalLength` decimals.
 *   - The full formatted value as a string.
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

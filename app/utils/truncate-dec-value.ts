/**
 * Truncates long decimal values for display by showing only the first and last significant digits.
 *
 * This is useful for displaying precise blockchain values (like token amounts or prices) in a
 * compact format while preserving both the most significant and least significant digits.
 *
 * Behavior:
 * - If decimal part fits within `start + end` digits → Returns unchanged
 * - If decimal part is longer → Shows first `start` digits + "..." + last `end` digits
 * - Integer part is always preserved in full
 *
 * @param amount - Numeric string to truncate (e.g., "123.456789" or "0.123456789012345678")
 * @param start - Number of decimal digits to keep from the start (default: 3)
 * @param end - Number of decimal digits to keep from the end (default: 2)
 * @returns Truncated string with ellipsis if the decimal part was shortened
 *
 * @example
 * truncateDecValue("23.8538272940178236")           // "23.853...36"
 * truncateDecValue("0.123456789012345678", 4, 4)    // "0.1234...5678"
 * truncateDecValue("123.45", 3, 2)                  // "123.45" (no truncation needed)
 * truncateDecValue("1000.123", 3, 2)                // "1000.123" (decimal fits)
 * truncateDecValue("0.000000000123456789", 6, 3)    // "0.000000...789"
 */
export function truncateDecValue(
  amount: string, start = 3, end = 2,
): string {
  const [
    intPart,
    decPart = "",
  ] = amount.split(".")

  if (decPart.length <= start + end) {
    return `${intPart}.${decPart}`
  } else {
    return `${intPart}.${decPart.slice(0, start)}...${decPart.slice(-end)}`
  }
}

/**
 * Truncates the decimal part of a numeric string, preserving a specified number of digits
 * from the start and end of the decimal portion. If the decimal part is short enough,
 * it returns the original value; otherwise, it inserts an ellipsis between the preserved digits.
 *
 * Example: 23.8538272940178236 -> 23.853...36
 *
 * @param amount - The numeric string to truncate (e.g., "123.456789").
 * @param start - Number of digits to keep from the start of the decimal part (default: 3).
 * @param end - Number of digits to keep from the end of the decimal part (default: 2).
 * @returns The truncated numeric string with ellipsis if applicable.
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

/**
 * Formats a blockchain address into a shortened display format by truncating the middle.
 *
 * @param address - The blockchain address to format (e.g., "0x1234...7890")
 * @param start - Number of characters to show after "0x" prefix (default: 3)
 * @param end - Number of characters to show at the end (default: 3)
 * @returns Shortened address string with ellipsis in the middle (e.g., "0x123...890"), or empty string if invalid
 *
 * @example
 * formatShortAddress("0x1234567890abcdef") // Returns "0x123...def"
 * formatShortAddress("0x1234567890abcdef", 4, 4) // Returns "0x1234...cdef"
 */
export const formatShortAddress = (
  address: `0x${string}` | undefined, start = 3, end = 3,
): string => {
  if (!address || typeof address !== "string") return ""
  // Ensure address starts with 0x
  const addr = address.startsWith("0x") ? address : `0x${address}`
  if (addr.length <= 8) return addr
  return `${addr.slice(0, 3)}${addr.slice(3, (start + 2))}...${addr.slice(-end)}`
}

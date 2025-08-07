export const formatShortAddress = (
  address: `0x${string}` | undefined, start = 3, end = 3,
): string => {
  if (!address || typeof address !== "string") return ""
  // Ensure address starts with 0x
  const addr = address.startsWith("0x") ? address : `0x${address}`
  if (addr.length <= 8) return addr
  return `${addr.slice(0, 3)}${addr.slice(3, (start + 2))}...${addr.slice(-end)}`
}

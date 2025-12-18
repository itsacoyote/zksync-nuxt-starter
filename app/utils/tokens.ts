/**
 * Converts an array of tokens into a lookup map keyed by L2 address.
 * Enables O(1) access to tokens by their L2 address instead of O(n) array searches.
 *
 * @param tokens - Array of Token objects to flatten
 * @returns Object mapping L2 addresses to their corresponding Token objects
 *
 * @example
 * const tokens = [
 *   { l2Address: '0x123...', symbol: 'ETH', ... },
 *   { l2Address: '0x456...', symbol: 'USDC', ... }
 * ]
 * const flattened = flattenTokensByAddress(tokens)
 * // Result: { '0x123...': { l2Address: '0x123...', symbol: 'ETH', ... }, ... }
 */
export function flattenTokensByAddress(tokens: Token[]): { [k in string]: Token } {
  return tokens.reduce<Record<string, Token>>((acc, token) => {
    acc[token.l2Address] = token
    return acc
  }, {})
}

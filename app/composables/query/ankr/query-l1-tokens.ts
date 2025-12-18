// Ankr L1 token queries are implemented inline in app/stores/bridge/tokens.ts
// following the same pattern as assetQueries to maintain consistency with the
// existing codebase architecture.
//
// The implementation:
// 1. Fetches L1 token balances from Ankr API for connected wallet
// 2. Merges balance data with deduplicated L1 tokens by l1Address
// 3. Supports Ethereum mainnet (chain ID 1) and Sepolia (chain ID 11155111)
// 4. Requires NUXT_PUBLIC_ANKR_TOKEN environment variable
//
// See app/stores/bridge/tokens.ts:137-183 for the implementation.

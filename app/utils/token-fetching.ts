import type { Config } from "@wagmi/core"
import { getBalance, readContract } from "@wagmi/core"

import { erc20Abi } from "~~/abi/erc20.abi"

import { tokenBalancePriceRaw } from "./token-balance-price"

/**
 * L1 Token Balance Result
 * Standardized format returned by both Ankr and RPC fetching methods
 */
export interface L1TokenBalance {
  contractAddress: `0x${string}` | null // null for native ETH, address for ERC20
  balance: bigint // Raw balance in smallest unit (wei for ETH)
  balanceUsd: string // USD value as string
}

/**
 * L1 Token Metadata for RPC Fetching
 * Contains the data needed to fetch balance via RPC and calculate USD value
 */
export interface L1TokenForBalance {
  l1Address: `0x${string}` // L1 contract address (or zero address for native ETH)
  decimals: string // Token decimals for conversion
  usdPrice: number // Current USD price for value calculation
}

/**
 * Fetches L1 token balances using Ankr API (batch method)
 *
 * Advantages:
 * - Single API call for all tokens
 * - Fast batch processing
 * - Returns USD values from Ankr
 *
 * Requirements:
 * - NUXT_PUBLIC_ANKR_TOKEN environment variable
 * - Supported networks: Ethereum mainnet (1), Sepolia testnet (11155111)
 *
 * @param networkId - Chain ID (1 for mainnet, 11155111 for Sepolia)
 * @param walletAddress - User's wallet address
 * @param ankrToken - Ankr API token from environment
 * @returns Array of token balances with USD values
 */
export async function fetchL1BalancesViaAnkr(
  networkId: number,
  walletAddress: string,
  ankrToken: string,
): Promise<L1TokenBalance[]> {
  // Map chain IDs to Ankr blockchain identifiers
  const NETWORK_ID_TO_ANKR: Record<number, "eth" | "eth_sepolia"> = {
    1: "eth",
    11155111: "eth_sepolia",
  }

  const ankrBlockchain = NETWORK_ID_TO_ANKR[networkId]
  if (!ankrBlockchain) return []

  // Dynamically import Ankr SDK (not needed if using RPC)
  const { AnkrProvider } = await import("@ankr.com/ankr.js")
  const ankrProvider = new AnkrProvider(`https://rpc.ankr.com/multichain/${ankrToken}`)

  // Fetch all token balances for the wallet in one API call
  const response = await ankrProvider.getAccountBalance({
    blockchain: [ ankrBlockchain ],
    walletAddress: walletAddress,
    onlyWhitelisted: false,
  })

  // Transform Ankr response to standardized format
  return response.assets.map(asset => ({
    contractAddress: asset.contractAddress
      ? (asset.contractAddress as `0x${string}`)
      : null, // Native ETH has null address in Ankr response
    balance: BigInt(asset.balanceRawInteger),
    balanceUsd: asset.balanceUsd,
  }))
}

/**
 * Fetches L1 token balances using direct RPC calls (fallback method)
 *
 * This method is used when Ankr API token is not configured. It fetches balances
 * by making individual RPC calls for each token, supporting both native ETH and ERC20.
 *
 * Advantages:
 * - No external API dependency
 * - Real-time on-chain data
 * - Works without API keys
 *
 * Trade-offs:
 * - Multiple RPC calls (one per token)
 * - Slightly slower than Ankr batch API
 * - Must calculate USD values locally
 *
 * How it works:
 * 1. For native ETH: Uses wagmi getBalance()
 * 2. For ERC20 tokens: Uses wagmi readContract() with balanceOf()
 * 3. Calculates USD values using token price from metadata
 * 4. Executes all calls in parallel with Promise.allSettled for resilience
 *
 * @param tokens - Array of L1 tokens with metadata (address, decimals, price)
 * @param walletAddress - User's wallet address
 * @param chainId - L1 chain ID
 * @param wagmiConfig - Wagmi configuration for RPC calls
 * @returns Array of token balances with calculated USD values
 */
export async function fetchL1BalancesViaRpc(
  tokens: L1TokenForBalance[],
  walletAddress: `0x${string}`,
  chainId: number,
  wagmiConfig: Config,
): Promise<L1TokenBalance[]> {
  // Create balance fetching calls for all tokens (executed in parallel)
  const balancePromises = tokens.map(async (token) => {
    try {
      // Determine if this is native ETH or an ERC20 token
      const isNativeEth = token.l1Address.toLowerCase() === L1_ETH_ADDRESS.toLowerCase()

      // Fetch balance using appropriate method
      const balance = isNativeEth
        // Native ETH: Use getBalance to query wallet's ETH balance
        ? await getBalance(wagmiConfig, {
          address: walletAddress,
          chainId,
        }).then(result => result.value)
        // ERC20: Use readContract to call balanceOf(address)
        : await readContract(wagmiConfig, {
          address: token.l1Address,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [ walletAddress ],
          chainId,
        })

      // Calculate USD value from raw balance
      // Uses token price and decimals from L2 token metadata
      const balanceUsd = balance > 0n
        ? tokenBalancePriceRaw(
          balance,
          parseInt(token.decimals),
          token.usdPrice,
        ).toString()
        : "0"

      return {
        contractAddress: isNativeEth ? null : token.l1Address, // null for ETH (matches Ankr format)
        balance,
        balanceUsd,
      }
    } catch (error) {
      // Log warning but don't fail entire operation
      // Individual token failures won't prevent other tokens from loading
      console.warn(`Failed to fetch balance for ${token.l1Address}:`, error)
      return null
    }
  })

  // Execute all balance fetches in parallel
  // Promise.allSettled ensures all calls complete even if some fail
  const results = await Promise.allSettled(balancePromises)

  // Filter successful results and remove null values (failed fetches)
  const successfulResults: L1TokenBalance[] = []
  for (const result of results) {
    if (result.status === "fulfilled" && result.value !== null) {
      successfulResults.push(result.value)
    }
  }
  return successfulResults
}

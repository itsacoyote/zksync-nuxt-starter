# CLAUDE.md

## Development Commands

Use npm for this project.

Use `npm run dev` to start the development server.

## Project Overview

This is a ZKsync Nuxt starter kit for building Web3 applications with wallet connectivity and blockchain interactions.
The project uses Nuxt 4 with Vue 3 and integrates ZKsync-specific features including SSO authentication.

## Architecture

### Core Stack

- **Framework**: Nuxt 4 with Vue 3.5
- **Web3**: Wagmi/Viem for blockchain interactions
- **Wallet**: Reown AppKit (formerly WalletConnect) for wallet connectivity
- **State Management**: Pinia stores
- **Styling**: Tailwind CSS v4 with DaisyUI components
- **UI Components**: Reka UI for headless components
- **Data Fetching**: TanStack Query (Vue Query)
- **Icons**: Fluent UI System Icons via @nuxt/icon

### Tools

- Use viem, not ethers library. When using zksync-js, use viem.
- Use wagmi otherwise

### State Management (Pinia Stores)

Located in `app/stores/`

### Auto-imports

Nuxt auto-imports from:

- `app/composables/**` (including nested directories)
- `constants/` directory
- Wagmi Vue composables (pre-configured in `nuxt.config.ts`)
- Reown AppKit composables (pre-configured in `nuxt.config.ts`)

### Component Structure

- Components are organized by domain
- Use DaisyUI first, then reka-ui for more complex UI components. Don't worry about trying to match styling, I will update styling.

### Type Definitions

Custom types in `shared/types/`

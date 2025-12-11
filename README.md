# ZKsync Nuxt Starter

A production-ready starter kit for building Web3 applications on ZKsync
using Nuxt 4, Vue 3, and modern Web3 tooling.
Features wallet connectivity via Reown AppKit, ZKsync SSO integration,
and a complete local development environment.

## Prerequisites

- **Node.js** 18+ and npm

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### 3. Connect Your Wallet

The starter includes Reown AppKit (WalletConnect v2) with support for:

- MetaMask
- WalletConnect
- Coinbase Wallet
- ZKsync SSO (on Mainnet and Sepolia)

## Local Blockchain Development

### Setup Local ZKsync Network

For testing with a local ZKsync network, set up the ZKsync OS Server:

```bash
# First time setup - downloads binaries and state files
npm run local:setup
```

This downloads:

- ZKsync OS Server binary
- Genesis configuration

### Start Local Networks

```bash
# Start both L1 (Anvil) and L2 (ZKsync OS Server)
npm run local:start
```

**Network Endpoints:**

- **L1 (Anvil)**: `http://localhost:8545`
- **L2 (ZKsync)**: `http://localhost:3050`

**Default Accounts:**

Anvil provides 10 pre-funded accounts with 10,000 ETH each. The first account is:

- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

The local network is pre-configured in the app and can be selected from the network switcher.

See [scripts/README.md](scripts/README.md) for advanced local network options.

## Project Structure

```bash
├── app/
│   ├── components/          # Vue components
│   ├── composables/         # Auto-imported composables
│   ├── pages/               # File-based routing
│   └── stores/              # Pinia stores
├── custom/
│   └── app-config.ts        # Network and wallet configuration
├── networks/
│   ├── zksync.ts            # ZKsync network definitions
│   ├── local.ts             # Local network definitions
│   └── l1.ts                # L1 network definitions
├── scripts/
│   ├── setup-zksync-local.sh   # Local network setup
│   ├── start-local.sh          # Start local networks
│   └── README.md               # Local development guide
└── shared/
    └── types/               # TypeScript types
```

## Key Features

### Web3 & Blockchain

- **Wagmi/Viem**: Modern Web3 React hooks for Vue ([docs](https://wagmi.sh/vue/getting-started))
- **Reown AppKit**: Wallet connectivity with WalletConnect v2
- **ZKsync SSO**: Seamless authentication for ZKsync networks
- **Multi-Network Support**: Mainnet, Testnet, and Local networks

### Frontend Stack

- **Nuxt 4**: Latest Nuxt with Vue 3.5
- **Tailwind CSS v4**: Utility-first CSS ([docs](https://tailwindcss.com/))
- **DaisyUI**: Beautiful component library ([docs](https://daisyui.com/))
- **Reka UI**: Headless UI components ([docs](https://reka-ui.com/))
- **Fluent Icons**: Microsoft's Fluent UI System Icons ([browse](https://icones.js.org/collection/fluent))

### Developer Experience

- **TypeScript**: Full type safety
- **Auto-imports**: Composables, components, and utilities
- **Pinia**: Intuitive state management
- **Vue Query**: Powerful data fetching with TanStack Query
- **i18n**: Multi-language support ([docs](https://i18n.nuxtjs.org/))
- **Color Mode**: Dark/light theme support ([docs](https://color-mode.nuxtjs.org/))
- **ESLint**: Code quality and consistency

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Local Networks
npm run local:setup      # Setup local ZKsync network (first time)
npm run local:start      # Start both L1 and L2
npm run local:l1         # Start L1 (Anvil) only
npm run local:l2         # Start L2 (ZKsync) only
npm run local:stop       # Stop L1 and L2

# Code Quality
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
```

## Configuration

### Network Configuration

Edit `custom/app-config.ts` to customize:

- Available network groups (Mainnet, Testnet, Local)
- Default network on app load
- SSO-enabled networks
- Wallet metadata and AppKit settings

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
# Add your environment variables here
```

## Tech Stack

### Core

- [Nuxt 4](https://nuxt.com/)
- [Vue 3.5](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

### Web3

- [Wagmi](https://wagmi.sh/vue/getting-started) - Web3 React Hooks for Vue
- [Viem](https://viem.sh/) - TypeScript Ethereum library
- [Reown AppKit](https://reown.com/appkit) - Wallet connectivity
- [ZKsync SSO](https://docs.zksync.io/zksync-sso) - ZKsync authentication

### UI & Styling

- [Tailwind CSS v4](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Reka UI](https://reka-ui.com/)
- [@nuxt/icon](https://nuxt.com/modules/icon)

### State & Data

- [Pinia](https://pinia.vuejs.org/)
- [TanStack Query (Vue Query)](https://tanstack.com/query/latest/docs/vue/overview)
- [VueUse](https://vueuse.org/)

### Nuxt Modules

- @nuxt/eslint
- @nuxt/image
- @nuxt/fonts
- @nuxtjs/seo
- @nuxtjs/i18n
- @nuxtjs/color-mode
- nuxt-svgo

## Resources

- [ZKsync Documentation](https://docs.zksync.io/)
- [ZKsync OS Server](https://github.com/matter-labs/zksync-os-server)
- [Wagmi Vue Documentation](https://wagmi.sh/vue/getting-started)
- [Nuxt 3 Documentation](https://nuxt.com/)
- [Viem Documentation](https://viem.sh/)

## License

MIT OR Apache-2.0

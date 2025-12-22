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

# Code Quality
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues
```

## Configuration

### Network Configuration

Edit `app-configuration/app-config.ts` to customize:

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
- [Wagmi Vue Documentation](https://wagmi.sh/vue/getting-started)
- [Nuxt 3 Documentation](https://nuxt.com/)
- [Viem Documentation](https://viem.sh/)

## License

MIT OR Apache-2.0

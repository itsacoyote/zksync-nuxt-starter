import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxtjs/seo",
    "@nuxtjs/i18n",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/fonts",
    "nuxt-svgo",
    "@vueuse/nuxt",
    "reka-ui/nuxt",
    "@nuxt/scripts",
    "@nuxt/hints",
  ],
  imports: {
    dirs: [
      "constants",
      "composables/**",
    ],
    presets: [
      {
        from: "@reown/appkit/vue",
        imports: [
          "useAppKit",
          "useAppKitAccount",
          "useAppKitNetwork",
          "useAppKitState",
          "useAppKitTheme",
          "useAppKitEvents",
          { name: "useDisconnect", as: "useAppKitDisconnect" },
          "useWalletInfo",
          "useAppKitProvider",
        ],
      },
      {
        from: "@wagmi/vue",
        imports: [
          "useAccount",
          "useAccountEffect",
          "useBalance",
          "useBlockNumber",
          "useBytecode",
          "useChainId",
          "useChains",
          "useClient",
          "useConfig",
          "useConnect",
          "useConnections",
          "useConnectorClient",
          "useConnectors",
          "useDisconnect",
          "useEnsAddress",
          "useEnsAvatar",
          "useEstimateGas",
          "useReadContract",
          "useReconnect",
          "useSendTransaction",
          "useSignMessage",
          "useSignTypedData",
          "useSimulateContract",
          "useSwitchAccount",
          "useSwitchChain",
          "useTransaction",
          "useTransactionReceipt",
          "useWaitForTransactionReceipt",
          "useWatchBlockNumber",
          "useWatchContractEvent",
          "useWriteContract",
        ],
      },
    ],
  },
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        {
          rel: "icon", type: "img/png", sizes: "96x96", href: "/favicon-96x96.png",
        },
        {
          rel: "icon", type: "image/svg+xml", href: "/favicon.svg",
        },
        {
          rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png",
        },
      ],
    },
  },
  css: [
    "~/assets/css/tailwind.css",
    "~/assets/css/light-theme.css",
    "~/assets/css/dark-theme.css",
  ],
  colorMode: {
    classPrefix: "",
    classSuffix: "",
    dataValue: "theme",
  },

  runtimeConfig: { public: { reownProjectId: "", ankrToken: "" } },
  build: { transpile: [ "@nuxt/hints" ] },
  compatibilityDate: "2025-07-15",

  vite: { plugins: [ tailwindcss() ] },

  eslint: { config: { stylistic: true } },
  fonts: {
    provider: "google", families: [{ name: "Inria Sans", provider: "google" }], defaults: {
      weights: [
        300,
        400,
        700,
      ],
    },
  },
  // https://i18n.nuxtjs.org/docs/getting-started/usage
  // https://nuxtseo.com/docs/site-config/guides/i18n
  i18n: {
    baseUrl: "https://web3.xyz",
    defaultLocale: "en",
    locales: [
      {
        code: "en", name: "English", file: "en.json",
      },
    ],
  },

  pinia: { storesDirs: [ "./app/stores/**" ] },

  robots: {
    disallow: [ "/kitchen-sink" ],
    groups: [
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
        ], disallow: [ "/kitchen-sink" ],
      },
    ],
  },
  svgo: { autoImportPath: "./assets/svg/" },
})

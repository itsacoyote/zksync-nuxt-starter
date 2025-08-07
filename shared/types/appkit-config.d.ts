interface AppKitConfig {
  enableNetworkSwitch?: false
  enableWalletGuide?: false
  enableWalletConnect?: boolean
  featuredWalletIds?: string[]
  features: {
    swaps?: false
    onramp?: false
    socials?: false | SocialProvider[] | undefined
    email?: boolean
    analytics?: boolean
    connectMethodsOrder?: ConnectMethod[]
  }
  themeVariables: { [k in string]?: string | number }
}

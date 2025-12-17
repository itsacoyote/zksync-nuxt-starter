<!-- eslint-disable @stylistic/max-len -->
<template>
  <div>
    <LayoutPageHeader>
      {{ $t("networks.header") }}
    </LayoutPageHeader>

    <UiSection
      v-for="(networkGroup) in networkStore.networkGroups"
      :key="networkGroup.name"
    >
      <UiCard>
        <template #title>
          {{ networkGroup.name }}
          <em
            v-if="networkGroup.hidden"
            class="text-base-content/60"
          >(hidden)</em>
        </template>

        <ul class="list">
          <li
            v-for="(network) in networkGroup.networks"
            :key="network.id"
            class="list-row flex md:flex-row flex-col"
          >
            <div class="mr-4">
              <div>
                <strong>ID:</strong> {{ network.id }}
                <em v-if="network.testnet">Testnet</em>
              </div>
              <div>
                <strong>Name:</strong> {{ network.name }}
              </div>
              <div>
                <strong>Native Currency:</strong>
                {{ network.nativeCurrency.name }} |
                {{ network.nativeCurrency.symbol }} |
                {{ network.nativeCurrency.decimals }} decimals
              </div>
              <div>
                <strong
                  v-if="network.nativeTokenBridgingOnly"
                  class="text-orange-700"
                >Native token bridging only</strong>
              </div>
              <div />
            </div>
            <div>
              <div>
                <strong>Block Explorer URL: </strong>
                <div>
                  <UiLink
                    target="_blank"
                    class="underline text-blue-700"
                    :href="network.blockExplorers.default?.url ?? '/#'"
                  >
                    {{ network.blockExplorers.default?.url ?? 'undefined' }}
                  </UiLink>
                </div>
              </div>
              <div>
                <strong>RPC Urls: </strong>
                <div
                  v-for="(url, index) in network.rpcUrls.default.http"
                  :key="index"
                >
                  {{ url }}
                </div>
              </div>
            </div>
            <div
              v-if="typeof network.l1Network === 'object'"
              class="ml-4"
            >
              <div><strong>Id: </strong>{{ network.l1Network.id }}</div>
              <div><strong>L1:</strong> {{ network.l1Network.name }}</div>
              <div>
                <strong>Block Explorer URL:</strong> <UiLink
                  target="_blank"
                  class="underline text-blue-700"
                  :href="network.l1Network.blockExplorers.default?.url ?? '/#'"
                >
                  {{ network.l1Network.blockExplorers.default?.url ?? "undefined" }}
                </UiLink>
              </div>
            </div>
          </li>
        </ul>
      </UiCard>
    </UiSection>
  </div>
</template>

<script setup lang="ts">
const networkStore = useNetworkStore()
</script>

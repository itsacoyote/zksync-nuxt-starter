<template>
  <div class="navbar">
    <div class="navbar-start">
      <NuxtLink
        class="px-4"
        href="/"
      >
        <svgo-generic-logo
          class="fill-black dark:fill-white text-5xl !m-0"
        />
      </NuxtLink>
      <ul class="menu menu-horizontal">
        <li><NuxtLink href="/transactions">{{ $t('navigation.transactions') }}</NuxtLink></li>
        <li><NuxtLink href="/transfers">{{ $t('navigation.transfers') }}</NuxtLink></li>
        <li><NuxtLink href="/assets">{{ $t('navigation.assets') }}</NuxtLink></li>
      </ul>
    </div>
    <div class="navbar-end">
      <LayoutColorModeButton class="mr-2" />
      <AccountDropdown />
    </div>
  </div>
</template>

<script setup lang="ts">
// const mobileMenu = ref<boolean>(false)
</script>

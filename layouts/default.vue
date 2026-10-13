<template>
  <div class="layout">
    <MainHeader
      :isDark="isDark"
      @update:isDark="isDark = $event"
    />
    <main class="main">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<script setup>
const isDark = useCookie('is-dark', {
  default: () => true,
})

useHead({ htmlAttrs: { class: () => (isDark.value ? '' : 'theme-light') } })
</script>

<style scoped lang="scss">
.layout {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100dvh;
}

.main {
  padding-block: 20px;
}
</style>

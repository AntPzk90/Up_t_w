<template>
  <img
    class="logo"
    src="~/assets/nuxt-js-logo.svg"
    alt="Nuxt logo"
    :width="size"
    :height="size"
  />
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 40,
  },
})
</script>

<style scoped lang="scss">
.logo {
  flex-shrink: 0;
}
</style>

<template>
  <header class="header">
    <div class="header__wrapper">
      <BaseLogo />
      <ThemeSwitcher
        :isDark="isDark"
        @update:isDark="emit('update:isDark', $event)"
      />
    </div>
  </header>
</template>

<script setup>
defineProps({
  isDark: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['update:isDark'])
</script>

<style scoped lang="scss">
.header {
  min-height: 60px;
  color: $color-text;
  background: $color-header;
  border-bottom: 1px solid $color-border;
  border-radius: 0 0 16px 16px;
  transition:
    background $transition-time,
    color $transition-time,
    border-color $transition-time;

  @include respond-to($bp-tablet) {
    min-height: 80px;
  }

  &__wrapper {
    @include container;

    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: inherit;
  }
}
</style>

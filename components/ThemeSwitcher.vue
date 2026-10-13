<template>
  <input
    class="switch"
    type="checkbox"
    role="switch"
    aria-label="Dark theme"
    :checked="isDark"
    @change="emit('update:isDark', $event.target.checked)"
  />
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
$width: 44px;
$height: 24px;
$gap: 3px;
$thumb-size: $height - $gap * 2;

.switch {
  position: relative;
  flex-shrink: 0;
  width: $width;
  height: $height;
  appearance: none;
  cursor: pointer;
  background: $color-secondary;
  border-radius: $height * 0.5;
  transition: background $transition-time;

  &::before {
    position: absolute;
    top: $gap;
    left: $gap;
    width: $thumb-size;
    height: $thumb-size;
    content: '';
    background: $color-text-muted;
    border-radius: 50%;
    transition:
      background $transition-time,
      transform $transition-time;
  }

  &:hover {
    background: $color-secondary-hover;
  }

  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
  }

  &:checked {
    background: $color-primary;

    &::before {
      background: $color-primary-text;
      transform: translateX($width - $height);
    }

    &:hover {
      background: $color-primary-hover;
    }
  }
}
</style>

<template>
  <span
    class="sort-arrow"
    aria-hidden="true"
  >
    <span
      class="arrow arrow--top-direction"
      :class="{ 'arrow--active': type === SORT_DIRECTIONS.ASC }"
    ></span>
    <span
      class="arrow arrow--bottom-direction"
      :class="{ 'arrow--active': type === SORT_DIRECTIONS.DESC }"
    ></span>
  </span>
</template>

<script setup>
import { SORT_DIRECTIONS } from '~/constants'

defineProps({
  type: String,
})
</script>

<style scoped lang="scss">
.sort-arrow {
  display: inline-flex;
  flex-direction: column;
  gap: 3px;
  margin-inline-start: 6px;
  vertical-align: middle;
}

.arrow {
  width: 0;
  height: 0;
  color: $color-text-muted;
  border-inline: 5px solid transparent;
  opacity: 0.5;
  transition:
    color $transition-time,
    opacity $transition-time;

  &--top-direction {
    border-bottom: 6px solid currentColor;
  }

  &--bottom-direction {
    border-top: 6px solid currentColor;
  }

  &--active {
    color: $color-primary;
    opacity: 1;
  }
}
</style>

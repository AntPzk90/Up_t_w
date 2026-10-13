<template>
  <div class="filters">
    <input
      class="filters__input input"
      :value="search"
      @input="$emit('update:search', $event.target.value)"
      placeholder="Search by name or email"
    />

    <BaseSelect
      :model-value="role"
      @update:model-value="$emit('update:role', $event)"
      :options="Object.values(ROLES)"
    />

    <BaseSelect
      :model-value="perPage"
      @update:model-value="$emit('update:perPage', $event)"
      :options="PER_PAGE_OPTIONS"
    />
  </div>
</template>

<script setup>
import { ROLES, PER_PAGE_OPTIONS } from '@/constants'

defineProps({
  search: String,
  role: String,
  perPage: Number,
})

defineEmits(['update:search', 'update:role', 'update:perPage'])
</script>

<style scoped lang="scss">
.filters {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: space-between;
  max-width: $content-max-width-mobile;
  padding-block: 12px;
  padding-inline: 2px;
  margin-inline: auto;
  background: $color-body;
  border-radius: 4px;
  transition: background $transition-time;

  @include respond-to($bp-tablet) {
    max-width: $content-max-width;
  }

  &__input {
    flex-grow: 1;
    width: 100%;
    padding: 8px;
    color: $color-text;
    background: $color-secondary;
    border-radius: 4px;
    transition:
      background $transition-time,
      color $transition-time,
      border-color $transition-time;

    &::placeholder {
      color: $color-text-muted;
      transition: color $transition-time;
    }
  }
}
</style>

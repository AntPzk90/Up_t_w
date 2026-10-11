<template>
  <div class="filters">
    <input
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

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
</style>

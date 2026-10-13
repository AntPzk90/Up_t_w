<template>
  <select
    v-model="model"
    class="select"
  >
    <option :value="null">All</option>
    <option
      v-for="option in options"
      :key="option"
      :value="option"
    >
      {{ option }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
})

const model = defineModel()
</script>

<style scoped lang="scss">
.select {
  flex-grow: 1;
  padding: 8px;
  padding-inline-end: 12px;
  color: $color-secondary-text;
  background: $color-secondary;
  border-radius: 4px;
}
</style>

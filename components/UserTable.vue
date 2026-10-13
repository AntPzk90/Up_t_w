<template>
  <p class="text-info">The table can be scrolled by swiping.</p>
  <div class="table">
    <table class="table__main">
      <thead class="table__head">
        <tr class="table__row table__row--head">
          <th class="table__head-item table__head-item--name">Name</th>
          <th class="table__head-item table__head-item--email">Email</th>

          <th
            class="table__head-item table__head-item--age"
            @click="$emit('sort', 'age')"
          >
            Age
            <SortArrow
              :type="sortBy === 'age' ? sortDirection : null"
            ></SortArrow>
          </th>

          <th class="table__head-item table__head-item--role">Role</th>

          <th
            class="table__head-item table__head-item--date"
            @click="$emit('sort', 'createdAt')"
          >
            Created
            <SortArrow
              :type="sortBy === 'createdAt' ? sortDirection : null"
            ></SortArrow>
          </th>
        </tr>
      </thead>

      <tbody class="table__body">
        <tr
          v-for="user in users"
          :key="user.id"
          class="table__row"
        >
          <td class="table__item table__item--name">
            <span class="table__text">{{ user.name }}</span>
          </td>
          <td class="table__item table__item--email">
            <span class="table__text">{{ user.email }}</span>
          </td>
          <td class="table__item table__item--age">
            <span class="table__text">{{ user.age }} </span>
          </td>
          <td class="table__item table__item--role">
            <span class="table__text">{{ user.role }}</span>
          </td>
          <td class="table__item table__item--date">
            <span class="table__text"
              >{{ new Date(user.createdAt).toLocaleDateString('uk-UA') }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    required: true,
  },
  sortBy: {
    type: String,
  },
  sortDirection: {
    type: String,
  },
})

defineEmits(['sort'])
</script>

<style scoped lang="scss">
.text-info {
  margin-bottom: 12px;
  font-size: 14px;
  color: $color-secondary-text;
  text-align: center;
  transition: color $transition-time;

  @include respond-to($bp-tablet) {
    display: none;
  }
}

.table {
  max-width: $table-max-width-mobile;
  min-height: $content-min-height;
  max-height: calc(100dvh - 340px);
  margin-inline: auto;
  overflow-x: auto;
  overflow-y: auto;

  @include respond-to($bp-tablet) {
    max-width: $content-max-width;
    min-height: $content-min-height-tablet;
    max-height: none;
    overflow: visible;
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: $color-secondary;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: $color-primary;
    border-radius: 3px;

    &:hover {
      background: $color-primary-hover;
    }
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  // Firefox 
  @supports not selector(::-webkit-scrollbar) {
    scrollbar-color: $color-primary $color-secondary;
    scrollbar-width: thin;
  }

  &__main {
    width: $table-width;
    margin-inline: auto;
    table-layout: fixed;
    border-spacing: 0;
    border-collapse: separate;
  }

  &__head {
    font-size: 16px;

    @include respond-to($bp-tablet) {
      font-size: 18px;
    }

    @include respond-to($bp-desktop) {
      font-size: 20px;
    }
  }

  &__row {
    font-size: 14px;

    @include respond-to($bp-tablet) {
      font-size: 16px;
    }

    @include respond-to($bp-desktop) {
      font-size: 18px;
    }
  }

  &__head-item,
  &__item {
    @include truncate;

    padding: 6px 12px;

    text-align: center;

    &--name {
      width: 170px;
    }

    &--email {
      width: 240px;
    }

    &--age {
      width: 80px;
    }

    &--role {
      width: 110px;
    }

    &--date {
      width: 128px;
    }
  }

  &__head-item {
    position: sticky;
    top: 0;
    z-index: 1;
    color: $color-text;
    background: $color-table-head;
    transition:
      background $transition-time,
      color $transition-time;

    @include respond-to($bp-tablet) {
      top: $filters-height;
    }

    &--age,
    &--date {
      cursor: pointer;

      &:hover {
        color: $color-primary;
      }

      &:active {
        color: $color-primary-active;
      }
    }
  }

  &__item {
    color: $color-text;
    background: $color-table-cell;
    border-bottom: 1px solid $color-border;
    transition:
      background $transition-time,
      color $transition-time,
      border-color $transition-time;

    &:first-child {
      border-left: 1px solid $color-border;
    }

    &:last-child {
      border-right: 1px solid $color-border;
    }

    .table__row:last-child &:first-child {
      border-bottom-left-radius: 4px;
    }

    .table__row:last-child &:last-child {
      border-bottom-right-radius: 4px;
    }
  }
}
</style>

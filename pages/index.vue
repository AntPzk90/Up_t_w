<template>
  <div class="container">
    <UserFilters
      :search="search"
      :role="role"
      :perPage="perPage"
      @update:search="search = $event"
      @update:role="role = $event"
      @update:perPage="perPage = $event"
    />

    <UserTable
      :users="paginatedUsers"
      @sort="onSort"
      :sortBy="sortBy"
      :sortDirection="sortDirection"
      v-if="paginatedUsers.length"
    />

    <div
      class="not-found"
      v-else
    >
      {{ 'Oops... Not found users :(' }}
    </div>

    <div class="pagination">
      <button
        class="pagination__button button button--primary"
        @click="page--"
        :disabled="page === 1"
      >
        Prev
      </button>

      <span class="pagination__pages">{{ page }} / {{ totalPages }}</span>

      <button
        class="pagination__button button button--primary"
        @click="page++"
        :disabled="page === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { users } from '@/data/users'
import { useUsersTable } from '@/composables/useUsersTable'
import { SORT_DIRECTIONS } from '@/constants'

const {
  search,
  role,
  sortBy,
  sortDirection,
  page,
  perPage,
  paginatedUsers,
  totalPages,
} = useUsersTable(users)

function onSort(field) {
  if (sortBy.value === field) {
    sortDirection.value =
      sortDirection.value === SORT_DIRECTIONS.ASC
        ? SORT_DIRECTIONS.DESC
        : SORT_DIRECTIONS.ASC
  } else {
    sortBy.value = field
    sortDirection.value = SORT_DIRECTIONS.ASC
  }
}
</script>

<style scoped lang="scss">
.container {
  @include container;
}

.pagination {
  @include flex-center;

  gap: 8px;
  margin-top: 12px;

  &__pages {
    min-width: 42px;
    text-align: center;
  }
}

.not-found {
  @include flex-center;

  min-height: $content-min-height;
  margin-inline: auto;
  font-size: 32px;
  text-align: center;

  @include respond-to($bp-tablet) {
    max-width: $content-max-width;
    min-height: $content-min-height-tablet;
  }
}
</style>

import {
  SORT_DIRECTIONS,
  ROLES,
  PER_PAGE_OPTIONS,
  DEFAULT_PER_PAGE,
} from '@/constants'
import type { UserT, SortByT } from '@/types'

export function useUsersTable(users: UserT[]) {
  const router = useRouter()
  const route = useRoute()

  // filters
  const search = ref(String(route.query.search ?? ''))

  const debouncedSearch = useDebouncedRef(search)

  const queryRole = String(route.query.role)

  const role = ref<string | null>(
    Object.values(ROLES).includes(queryRole) ? queryRole : null,
  )

  // sorting
  const querySortBy = String(route.query.sortBy)

  const sortBy = ref<SortByT>(
    querySortBy === 'age' || querySortBy === 'createdAt' ? querySortBy : null,
  )

  const querySortDirection = String(route.query.sortDirection)

  const sortDirection = ref(
    Object.values(SORT_DIRECTIONS).includes(querySortDirection)
      ? querySortDirection
      : SORT_DIRECTIONS.ASC,
  )

  // pagination
  const queryPage = Number(route.query.page)

  const page = ref(
    Number.isInteger(queryPage) && queryPage >= 1 ? queryPage : 1,
  )

  const queryPerPage = Number(route.query.perPage)

  // null means "All": no pagination, stored in the URL as perPage=all
  const perPage = ref(
    route.query.perPage === 'all'
      ? null
      : PER_PAGE_OPTIONS.includes(queryPerPage)
        ? queryPerPage
        : DEFAULT_PER_PAGE,
  )

  // derived lists, search matches name or email, case-insensitive
  const filteredUsers = computed(() => {
    const query = debouncedSearch.value.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)

      const matchesRole = !role.value || user.role === role.value

      return matchesSearch && matchesRole
    })
  })

  // sorts a copy, the source array is never mutated
  const sortedUsers = computed(() => {
    if (sortBy.value === null) return filteredUsers.value

    const sortKey = sortBy.value
    return [...filteredUsers.value].sort((a, b) => {
      const result =
        a[sortKey] > b[sortKey] ? 1 : a[sortKey] < b[sortKey] ? -1 : 0
      return sortDirection.value === SORT_DIRECTIONS.ASC ? result : -result
    })
  })

  // at least 1, so an empty result shows "1 / 1"
  const totalPages = computed(() => {
    if (!perPage.value) return 1 // when "All" is selected

    return Math.max(1, Math.ceil(sortedUsers.value.length / perPage.value))
  })

  // current page of the sorted list
  const paginatedUsers = computed(() => {
    if (!perPage.value) return sortedUsers.value

    const start = (page.value - 1) * perPage.value
    const end = start + perPage.value

    return sortedUsers.value.slice(start, end)
  })

  // side effects
  // reset to the first page when filters or sorting change
  watch([debouncedSearch, role, perPage, sortBy, sortDirection], () => {
    page.value = 1
  })

  // write the state to the URL, default values are left out
  watch([debouncedSearch, role, sortBy, sortDirection, perPage, page], () => {
    router.replace({
      query: {
        ...route.query,
        search: debouncedSearch.value || undefined,
        role: role.value || undefined,
        sortBy: sortBy.value || undefined,
        sortDirection: sortBy.value ? sortDirection.value : undefined,
        perPage:
          perPage.value === DEFAULT_PER_PAGE
            ? undefined
            : (perPage.value ?? 'all'),
        page: page.value === 1 ? undefined : page.value,
      },
    })
  })

  // go to the last page if the current one no longer exists
  watch(
    totalPages,
    (total) => {
      if (page.value > total) page.value = total
    },
    { immediate: true },
  )

  return {
    search,
    role,
    sortBy,
    sortDirection,
    page,
    perPage,
    paginatedUsers,
    totalPages,
  }
}

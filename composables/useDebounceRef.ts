import type { Ref } from 'vue'

export function useDebouncedRef(source: Ref<string>, delay = 400) {
  const debounced = ref(source.value)

  watch(source, (value, _oldValue, onCleanup) => {
    const timer = setTimeout(() => {
      debounced.value = value
    }, delay)

    onCleanup(() => clearTimeout(timer))
  })

  return debounced
}

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('counter', () => {
  const theme = ref('#f8afa6')
  const setTheme = (value) => {
    theme.value = value
  }

  return { theme, setTheme }
})

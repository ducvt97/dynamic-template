<template>
  <header :style="{ backgroundColor: theme, color: textColor }">
    <v-breadcrumbs :items="paths" class="align-start">
      <template v-slot:title="{ item }">
        <RouterLink :to="item.href" class="text-capitalize" :style="{ color: textColor }">
          {{ item.title }}
        </RouterLink>
      </template>
      <template v-slot:divider>></template>
    </v-breadcrumbs>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useThemeStore } from '@/stores/theme'
import { getContrastColor } from '@/utils'

const defaultPath = { title: 'Colors', disabled: false, href: '/' }

// Store
const { theme } = storeToRefs(useThemeStore())

// State
const route = useRoute()

// Computed
const textColor = computed(() => getContrastColor(theme.value))

const paths = computed(() => {
  let splitPaths = route.path.split('/')
  splitPaths = splitPaths.map((path) => {
    return { title: path.replace('-', ' '), disabled: false, href: path }
  })
  // Last path is always the current page and should be disabled
  splitPaths.at(-1).disabled = true

  return [defaultPath, ...splitPaths.slice(1)]
})
</script>

<style scoped>
header {
  position: absolute;
  padding-top: 24px;
  width: 100%;
  height: 430px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  background: url('@/assets/images/foreground/foreground.png') no-repeat center;
}
</style>

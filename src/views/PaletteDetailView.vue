<template>
  <div class="container">
    <ImageViewBox :combination="combination" />
    <div class="w-100 mt-12">
      <h2 class="text-center mb-5">Related Combinations</h2>
      <div class="related-combinations">
        <RouterLink :to="`/${item.slug}`" v-for="item in relatedCombinations" class="palette-box">
          <div
            v-for="color in item.colors"
            class="palette-box__color"
            :style="{ backgroundColor: color }"
          />
        </RouterLink>
        <v-btn variant="tonal" height="75" class="flex-grow-1" flat @click="onLoadMore">
          See more combinations
        </v-btn>
      </div>
    </div>
    <h2 class="text-center mt-12 mb-3">
      Use this color template and create beautiful designs and documents!
    </h2>
    <RouterLink to="/" class="mx-auto">
      <v-btn variant="flat" :color="themeStore.theme" flat>
        <span :style="{ color: btnTextColor }">Browse templates</span>
      </v-btn>
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, provide, computed, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import ImageViewBox from '@/components/ImageViewBox.vue'
import { getCombinationById, getMoreRelatedCombinations } from '@/services/combination'
import { useThemeStore } from '@/stores/theme'
import { getContrastColor } from '@/utils'

// Store
const themeStore = useThemeStore()

// Query
const route = useRoute()
const combinationId = ref(route.params.id ?? '')

// State
const combination = ref({})
const relatedCombinations = ref({})

// Computed
const btnTextColor = computed(() => getContrastColor(themeStore.theme))

// Lifecycle
const fetchCombination = () => {
  if (!combinationId.value) {
    console.error('Combination ID is not provided')
    return
  }
  const res = getCombinationById(combinationId.value)
  if (!res) {
    console.error('Combination not found')
    return
  }
  combination.value = res.combination
  relatedCombinations.value = res.relatedCombinations

  // Set theme with current palette color
  themeStore.setTheme(combination.value.color.hex)
}

onBeforeMount(() => {
  fetchCombination()
})

// Watcher
watch(
  () => route.params.id,
  (id) => {
    combinationId.value = id
    fetchCombination()
    // console.log(combination.value.featuredImage)
  },
  { immediate: true }
)

// Methods
const onSelectPalette = (palette) => {
  palette.forEach((color, index) => {
    combination.value.colors[index].hex = color
  })
}

const onLoadMore = () => {
  const resRelatedCombinations = getMoreRelatedCombinations()
  relatedCombinations.value.push(...resRelatedCombinations)
}

const onPickColor = (color, index) => {
  if (!color || isNaN(index) || index > 3) return
  combination.value.colors[index].hex = color
}

// Provide
provide('onPickColor', onPickColor)
</script>

<style scoped>
.related-combinations {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  place-items: center;
}
.palette-box {
  width: calc(50% - 20px);
  height: 75px;
  display: flex;
  cursor: pointer;
  .palette-box__color {
    width: 25%;
  }
}
</style>

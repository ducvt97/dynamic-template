<template>
  <div class="container">
    <h1>Checkout our current palettes</h1>
    <ul>
      <li v-for="combination in combinations">
        <RouterLink :to="`/${combination.slug}`">
          {{ combination.name }}
        </RouterLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { getAllCombinations } from '@/services/combination'

// State
const combinations = ref([])

// Lifecycle
onBeforeMount(() => {
  combinations.value = getAllCombinations()
})
</script>

<style scoped>
h1 {
  font-size: 30px;
  margin-top: 60px;
  margin-bottom: 20px;
}
ul {
  font-size: 20px;
  line-height: 2;
}
</style>

<template>
  <Header />
  <div class="block"></div>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<style scoped>
.block {
  display: block;
  height: 120px;
}
</style>

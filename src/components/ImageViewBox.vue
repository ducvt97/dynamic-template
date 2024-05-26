<template>
  <div class="img-container">
    <v-btn
      class="btn-like"
      :prepend-icon="combination.liked ? 'mdi-heart' : 'mdi-heart-outline'"
      readonly
    >
      <template v-slot:prepend>
        <v-icon :color="combination.liked ? 'pink' : 'darkgray'"></v-icon>
      </template>
      {{ combination.likes }}
    </v-btn>
    <h1 class="text-center mb-16">{{ combination.name }}<br />color combination</h1>
    <img :src="imageUrl" :alt="combination.featuredImage.alt" />
    <div class="palette-container">
      <palette-box
        v-for="(item, index) in combination.colors"
        :color="item.hex"
        :name="item.name"
        :index="index"
        :key="index"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, toRefs } from 'vue'
import PaletteBox from '@/components/PaletteBox.vue'

// Props
const props = defineProps({
  combination: {
    liked: { type: Boolean, default: false },
    id: { type: Number, default: 0 },
    slug: { type: String, default: '' },
    color: {
      slug: { type: String, default: '' },
      hex: { type: String, default: '' },
      name: { type: String, default: '' }
    },
    featuredImage: {
      alt: { type: String, default: '' },
      url: { type: String, default: '' }
    },
    name: { type: String, default: '' },
    likes: { type: Number, default: 0 },
    colors: Array({
      slug: { type: String, default: '' },
      hex: { type: Number, default: 0 },
      name: { type: Number, default: 0 }
    })
  }
})
const { combination } = toRefs(props)

const imageUrl = computed(
  () =>
    new URL(`/src/assets/images/thumbnails/${combination.value.featuredImage.url}`, import.meta.url)
      .href
)
</script>

<style scoped>
.img-container {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  img {
    border-radius: 8px 8px 0 0;
  }
  .palette-container {
    display: flex;
  }
}
.btn-like {
  position: absolute;
  top: 176px;
  right: 16px;
}
</style>

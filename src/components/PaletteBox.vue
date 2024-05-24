<template>
  <div class="palette-box">
    <div
      class="palette-color"
      :style="{ backgroundColor: color, color: getContrastColor(color) }"
      @mouseover="isHovering = true"
      @mouseleave="isHovering = false"
      @click="copyColor"
    >
      <div v-if="isHovering && !isCopied" class="text-subtitle-1">Copy</div>
      <div v-if="isCopied" class="text-h5">&check;</div>
    </div>
    <v-menu top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <div class="mt-2 text-center cursor-pointer" v-bind="props">
          <span class="font-weight-medium text-decoration-underline">{{ name }}</span>
          <br />
          <span class="text-caption">{{ color }}</span>
        </div>
      </template>
      <v-card>
        <v-card-text class="pa-0">
          <v-color-picker :model-value="color" mode="hex" @update:model-value="updateColor" />
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
import { getContrastColor } from '@/utils'
import { ref } from 'vue'
import { inject } from 'vue'

// Props
const { color, index } = defineProps({
  color: {
    type: String,
    default: '#000000'
  },
  name: {
    type: String,
    default: 'Black'
  },
  index: {
    type: Number,
    default: 0
  }
})

// State
const isHovering = ref(false)
const isCopied = ref(false)

// Methods
const updateColor = (value) => {
  onPickColor(value, index)
}

const copyColor = () => {
  navigator.clipboard.writeText(color)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2500)
}

// Inject
const onPickColor = inject('onPickColor')
</script>

<style scoped>
.palette-box {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  .palette-color {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  &:first-child {
    .palette-color {
      border-bottom-left-radius: 8px;
    }
  }
  &:last-child {
    .palette-color {
      border-bottom-right-radius: 8px;
    }
  }
}
</style>

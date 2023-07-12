<template>
  <a :href="item.href">
    <div :class="['thumb-wrapper', { bigger: bigger }]">
      <img :src="item.src" />
      <div class="c-text">
        <p>{{ filters.slice(item.title) }}</p>
        <p class="grey-text">{{ formatDuration }} ({{ item.year }})</p>
      </div>
    </div>
  </a>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { computed } from 'vue'
import filters from '../utils/filters'

// ==============================
// Props
// ==============================
const props = defineProps({
  item: Object, // title, year, srsc, href, duration
  bigger: Boolean
})

const formatDuration = computed(() => `${props.item.duration.mm}:${props.item.duration.ss}`)
</script>

<style lang="scss" scoped>
.thumb-wrapper {
  display: inline-block;
  overflow: hidden;
  margin: 0 0.8rem;
  width: 45rem;
  cursor: pointer;
  &.bigger {
    width: 65rem;
  }
  img {
    width: 100%;
  }
}
</style>

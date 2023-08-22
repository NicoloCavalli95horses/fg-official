<template>
  <iframe :src="src" class="iframe" loading="lazy" :style="size" />
</template>

<script setup>
//==================================
// Import
//==================================
import { computed } from 'vue'
import { getViewport } from '../utils/screen_size.js';


//==================================
// Consts
//==================================
defineProps({
  src: String,
})

const device = getViewport();
const size = computed( () => {
  if ( device.value == 'mobile' ) {
    return { width: '30rem' }
  } 
  return { width: '45rem', height: '40rem' }
});

</script>

<style lang="scss" scoped>
  .iframe {
    border: none;
  }
</style>

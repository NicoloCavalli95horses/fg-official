<template>
  <iframe :src="src" class="iframe" loading="lazy" />
</template>

<script setup>
//==================================
// Import
//==================================
// import { computed } from 'vue'
// import { getViewport } from '../utils/screen_size.js';


//==================================
// Consts
//==================================
defineProps({
  src: String,
})

// const device = getViewport();
// const size = computed( () => {
//   return {
//       width: device.value == 'mobile' ? '24rem' : '40rem',
//       height: device.value == 'mobile' ? '13rem' : '22.5rem',
//     };
// });

</script>

<style lang="scss" scoped>
  .iframe {
    min-width: 40rem;
    max-height: 40rem;
    height: 50rem;
    border: none;
  }
</style>

<template>
  <div
    :style="{
    'width': '100%',
    'height' : height + 'rem'
  }"
  />
</template>

<script setup>
//==============================
// Import
//==============================
import { computed } from 'vue';
import { getViewport } from '../utils/screen_size.js';

//==============================
// Vars
//==============================
const device = getViewport();

const height = computed( () => 
  device.value == 'desktop' ? 10
    : device.value == 'tablet' ? 8
      : 6
)

</script>

<style></style>

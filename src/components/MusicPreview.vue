<template>
  <iframe :src="src" class="iframe" loading="lazy" />
</template>

<script setup>
//==================================
// Consts
//==================================
defineProps({
  src: String,
})


</script>

<style lang="scss" scoped>
  .iframe {
    min-width: 40rem;
    max-height: 40rem;
    height: 50rem;
    border: none;
  }
</style>

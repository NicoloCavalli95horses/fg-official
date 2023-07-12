<template>
  <div class="scroller" :style="{ 'width' : width || '100%' }">
    <slot />
  </div>

</template>

<script setup>
// ==============================
// Props
// ==============================
defineProps({
  width: String,
});

</script>

<style lang="scss" scoped>
.scroller {
  text-align: center;
  overflow: auto;
  white-space: nowrap;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
